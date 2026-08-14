import { NextResponse } from "next/server";

type ImplementationRequest = {
  name?: string;
  company?: string;
  phone?: string;
  solution?: string;
  tools?: string;
  bottleneck?: string;
  frequency?: string;
  impactSummary?: Record<string, string>;
  consentAccepted?: boolean;
  attribution?: Record<string, string>;
};

const phonePattern = /^\+51\s?9\d{8}$/;

export async function POST(request: Request) {
  const payload = (await request.json()) as ImplementationRequest;
  const required = ["name", "company", "phone", "solution", "tools", "bottleneck", "frequency"] as const;
  if (required.some((field) => !payload[field]?.trim())) {
    return NextResponse.json({ error: "Completa todos los campos requeridos." }, { status: 400 });
  }
  if (payload.consentAccepted !== true) {
    return NextResponse.json({ error: "Debes aceptar el aviso de privacidad para continuar." }, { status: 400 });
  }
  if (!phonePattern.test(payload.phone ?? "")) {
    return NextResponse.json({ error: "Usa un teléfono peruano válido (+51 9XXXXXXXX)." }, { status: 400 });
  }
  const textFields = [payload.name, payload.company, payload.tools, payload.bottleneck, payload.frequency];
  if (textFields.some((value) => {
    const normalized = value?.trim().toLowerCase() ?? "";
    const alphanumericCount = (normalized.match(/[a-záéíóúüñ0-9]/g) ?? []).length;
    return alphanumericCount < 4 || /^(.)\1+$/.test(normalized) || /^(asdf|qwerty|test|xxxx|1234)/i.test(normalized);
  })) {
    return NextResponse.json({ error: "Escribe respuestas concretas para poder evaluar la solicitud." }, { status: 400 });
  }

  // Temporary sink: production persistence must be configured before paid traffic.
  console.info("Quant Systems implementation request", payload);
  return NextResponse.json({ ok: true });
}
