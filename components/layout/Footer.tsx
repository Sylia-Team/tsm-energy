import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Logo } from "@/components/layout/Logo";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  getServicesContent,
  getSiteContent,
  getZonesContent,
} from "@/lib/admin/content-read";
import { legalNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { formatAddressLines } from "@/lib/utils";

const columnTitle = "text-[0.7rem] font-medium uppercase tracking-[0.3em] text-brass-light";
const columnLink = "text-sm text-paper/70 transition-colors duration-300 hover:text-paper";

export function Footer() {
  const site = getSiteContent();
  const services = getServicesContent();
  const zones = getZonesContent();
  const addressLines = formatAddressLines(site.address);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-paper">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          <div className="max-w-xs">
            <Logo inverted />
            <p className="mt-8 text-sm leading-relaxed text-paper/60">
              {site.tagline}. Rénovation, maçonnerie, isolation, toiture et
              extension de maison.
            </p>
            <TrackedLink
              href={routes.quote}
              event="cta_click"
              payload={{ location: "footer" }}
              className={buttonClassName("secondaryOnDark", "mt-10")}
            >
              Demander un devis
            </TrackedLink>
          </div>

          <div>
            <h2 className={columnTitle}>Services</h2>
            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={routes.service(service.slug)} className={columnLink}>
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={columnTitle}>Zones d’intervention</h2>
            <ul className="mt-6 space-y-3">
              {zones.map((zone) => (
                <li key={zone.slug}>
                  <Link href={routes.zone(zone.slug)} className={columnLink}>
                    {zone.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={routes.zones}
              className="mt-6 inline-block text-sm text-paper underline-offset-8 hover:underline"
            >
              Voir les zones d’intervention
            </Link>
          </div>

          <div>
            <h2 className={columnTitle}>Contact</h2>
            <address className="mt-6 not-italic text-sm leading-relaxed text-paper/70">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-6">
              <TrackedLink
                href={site.phoneHref}
                event="phone_click"
                payload={{ location: "footer" }}
                className="font-display text-2xl lining-nums text-paper hover:text-brass-light"
              >
                {site.phone}
              </TrackedLink>
            </p>
            {site.email ? (
              <p className="mt-2">
                <TrackedLink
                  href={`mailto:${site.email}`}
                  event="email_click"
                  payload={{ location: "footer" }}
                  className={columnLink}
                >
                  {site.email}
                </TrackedLink>
              </p>
            ) : null}
            {site.openingHours ? (
              <p className="mt-6 text-sm text-paper/50">{site.openingHours}</p>
            ) : null}
          </div>
        </div>
      </Container>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-4 py-6 text-[0.7rem] uppercase tracking-[0.2em] text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
