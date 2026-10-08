import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "@/components/ui/icons";
import type { ManagerContent } from "@/types/entreprise";

type ManagerQuoteProps = {
  manager: ManagerContent;
  href?: string;
  linkLabel?: string;
};

/** Citation courte du gérant avec portrait (accueil). */
export function ManagerQuote({ manager, href, linkLabel }: ManagerQuoteProps) {
  return (
    <figure className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center md:flex-row md:text-left">
      {manager.image.src ? (
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-brand-green lg:h-40 lg:w-40">
          <Image
            src={manager.image.src}
            alt={manager.image.alt}
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
      ) : null}
      <div>
        <blockquote className="font-display text-2xl text-navy lg:text-3xl">
          « {manager.quote} »
        </blockquote>
        <figcaption className="mt-5 text-sm text-ink-muted">
          <span className="font-semibold text-ink">{manager.name}</span>
          {" · "}
          {manager.role}
        </figcaption>
        {href && linkLabel ? (
          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-navy"
          >
            {linkLabel}
            <IconArrow className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </figure>
  );
}
