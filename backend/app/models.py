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
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    solution: Mapped[str] = mapped_column(String(120), nullable=False)
    tools: Mapped[str] = mapped_column(Text, nullable=False)
    bottleneck: Mapped[str] = mapped_column(Text, nullable=False)
    frequency: Mapped[str] = mapped_column(String(80), nullable=False)
    attribution_json: Mapped[str] = mapped_column(Text, nullable=False, default="{}")
    impact_summary_json: Mapped[str] = mapped_column(Text, nullable=False, default="{}")
    status: Mapped[str] = mapped_column(String(40), nullable=False, default="received")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
