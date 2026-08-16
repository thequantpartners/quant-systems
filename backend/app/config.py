from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    frontend_origins: str = "http://localhost:3000"
    n8n_implementation_webhook_url: str | None = None
    n8n_webhook_secret: str | None = None
    telegram_bot_token: str | None = None
    telegram_chat_id: str | None = None
    telegram_bot_username: str = "quantsystems_bot"
    telegram_webhook_secret: str | None = None

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.frontend_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
