"use client";

import { Archivo } from "next/font/google";
import { ErrorFallback } from "@/components/layout/ErrorFallback";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-archivo",
});

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="fr" className={archivo.variable}>
      <body className="min-h-dvh bg-paper font-sans text-ink antialiased">
        <title>Erreur | TSM Énergies Services</title>
        <main>
          <ErrorFallback retry={retry} />
        </main>
      </body>
    </html>
  );
}
