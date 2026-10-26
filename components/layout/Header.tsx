import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Logo } from "@/components/layout/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Navigation } from "@/components/layout/Navigation";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconPhone } from "@/components/ui/icons";
import { getSiteContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";

export function Header() {
  const site = getSiteContent();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <Container className="flex min-h-20 items-center justify-between gap-6">
        <Logo />
        <Navigation className="hidden lg:block" />
        <div className="flex items-center gap-2 lg:gap-6">
          <TrackedLink
            href={site.phoneHref}
            event="phone_click"
            payload={{ location: "header" }}
            className="hidden whitespace-nowrap text-sm text-ink-muted transition-colors hover:text-navy 2xl:inline"
          >
            {site.phone}
          </TrackedLink>
          <TrackedLink
            href={site.phoneHref}
            event="phone_click"
            payload={{ location: "header_icon" }}
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-navy lg:hidden"
            aria-label={`Appeler le ${site.phone}`}
          >
            <IconPhone className="h-5 w-5" />
          </TrackedLink>
          <TrackedLink
            href={routes.quote}
            event="cta_click"
            payload={{ location: "header" }}
            className={buttonClassName("secondary", "whitespace-nowrap max-lg:hidden")}
          >
            Demander un devis
          </TrackedLink>
          <MobileNavigation phone={site.phone} phoneHref={site.phoneHref} />
        </div>
      </Container>
    </header>
  );
}
