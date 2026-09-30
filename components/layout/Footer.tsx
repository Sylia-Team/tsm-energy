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

export function Footer() {
  const site = getSiteContent();
  const services = getServicesContent();
  const zones = getZonesContent();
  const addressLines = formatAddressLines(site.address);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-paper">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <Logo inverted />
            <p className="mt-5 text-sm leading-relaxed text-paper/75">
              {site.tagline}. Rénovation, maçonnerie, isolation, toiture et
              extension de maison.
            </p>
            <TrackedLink
              href={routes.quote}
              event="cta_click"
              payload={{ location: "footer" }}
              className={buttonClassName("primary", "mt-6")}
            >
              Demander un devis
            </TrackedLink>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/55">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={routes.service(service.slug)}
                    className="text-sm text-paper/85 transition-colors duration-150 hover:text-paper"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/55">
              Zones d’intervention
            </h2>
            <ul className="mt-4 space-y-2.5">
              {zones.map((zone) => (
                <li key={zone.slug}>
                  <Link
                    href={routes.zone(zone.slug)}
                    className="text-sm text-paper/85 transition-colors duration-150 hover:text-paper"
                  >
                    {zone.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={routes.zones}
              className="mt-4 inline-block text-sm font-medium text-paper underline-offset-4 hover:underline"
            >
              Voir les zones d’intervention
            </Link>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/55">
              Contact
            </h2>
            <address className="mt-4 not-italic text-sm leading-relaxed text-paper/85">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-4">
              <TrackedLink
                href={site.phoneHref}
                event="phone_click"
                payload={{ location: "footer" }}
                className="text-sm font-medium text-paper hover:underline"
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
                  className="text-sm text-paper/85 hover:underline"
                >
                  {site.email}
                </TrackedLink>
              </p>
            ) : null}
            {site.openingHours ? (
              <p className="mt-4 text-sm text-paper/75">{site.openingHours}</p>
            ) : null}
          </div>
        </div>
      </Container>

      <div className="bg-forest-deep">
        <Container className="flex flex-col gap-4 py-5 text-xs text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-paper">
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
