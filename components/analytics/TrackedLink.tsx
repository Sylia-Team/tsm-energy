"use client";

import Link from "next/link";
import type { AnalyticsEventName, AnalyticsPayload } from "@/types/analytics";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type TrackedLinkProps = {
  href: string;
  event: AnalyticsEventName;
  payload?: AnalyticsPayload;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function TrackedLink({
  href,
  event,
  payload,
  className,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  const isInternal = href.startsWith("/");

  function handleClick(eventObject: React.MouseEvent<HTMLAnchorElement>) {
    track(event, payload);
    onClick?.(eventObject);
  }

  if (isInternal) {
    return (
      <Link href={href} className={cn(className)} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={cn(className)} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
