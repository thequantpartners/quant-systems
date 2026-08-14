export const ATTRIBUTION_KEYS = [
  "gclid",
  "utm_source",
  "utm_campaign",
  "utm_medium",
  "utm_content",
  "utm_term"
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

const STORAGE_KEY = "quantsetters_attribution";

export function readAttribution(): Attribution {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Attribution) : {};
  } catch {
    return {};
  }
}

export function captureAttribution(search: string): Attribution {
  const params = new URLSearchParams(search);
  const current = readAttribution();
  const next: Attribution = { ...current };

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) {
      next[key] = value.slice(0, 300);
    }
  }

  if (Object.keys(next).length > 0) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return next;
}
