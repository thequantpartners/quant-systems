import type { Attribution } from "./attribution";

export type TrackingEvent =
  | "view_landing"
  | "submit_form_early_access"
  | "view_thankyou_upsell"
  | "click_whatsapp_vip"
  | "schedule_calcom"
  | "click_telegram_implementation"
  | "view_implementation_success"
  | "view_solution"
  | "submit_implementation_request"
  | "complete_diagnostic"
  | "disqualify_diagnostic"
  | "click_whatsapp_implementation";

export function track(event: TrackingEvent, parameters: Attribution = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("quantsetters:track", {
      detail: { event, ...parameters }
    })
  );

  const trackingWindow = window as Window & {
    dataLayer?: Array<Record<string, string>>;
  };
  const dataLayer = trackingWindow.dataLayer ?? (trackingWindow.dataLayer = []);

  dataLayer.push({ event, ...parameters });

  const gtag = (
    window as Window & {
      gtag?: (command: string, name: string, values?: Record<string, string>) => void;
    }
  ).gtag;

  if (gtag) {
    gtag("event", event, parameters);
  }
}
