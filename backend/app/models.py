from datetime import datetime, timezone
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Index, String, Text, Uuid
from sqlalchemy.orm import Mapped, mapped_column

from .db import Base


class ImplementationRequest(Base):
    __tablename__ = "implementation_requests"
    __table_args__ = (
        Index("ix_implementation_requests_created_at", "created_at"),
        Index("ix_implementation_requests_status", "status"),
    )

    id: Mapped[UUID] = mapped_column(Uuid(as_uuid=True), primary_key=True, default=uuid4)
    idempotency_key: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    company: Mapped[str] = mapped_column(String(160), nullable=False)
    email: Mapped[str | None] = mapped_column(String(254), nullable=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    solution: Mapped[str] = mapped_column(String(120), nullable=False)
    tools: Mapped[str] = mapped_column(Text, nullable=False)
    bottleneck: Mapped[str] = mapped_column(Text, nullable=False)
    frequency: Mapped[str] = mapped_column(String(80), nullable=False)
    consent_accepted: Mapped[bool] = mapped_column(nullable=False, default=False)
    contact_consent: Mapped[bool] = mapped_column(nullable=False, default=False)
    attribution_json: Mapped[str] = mapped_column(Text, nullable=False, default="{}")
    impact_summary_json: Mapped[str] = mapped_column(Text, nullable=False, default="{}")
    notification_sent: Mapped[bool | None] = mapped_column(nullable=True, default=None)
    telegram_start_token: Mapped[str | None] = mapped_column(String(64), unique=True, nullable=True)
    telegram_start_expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    status: Mapped[str] = mapped_column(String(40), nullable=False, default="received")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
