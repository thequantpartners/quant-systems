import re
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


class ImplementationRequestCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(min_length=1, max_length=120)
    company: str = Field(min_length=1, max_length=160)
    email: str = Field(min_length=5, max_length=254)
    phone: str = Field(min_length=10, max_length=20)
    solution: str = Field(min_length=1, max_length=120)
    tools: str = Field(min_length=1, max_length=3000)
    bottleneck: str = Field(min_length=1, max_length=3000)
    frequency: str = Field(min_length=1, max_length=80)
    consent_accepted: bool
    contact_consent: bool
    attribution: dict[str, str] = Field(default_factory=dict)
    impact_summary: dict[str, Any] = Field(default_factory=dict)
    idempotency_key: str | None = Field(default=None, max_length=255)

    @field_validator("name", "company", "tools", "bottleneck", "frequency")
    @classmethod
    def validate_meaningful_text(cls, value: str) -> str:
        normalized = " ".join(value.split())
        alphanumeric_count = len(re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]", normalized))
        if alphanumeric_count < 4 or re.fullmatch(r"(.)\1+", normalized, flags=re.IGNORECASE):
            raise ValueError("Escribe una respuesta concreta para poder evaluar la solicitud.")
        if re.match(r"^(asdf|qwerty|test|xxxx|1234)", normalized, flags=re.IGNORECASE):
            raise ValueError("Escribe una respuesta concreta para poder evaluar la solicitud.")
        return normalized

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        normalized = "".join(value.split())
        if not normalized.startswith("+519") or len(normalized) != 12 or not normalized[3:].isdigit():
            raise ValueError("Usa un teléfono peruano válido (+51 9XXXXXXXX).")
        return normalized

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        normalized = value.strip().lower()
        if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", normalized):
            raise ValueError("Usa un correo electrónico válido.")
        return normalized

    @field_validator("consent_accepted")
    @classmethod
    def validate_consent(cls, value: bool) -> bool:
        if not value:
            raise ValueError("Debes aceptar el aviso de privacidad para continuar.")
        return value

    @field_validator("contact_consent")
    @classmethod
    def validate_contact_consent(cls, value: bool) -> bool:
        if not value:
            raise ValueError("Debes autorizar el contacto posterior para continuar.")
        return value

    @field_validator("impact_summary")
    @classmethod
    def validate_impact_summary(cls, value: dict[str, Any]) -> dict[str, Any]:
        for field_name in ("consequence", "desired_outcome"):
            field_value = value.get(field_name)
            if not isinstance(field_value, str):
                raise ValueError("Completa el contexto del problema y la mejora deseada.")
            normalized = " ".join(field_value.split())
            alphanumeric_count = len(re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]", normalized))
            if alphanumeric_count < 4 or re.fullmatch(r"(.)\1+", normalized, flags=re.IGNORECASE):
                raise ValueError("Escribe respuestas concretas para poder evaluar la solicitud.")
            value[field_name] = normalized
        return value


class ImplementationRequestResponse(BaseModel):
    id: UUID
    status: str
    created: bool
    notification_sent: bool | None = None
