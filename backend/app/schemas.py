from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


class ImplementationRequestCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(min_length=1, max_length=120)
    company: str = Field(min_length=1, max_length=160)
    phone: str = Field(min_length=10, max_length=20)
    solution: str = Field(min_length=1, max_length=120)
    tools: str = Field(min_length=1, max_length=3000)
    bottleneck: str = Field(min_length=1, max_length=3000)
    frequency: str = Field(min_length=1, max_length=80)
    consent_accepted: bool
    attribution: dict[str, str] = Field(default_factory=dict)
    impact_summary: dict[str, Any] = Field(default_factory=dict)
    idempotency_key: str | None = Field(default=None, max_length=255)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        normalized = "".join(value.split())
        if not normalized.startswith("+519") or len(normalized) != 12 or not normalized[3:].isdigit():
            raise ValueError("Usa un teléfono peruano válido (+51 9XXXXXXXX).")
        return normalized

    @field_validator("consent_accepted")
    @classmethod
    def validate_consent(cls, value: bool) -> bool:
        if not value:
            raise ValueError("Debes aceptar el aviso de privacidad para continuar.")
        return value


class ImplementationRequestResponse(BaseModel):
    id: UUID
    status: str
    created: bool
