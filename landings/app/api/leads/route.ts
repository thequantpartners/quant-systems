import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  company?: string;
  role?: string;
  email?: string;
  phone?: string;
  leadVolume?: string;
  adChannels?: string;
  monthlyAdSpend?: string;
  ticketRange?: string;
  consentAccepted?: boolean;
  attribution?: Record<string, string>;
};

const phonePattern = /^\+51\s?9\d{8}$/;

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadPayload;
  const requiredFields = [
    "name",
    "company",
    "role",
    "email",
    "phone",
    "leadVolume",
    "adChannels",
    "monthlyAdSpend",
    "ticketRange"
  ] as const;
  const missingField = requiredFields.find((field) => !payload[field]?.trim());

  if (missingField) {
    return NextResponse.json({ error: "Completa todos los campos requeridos." }, { status: 400 });
  }

  if (payload.consentAccepted !== true) {
    return NextResponse.json({ error: "Debes aceptar el aviso de privacidad para continuar." }, { status: 400 });
  }

  const phone = payload.phone ?? "";

  if (!payload.email?.includes("@") || !phonePattern.test(phone)) {
    return NextResponse.json({ error: "Revisa tu email y el formato peruano del teléfono (+51 9XXXXXXXX)." }, { status: 400 });
  }

  const normalizedPhone = phone.replace(/\s/g, "");

  // Temporary validation sink: replace with the approved lead store before production launch.
  console.info("Quant Systems early access lead", {
    ...payload,
    phone: normalizedPhone
  });

  return NextResponse.json({ ok: true });
}
