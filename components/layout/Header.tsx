import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Logo } from "@/components/layout/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Navigation } from "@/components/layout/Navigation";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconPhone } from "@/components/ui/icons";
import { getSite } from "@/lib/content";
import { routes } from "@/lib/routes";

export function Header() {
  const site = getSite();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="bg-forest text-paper">
        <Container className="flex min-h-10 items-center justify-between gap-4 text-xs tracking-wide">
          <p className="hidden sm:block text-paper/80">
            Entreprise générale du bâtiment · {site.address.city} · {site.address.region}
          </p>
          <p className="sm:hidden text-paper/80">{site.address.city}</p>
          <TrackedLink
            href={site.phoneHref}
            event="phone_click"
            payload={{ location: "header_topbar" }}
            className="inline-flex items-center gap-2 font-medium text-paper hover:text-accent-foreground"
          >
            <IconPhone className="h-3.5 w-3.5" />
            <span>{site.phone}</span>
          </TrackedLink>
        </Container>
      </div>

      <Container className="flex min-h-[4.25rem] items-center justify-between gap-6">
        <Logo />
        <Navigation className="hidden lg:block" />
        <div className="flex items-center gap-2">
          <TrackedLink
            href={site.phoneHref}
            event="phone_click"
            payload={{ location: "header_icon" }}
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-forest lg:hidden"
            aria-label={`Appeler le ${site.phone}`}
          >
            <IconPhone className="h-5 w-5" />
          </TrackedLink>
          <TrackedLink
            href={routes.quote}
            event="cta_click"
            payload={{ location: "header" }}
            className={buttonClassName("primary", "max-lg:hidden")}
          >
            Demander un devis
          </TrackedLink>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
