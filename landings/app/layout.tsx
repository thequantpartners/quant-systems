import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://quantsystems.thequantpartners.com"),
  title: {
    default: "Quant Systems | Agentes verticales en Telegram",
    template: "%s | Quant Systems"
  },
  description:
    "Mini Apps y sistemas operativos en Telegram para academias y comunidades premium de formación.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Quant Systems | Implementaciones para pymes",
    description: "Convierte tu comunidad de Telegram en una operación de inscripción, acceso y seguimiento medible.",
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
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <>
            <Script
              id="google-tag-manager"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
                `
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        ) : null}
      </body>
    </html>
  );
}
