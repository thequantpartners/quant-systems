import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

type ImplementationRequest = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  solution?: string;
  tools?: string;
  bottleneck?: string;
  frequency?: string;
  impactMetric?: string;
  impactSummary?: Record<string, string>;
  consentAccepted?: boolean;
  contactConsent?: boolean;
  attribution?: Record<string, string>;
};

const phonePattern = /^\+51\s?9\d{8}$/;

export async function POST(request: Request) {
  const payload = (await request.json()) as ImplementationRequest;
  const required = ["name", "company", "email", "phone", "solution", "tools", "bottleneck", "frequency", "impactMetric"] as const;
  if (required.some((field) => !payload[field]?.trim())) {
    return NextResponse.json({ error: "Completa todos los campos requeridos." }, { status: 400 });
  }
  if (payload.consentAccepted !== true) {
    return NextResponse.json({ error: "Debes aceptar el aviso de privacidad para continuar." }, { status: 400 });
  }
  if (payload.contactConsent !== true) {
    return NextResponse.json({ error: "Debes autorizar el contacto posterior para continuar." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email ?? "")) {
    return NextResponse.json({ error: "Usa un correo electrónico válido." }, { status: 400 });
  }
  if (!phonePattern.test(payload.phone ?? "")) {
    return NextResponse.json({ error: "Usa un teléfono peruano válido (+51 9XXXXXXXX)." }, { status: 400 });
  }
  const textFields = [payload.name, payload.company, payload.tools, payload.bottleneck, payload.frequency, payload.impactMetric];
  if (textFields.some((value) => {
    const normalized = value?.trim().toLowerCase() ?? "";
    const alphanumericCount = (normalized.match(/[a-záéíóúüñ0-9]/g) ?? []).length;
    return alphanumericCount < 4 || /^(.)\1+$/.test(normalized) || /^(asdf|qwerty|test|xxxx|1234)/i.test(normalized);
  })) {
    return NextResponse.json({ error: "Escribe respuestas concretas para poder evaluar la solicitud." }, { status: 400 });
  }

  // Temporary sink: production persistence must be configured before paid traffic.
  const token = randomBytes(18).toString("base64url");
  const botUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL ?? "https://t.me/quantsystemss_bot";
  return NextResponse.json({
    ok: true,
    telegram_url: `${botUrl}?start=diag_${token}`
  });
}
