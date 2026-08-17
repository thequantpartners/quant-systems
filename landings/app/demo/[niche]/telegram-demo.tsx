"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        expand: () => void;
        ready: () => void;
      };
    };
  }
}

export default function TelegramDemoRuntime() {
  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    if (!telegram) {
      return;
    }

    telegram.ready();
    telegram.expand();
  }, []);

  return <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />;
}
