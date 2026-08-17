import hashlib
import json
import logging
import secrets
from datetime import datetime, timedelta, timezone
from urllib.error import HTTPError, URLError
from urllib.request import Request as UrlRequest
from urllib.request import urlopen
from contextlib import asynccontextmanager
from typing import Any
from uuid import UUID

from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .config import get_settings
from .db import Base, engine, get_db
from .models import ImplementationRequest, TelegramQualificationSession
from .schemas import ImplementationRequestCreate, ImplementationRequestResponse, TelegramStartResponse

logger = logging.getLogger(__name__)


def send_telegram_alert(request: ImplementationRequest) -> bool:
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        logger.warning("Implementation alert not sent: Telegram is not configured")
        return False

    message = (
        "🚨 NUEVO LEAD - QUANT SYSTEMS\n\n"
        f"Nombre: {request.name}\n"
        f"Empresa: {request.company}\n"
        f"Correo: {request.email or 'No registrado'}\n"
        f"WhatsApp: {request.phone}\n"
        f"Solución: {request.solution}\n"
        f"Herramientas: {request.tools}\n"
        f"Cuello de botella: {request.bottleneck}\n"
        f"Frecuencia: {request.frequency}\n\n"
        f"ID: {request.id}"
    )
    payload = json.dumps(
        {
            "chat_id": settings.telegram_chat_id,
            "text": message,
        }
    ).encode("utf-8")
    outbound_request = UrlRequest(
        f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage",
        data=payload,
        headers={
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urlopen(outbound_request, timeout=10) as response:
            if response.status < 200 or response.status >= 300:
                logger.error("Telegram returned unexpected status %s", response.status)
                return False
            telegram_response = json.loads(response.read().decode("utf-8"))
            if telegram_response.get("ok") is not True:
                logger.error("Telegram did not accept implementation alert")
                return False
    except HTTPError as error:
        response_body = error.read().decode("utf-8", errors="replace")
        logger.error(
            "Telegram rejected implementation alert with status %s: %s",
            error.code,
            response_body,
        )
        return False
    except URLError as error:
        logger.error("Could not reach Telegram for implementation alert: %s", error.reason)
        return False
    return True


def create_telegram_start_token() -> tuple[str, datetime]:
    token = secrets.token_urlsafe(24)
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    return token, expires_at


def telegram_url(token: str) -> str:
    return f"https://t.me/{settings.telegram_bot_username}?start=diag_{token}"


def send_telegram_message(chat_id: int | str, text: str, reply_markup: dict[str, Any] | None = None) -> None:
    if not settings.telegram_bot_token:
        raise HTTPException(status_code=503, detail="Telegram no está configurado.")

    message: dict[str, Any] = {"chat_id": chat_id, "text": text}
    if reply_markup:
        message["reply_markup"] = reply_markup
    payload = json.dumps(message).encode("utf-8")
    outbound_request = UrlRequest(
        f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(outbound_request, timeout=10) as response:
            telegram_response = json.loads(response.read().decode("utf-8"))
            if response.status < 200 or response.status >= 300 or telegram_response.get("ok") is not True:
                raise HTTPException(status_code=502, detail="Telegram no aceptó el mensaje.")
    except HTTPError as error:
        logger.error("Telegram rechazó el mensaje con estado %s", error.code)
        raise HTTPException(status_code=502, detail="Telegram no aceptó el mensaje.") from error
    except URLError as error:
        logger.error("No se pudo contactar Telegram: %s", error.reason)
        raise HTTPException(status_code=502, detail="No se pudo contactar Telegram.") from error


def answer_telegram_callback_query(callback_query_id: str, text: str) -> None:
    if not settings.telegram_bot_token:
        raise HTTPException(status_code=503, detail="Telegram no está configurado.")

    payload = json.dumps({"callback_query_id": callback_query_id, "text": text}).encode("utf-8")
    outbound_request = UrlRequest(
        f"https://api.telegram.org/bot{settings.telegram_bot_token}/answerCallbackQuery",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(outbound_request, timeout=10) as response:
            telegram_response = json.loads(response.read().decode("utf-8"))
            if response.status < 200 or response.status >= 300 or telegram_response.get("ok") is not True:
                raise HTTPException(status_code=502, detail="Telegram no aceptó la respuesta.")
    except HTTPError as error:
        logger.error("Telegram rechazó la respuesta del botón con estado %s", error.code)
        raise HTTPException(status_code=502, detail="Telegram no aceptó la respuesta.") from error
    except URLError as error:
        logger.error("No se pudo responder al botón de Telegram: %s", error.reason)
        raise HTTPException(status_code=502, detail="No se pudo responder al botón.") from error


def telegram_buttons(rows: list[tuple[str, str]]) -> dict[str, Any]:
    return {
        "inline_keyboard": [
            [{"text": label, "callback_data": callback_data}]
            for label, callback_data in rows
        ]
    }


def qualification_session(
    db: Session,
    chat_id: int | str,
    user_id: int | str | None = None,
) -> TelegramQualificationSession:
    session = db.scalar(
        select(TelegramQualificationSession).where(
            TelegramQualificationSession.telegram_chat_id == str(chat_id)
        )
    )
    if session is None:
        session = TelegramQualificationSession(
            telegram_chat_id=str(chat_id),
            telegram_user_id=str(user_id) if user_id is not None else None,
        )
        db.add(session)
    elif user_id is not None:
        session.telegram_user_id = str(user_id)
    return session


def qualification_step_message(
    db: Session,
    session: TelegramQualificationSession,
    chat_id: int | str,
) -> None:
    messages: dict[str, tuple[str, list[tuple[str, str]]]] = {
        "welcome": (
            "Antes de recomendarte una demo, necesito entender cómo opera tu negocio en Telegram.",
            [("Comenzar", "qual_start"), ("No ahora", "qual_stop")],
        ),
        "niche": (
            "¿Qué describe mejor tu operación?",
            [
                ("Cursos, mentorías o formación", "qual_niche:education"),
                ("Crypto o comunidad financiera", "qual_niche:crypto"),
                ("Trading, forex o membresías", "qual_niche:trading"),
                ("No estoy seguro", "qual_niche:unknown"),
            ],
        ),
        "telegram_surface": (
            "¿Dónde ocurre principalmente tu operación?",
            [
                ("Bot", "qual_surface:bot"),
                ("Canal", "qual_surface:channel"),
                ("Grupo o comunidad", "qual_surface:group"),
                ("Varios espacios", "qual_surface:multiple"),
            ],
        ),
        "problem": (
            "¿Qué quieres mejorar primero?",
            [
                ("Captar y calificar interesados", "qual_problem:sales"),
                ("Soporte y preguntas repetidas", "qual_problem:support"),
                ("Acceso, membresías o renovaciones", "qual_problem:access"),
                ("Entregar contenido o clases", "qual_problem:delivery"),
            ],
        ),
        "offer": (
            "¿Ya tienes una oferta, servicio, membresía o contenido que vendes?",
            [
                ("Sí, está activo", "qual_offer:active"),
                ("Sí, pero aún lo estoy preparando", "qual_offer:preparing"),
                ("Todavía no", "qual_offer:none"),
            ],
        ),
    }
    text, buttons = messages[session.current_step]
    send_telegram_message(chat_id, text, telegram_buttons(buttons))


def finish_qualification(db: Session, session: TelegramQualificationSession, chat_id: int | str) -> None:
    answers = json.loads(session.answers_json)
    niche = answers.get("niche")
    offer = answers.get("offer")
    session.niche = niche if niche != "unknown" else None
    session.confidence = 0.8 if niche and niche != "unknown" else 0.35
    session.eligibility = "accepted" if offer == "active" and niche != "unknown" else "needs_review"
    session.status = "completed"
    session.current_step = "completed"
    db.commit()

    labels = {
        "education": "educadores, coaches y capacitación",
        "crypto": "crypto",
        "trading": "trading y forex",
    }
    detected = labels.get(niche, "un nicho por confirmar")
    if session.eligibility == "accepted":
        send_telegram_message(
            chat_id,
            (
                f"Tu operación parece encajar con {detected}.\n\n"
                "Te recomendamos una demo de precalificación y seguimiento. "
                "En la siguiente versión se abrirá la Mini App para probarla dentro de Telegram.\n\n"
                "Por ahora, responde a este mensaje si quieres que una persona revise tu caso."
            ),
            telegram_buttons([("Hablar con una persona", "qual_handoff")]),
        )
        return

    send_telegram_message(
        chat_id,
        (
            f"Detecté una posible operación de {detected}, pero necesito revisar algunos detalles "
            "antes de recomendarte una plantilla. Puedes pedir ayuda humana para continuar."
        ),
        telegram_buttons([("Solicitar revisión", "qual_handoff")]),
    )


def response_for_request(request: ImplementationRequest, *, created: bool) -> ImplementationRequestResponse:
    return ImplementationRequestResponse(
        id=request.id,
        status=request.status,
        created=created,
        notification_sent=request.notification_sent,
        telegram_url=telegram_url(request.telegram_start_token)
        if request.telegram_start_token
        else None,
    )


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    with engine.begin() as connection:
        connection.execute(text("ALTER TABLE implementation_requests ADD COLUMN IF NOT EXISTS email VARCHAR(254)"))
        connection.execute(text("ALTER TABLE implementation_requests ADD COLUMN IF NOT EXISTS consent_accepted BOOLEAN NOT NULL DEFAULT FALSE"))
        connection.execute(text("ALTER TABLE implementation_requests ADD COLUMN IF NOT EXISTS contact_consent BOOLEAN NOT NULL DEFAULT FALSE"))
        connection.execute(text("ALTER TABLE implementation_requests ADD COLUMN IF NOT EXISTS notification_sent BOOLEAN"))
        connection.execute(text("ALTER TABLE implementation_requests ADD COLUMN IF NOT EXISTS telegram_start_token VARCHAR(64)"))
        connection.execute(text("ALTER TABLE implementation_requests ADD COLUMN IF NOT EXISTS telegram_start_expires_at TIMESTAMP WITH TIME ZONE"))
        connection.execute(text("ALTER TABLE implementation_requests ADD COLUMN IF NOT EXISTS telegram_chat_id VARCHAR(64)"))
        connection.execute(text("ALTER TABLE telegram_qualification_sessions ADD COLUMN IF NOT EXISTS start_parameter VARCHAR(64)"))
    yield


settings = get_settings()
app = FastAPI(title="Quant Setters API", version="0.1.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Idempotency-Key", "X-Telegram-Bot-Api-Secret-Token"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post(
    "/api/v1/implementation-requests",
    response_model=ImplementationRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_implementation_request(
    payload: ImplementationRequestCreate,
    db: Session = Depends(get_db),
    idempotency_key: str | None = Header(default=None, alias="Idempotency-Key"),
) -> ImplementationRequestResponse:
    if payload.idempotency_key and idempotency_key and payload.idempotency_key != idempotency_key:
        raise HTTPException(status_code=400, detail="Las claves de idempotencia no coinciden.")

    raw_key = idempotency_key or payload.idempotency_key
    if not raw_key:
        raw_key = hashlib.sha256(
            f"{payload.name}|{payload.company}|{payload.phone}|{payload.bottleneck}".encode()
        ).hexdigest()

    existing = db.scalar(
        select(ImplementationRequest).where(ImplementationRequest.idempotency_key == raw_key)
    )
    if existing:
        if not existing.telegram_start_token:
            token, expires_at = create_telegram_start_token()
            existing.telegram_start_token = token
            existing.telegram_start_expires_at = expires_at
            db.commit()
            db.refresh(existing)
        return response_for_request(existing, created=False)

    token, expires_at = create_telegram_start_token()
    request = ImplementationRequest(
        idempotency_key=raw_key,
        name=payload.name.strip(),
        company=payload.company.strip(),
        email=payload.email,
        phone=payload.phone,
        solution=payload.solution.strip(),
        tools=payload.tools.strip(),
        bottleneck=payload.bottleneck.strip(),
        frequency=payload.frequency.strip(),
        consent_accepted=payload.consent_accepted,
        contact_consent=payload.contact_consent,
        attribution_json=json.dumps(payload.attribution, ensure_ascii=True),
        impact_summary_json=json.dumps(
            {**payload.impact_summary, "metric": payload.impact_metric},
            ensure_ascii=True,
        ),
        telegram_start_token=token,
        telegram_start_expires_at=expires_at,
    )
    db.add(request)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        existing = db.scalar(
            select(ImplementationRequest).where(ImplementationRequest.idempotency_key == raw_key)
        )
        if existing:
            return response_for_request(existing, created=False)
        raise HTTPException(status_code=503, detail="No pudimos registrar la solicitud.")
    db.refresh(request)
    notification_sent = send_telegram_alert(request)
    request.notification_sent = notification_sent
    db.commit()
    return response_for_request(request, created=True)


@app.get("/api/v1/telegram/start/{token}", response_model=TelegramStartResponse)
def resolve_telegram_start(token: str, db: Session = Depends(get_db)) -> TelegramStartResponse:
    request = db.scalar(
        select(ImplementationRequest).where(
            ImplementationRequest.telegram_start_token == token
        )
    )
    if not request or not request.telegram_start_expires_at:
        raise HTTPException(status_code=404, detail="El enlace de Telegram no es válido.")
    expires_at = request.telegram_start_expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at <= datetime.now(timezone.utc):
        raise HTTPException(status_code=410, detail="El enlace de Telegram ha expirado.")
    return TelegramStartResponse(
        request_id=request.id,
        name=request.name,
        company=request.company,
        solution=request.solution,
        bottleneck=request.bottleneck,
        tools=request.tools,
        impact_summary=json.loads(request.impact_summary_json),
    )


@app.post("/api/v1/telegram/webhook")
def telegram_webhook(
    update: dict[str, Any],
    db: Session = Depends(get_db),
    webhook_secret: str | None = Header(default=None, alias="X-Telegram-Bot-Api-Secret-Token"),
) -> dict[str, bool]:
    if settings.telegram_webhook_secret and webhook_secret != settings.telegram_webhook_secret:
        raise HTTPException(status_code=403, detail="Webhook no autorizado.")

    message = update.get("message")
    if isinstance(message, dict):
        text = message.get("text")
        chat = message.get("chat")
        if isinstance(text, str) and isinstance(chat, dict) and chat.get("id") is not None:
            if text.startswith("/start"):
                token = text.removeprefix("/start").strip()
                if token.startswith("diag_"):
                    start_token = token.removeprefix("diag_")
                    request = db.scalar(
                        select(ImplementationRequest).where(
                            ImplementationRequest.telegram_start_token == start_token
                        )
                    )
                    if not request or not request.telegram_start_expires_at:
                        send_telegram_message(
                            chat["id"],
                            "Este enlace ya no está disponible. Vuelve a completar el diagnóstico para generar uno nuevo.",
                        )
                        return {"ok": True}
                    expires_at = request.telegram_start_expires_at
                    if expires_at.tzinfo is None:
                        expires_at = expires_at.replace(tzinfo=timezone.utc)
                    if expires_at <= datetime.now(timezone.utc):
                        send_telegram_message(chat["id"], "Este enlace ha expirado. Vuelve a completar el diagnóstico.")
                        return {"ok": True}

                    request.telegram_chat_id = str(chat["id"])
                    db.commit()
                    impact_summary = json.loads(request.impact_summary_json)
                    summary = (
                        f"Hola, {request.name}. Recibimos tu diagnóstico para {request.company}.\n\n"
                        f"Qué quieres ordenar: {request.solution}\n"
                        f"Qué está frenando la operación: {request.bottleneck}\n"
                        f"Herramientas actuales: {request.tools}\n"
                        f"Métrica prioritaria: {impact_summary.get('metric', 'Por definir')}\n\n"
                        "¿Este resumen representa tu situación?"
                    )
                    send_telegram_message(
                        chat["id"],
                        summary,
                        {
                            "inline_keyboard": [
                                [
                                    {"text": "Sí, es correcto", "callback_data": f"diag_confirm:{request.id}"},
                                    {"text": "Quiero corregir algo", "callback_data": f"diag_correct:{request.id}"},
                                ]
                            ]
                        },
                    )
                    return {"ok": True}

                session = qualification_session(
                    db,
                    chat["id"],
                    message.get("from", {}).get("id") if isinstance(message.get("from"), dict) else None,
                )
                session.start_parameter = token[:64] if token else None
                session.current_step = "welcome"
                session.answers_json = "{}"
                session.niche = None
                session.confidence = None
                session.eligibility = None
                session.status = "active"
                session.consent_accepted = False
                db.commit()
                send_telegram_message(
                    chat["id"],
                    (
                    "Hola. Soy el asistente de QuantSetters.\n\n"
                    "Ayudamos a negocios que ya operan en Telegram a vender más o ahorrar tiempo "
                    "con bots y Mini Apps. Te haré unas preguntas breves para recomendarte una demo.\n\n"
                    "Todavía no ejecutaré ninguna acción en tus grupos o canales."
                    ),
                    telegram_buttons([("Comenzar", "qual_start"), ("No ahora", "qual_stop")]),
                )
                return {"ok": True}

            linked_request = db.scalar(
                select(ImplementationRequest)
                .where(ImplementationRequest.telegram_chat_id == str(chat["id"]))
                .order_by(ImplementationRequest.created_at.desc())
            )
            if linked_request:
                send_telegram_message(
                    chat["id"],
                    (
                        f"Gracias. Ya recibimos tu mensaje sobre {linked_request.company}.\n\n"
                        "Una persona del equipo revisará el contexto de tu diagnóstico y te responderá por aquí "
                        "para explicarte el siguiente paso del piloto."
                    ),
                )
                return {"ok": True}

            send_telegram_message(
                chat["id"],
                "Soy el asistente de Quant Systems. Usa el enlace recibido después de completar el diagnóstico.",
            )
            return {"ok": True}

    callback_query = update.get("callback_query")
    if isinstance(callback_query, dict):
        callback_data = callback_query.get("data", "")
        chat = callback_query.get("message", {}).get("chat", {})
        callback_user = callback_query.get("from", {})
        if chat.get("id") is not None and isinstance(callback_data, str) and callback_data.startswith("qual_"):
            session = qualification_session(
                db,
                chat["id"],
                callback_user.get("id") if isinstance(callback_user, dict) else None,
            )
            answer_telegram_callback_query(callback_query["id"], "Guardado")

            if callback_data == "qual_start":
                session.consent_accepted = True
                session.current_step = "niche"
                db.commit()
                qualification_step_message(db, session, chat["id"])
                return {"ok": True}
            if callback_data == "qual_stop":
                session.status = "opted_out"
                session.current_step = "stopped"
                db.commit()
                send_telegram_message(chat["id"], "De acuerdo. No continuaremos con la precalificación.")
                return {"ok": True}
            if callback_data == "qual_handoff":
                session.status = "human_requested"
                db.commit()
                send_telegram_message(
                    chat["id"],
                    "Registré tu solicitud. Una persona revisará el resumen antes de recomendarte un siguiente paso.",
                )
                return {"ok": True}

            prefix_to_step = {
                "qual_niche:": "telegram_surface",
                "qual_surface:": "problem",
                "qual_problem:": "offer",
            }
            for prefix, next_step in prefix_to_step.items():
                if callback_data.startswith(prefix):
                    answers = json.loads(session.answers_json)
                    field_name = {
                        "qual_niche:": "niche",
                        "qual_surface:": "telegram_surface",
                        "qual_problem:": "problem",
                    }[prefix]
                    answers[field_name] = callback_data.removeprefix(prefix)
                    session.answers_json = json.dumps(answers, ensure_ascii=True)
                    session.current_step = next_step
                    db.commit()
                    qualification_step_message(db, session, chat["id"])
                    return {"ok": True}

            if callback_data.startswith("qual_offer:"):
                answers = json.loads(session.answers_json)
                answers["offer"] = callback_data.removeprefix("qual_offer:")
                session.answers_json = json.dumps(answers, ensure_ascii=True)
                finish_qualification(db, session, chat["id"])
                return {"ok": True}

        if callback_data.startswith("diag_confirm:") and chat.get("id") is not None:
            answer_telegram_callback_query(callback_query["id"], "Diagnóstico confirmado")
            send_telegram_message(
                chat["id"],
                "Perfecto. El siguiente paso es revisar el alcance del piloto contigo. Responde a este mensaje y continuamos la conversación.",
            )
            return {"ok": True}
        if callback_data.startswith("diag_correct:") and chat.get("id") is not None:
            answer_telegram_callback_query(callback_query["id"], "Cuéntanos qué quieres corregir")
            send_telegram_message(
                chat["id"],
                "Claro. Responde con la parte que quieres corregir y una persona del equipo la revisará contigo.",
            )
            return {"ok": True}

    return {"ok": True}
