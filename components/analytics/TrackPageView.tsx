"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import type { AnalyticsEventName } from "@/types/analytics";

type TrackPageViewProps = {
  event: AnalyticsEventName;
  slug: string;
};

export function TrackPageView({ event, slug }: TrackPageViewProps) {
  useEffect(() => {
    track(event, { slug });
  }, [event, slug]);

  return null;
}
