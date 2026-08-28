import type { AnalyticsEventName, AnalyticsPayload } from "@/types/analytics";

/**
 * Couche analytics interchangeable.
 * No-op tant que le consentement et GA4/GTM ne sont pas branchés.
 */
export function track(
  _event: AnalyticsEventName,
  _payload?: AnalyticsPayload,
): void {
  if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[analytics]", _event, _payload);
  }
}
