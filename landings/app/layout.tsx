import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://quantsetters.com"),
  title: {
    default: "Quant Systems | Implementaciones para pymes",
    template: "%s | Quant Systems"
  },
  description:
    "Implementaciones bajo demanda que conectan las herramientas que tu pyme ya usa, sin obligarte a adoptar otro SaaS.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Quant Systems | Implementaciones para pymes",
    description: "Conecta tus herramientas actuales y elimina cuellos de botella operativos.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
