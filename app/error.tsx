"use client";

import { ErrorFallback } from "@/components/layout/ErrorFallback";

export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <ErrorFallback retry={retry} />;
}
