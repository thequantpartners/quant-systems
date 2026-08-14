import hashlib
import json
import logging
from urllib.error import HTTPError, URLError
from urllib.request import Request as UrlRequest
from urllib.request import urlopen
from contextlib import asynccontextmanager
from uuid import UUID

from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .config import get_settings
from .db import Base, engine, get_db
from .models import ImplementationRequest
from .schemas import ImplementationRequestCreate, ImplementationRequestResponse

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
        logger.error("Telegram rejected implementation alert with status %s", error.code)
        return False
    except URLError as error:
        logger.error("Could not reach Telegram for implementation alert: %s", error.reason)
        return False
    return True


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    with engine.begin() as connection:
        connection.execute(text("ALTER TABLE implementation_requests ADD COLUMN IF NOT EXISTS email VARCHAR(254)"))
        connection.execute(text("ALTER TABLE implementation_requests ADD COLUMN IF NOT EXISTS contact_consent BOOLEAN NOT NULL DEFAULT FALSE"))
    yield


settings = get_settings()
app = FastAPI(title="Quant Setters API", version="0.1.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Idempotency-Key"],
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
        return ImplementationRequestResponse(id=existing.id, status=existing.status, created=False)

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
        contact_consent=payload.contact_consent,
        attribution_json=json.dumps(payload.attribution, ensure_ascii=True),
        impact_summary_json=json.dumps(payload.impact_summary, ensure_ascii=True),
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
            return ImplementationRequestResponse(id=existing.id, status=existing.status, created=False)
        raise HTTPException(status_code=503, detail="No pudimos registrar la solicitud.")
    db.refresh(request)
    notification_sent = send_telegram_alert(request)
    return ImplementationRequestResponse(
        id=request.id,
        status=request.status,
        created=True,
        notification_sent=notification_sent,
    )
