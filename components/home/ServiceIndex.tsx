import Link from "next/link";
import { textLinkClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconArrow } from "@/components/ui/icons";
import { routes } from "@/lib/routes";
import type { ServiceSummary } from "@/types/content";
import { Eyebrow } from "@/components/ui/eyebrow";

type ServiceIndexProps = {
  eyebrow: string;
  title: string;
  description: string;
  allLabel: string;
  services: ServiceSummary[];
};

/** Index éditorial des savoir-faire, sans cartes ni icônes. */
export function ServiceIndex({
  eyebrow,
  title,
  description,
  allLabel,
  services,
}: ServiceIndexProps) {
  return (
    <section id="services" className="py-28 lg:py-40">
      <Container className="grid gap-16 lg:grid-cols-[2fr_3fr] lg:gap-24">
        <div className="lg:sticky lg:top-12 lg:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl text-navy lg:text-[3.5rem]">
            {title}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ink-muted">
            {description}
          </p>
          <Link
            href={routes.services}
            className={`${textLinkClassName} mt-10`}
          >
            {allLabel}
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>
        <ul className="border-t border-line">
          {services.map((service) => (
            <li key={service.slug} className="border-b border-line">
              <Link
                href={routes.service(service.slug)}
                className="group flex items-start justify-between gap-8 py-8"
              >
                <span>
                  <span className="block font-display text-2xl text-navy transition-colors group-hover:text-brass lg:text-[2rem]">
                    {service.title}
                  </span>
                  <span className="mt-3 block max-w-lg text-sm leading-relaxed text-ink-muted">
                    {service.excerpt}
                  </span>
                </span>
                <IconArrow className="mt-3 h-5 w-5 shrink-0 text-navy transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
