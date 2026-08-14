import hashlib
import json
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
    return ImplementationRequestResponse(id=request.id, status=request.status, created=True)
