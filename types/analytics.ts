export const ANALYTICS_EVENTS = [
  "phone_click",
  "email_click",
  "quote_start",
  "quote_step_completed",
  "quote_submitted",
  "service_view",
  "realisation_view",
  "zone_view",
  "cta_click",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsPayload = Record<string, string | number | boolean | null>;
