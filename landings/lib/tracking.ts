import type { Attribution } from "./attribution";

export type TrackingEvent =
  | "view_landing"
  | "submit_form_early_access"
  | "view_thankyou_upsell"
  | "click_whatsapp_vip"
  | "schedule_calcom"
  | "view_solution"
  | "submit_implementation_request"
  | "complete_diagnostic"
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

  const gtag = (
    window as Window & {
      gtag?: (command: string, name: string, values?: Record<string, string>) => void;
    }
  ).gtag;

  if (gtag) {
    gtag("event", event, parameters);
  }
}
