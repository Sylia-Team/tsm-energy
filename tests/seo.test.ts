import { describe, expect, it } from "vitest";
import { getRealisations, getServices, getSite, getZones } from "@/lib/content";
import { routes } from "@/lib/routes";
import {
  breadcrumbListJsonLd,
  faqPageJsonLd,
  localBusinessJsonLd,
  telephoneFromHref,
} from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { getIndexableSitemapEntries } from "@/lib/seo/sitemap";
import { absoluteUrl, serializeJsonLd } from "@/lib/seo/url";
import type { SiteConfig } from "@/types/site";

function withSite(overrides: Partial<SiteConfig>): SiteConfig {
  return { ...getSite(), ...overrides };
}

describe("absoluteUrl", () => {
  it("compose l’origine et le chemin", () => {
    expect(absoluteUrl("/", "https://www.tsm83.com")).toBe(
      "https://www.tsm83.com",
    );
    expect(absoluteUrl("/services", "https://www.tsm83.com")).toBe(
      "https://www.tsm83.com/services",
    );
  });
});

describe("localBusinessJsonLd", () => {
  it("n’expose pas le téléphone ni la rue tant qu’ils ne sont pas confirmés", () => {
    const jsonLd = localBusinessJsonLd(getSite());
    const address = jsonLd.address as Record<string, unknown>;

    expect(jsonLd.telephone).toBeUndefined();
    expect(jsonLd.email).toBeUndefined();
    expect(jsonLd.aggregateRating).toBeUndefined();
    expect(address.streetAddress).toBeUndefined();
    expect(address.postalCode).toBeUndefined();
    expect(address.addressLocality).toBe("Sanary-sur-Mer");
  });

  it("ajoute le téléphone et l’adresse une fois confirmés", () => {
    const jsonLd = localBusinessJsonLd(
      withSite({
        phoneStatus: "confirmed",
        addressStatus: "confirmed",
      }),
    );
    const address = jsonLd.address as Record<string, unknown>;

    expect(jsonLd.telephone).toBe("+33494323615");
    expect(address.streetAddress).toContain("95 rue de l’Innovation");
    expect(address.postalCode).toBe("83110");
  });
});

describe("faqPageJsonLd", () => {
  it("n’émet rien sans questions affichées", () => {
    expect(faqPageJsonLd([])).toBeNull();
  });

  it("décrit les questions réellement présentes", () => {
    const jsonLd = faqPageJsonLd([
      { question: "Combien de temps ?", answer: "Après visite." },
    ]);

    expect(jsonLd?.["@type"]).toBe("FAQPage");
    expect(jsonLd?.mainEntity).toHaveLength(1);
  });
});

describe("breadcrumbListJsonLd", () => {
  it("numérote les étapes et pointe la page courante", () => {
    const jsonLd = breadcrumbListJsonLd(
      [
        { label: "Accueil", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Plomberie" },
      ],
      "/services/plomberie",
      "https://www.tsm83.com",
    );
    const items = jsonLd?.itemListElement as Array<Record<string, unknown>>;

    expect(items).toHaveLength(3);
    expect(items[0]?.position).toBe(1);
    expect(items[2]?.item).toBe("https://www.tsm83.com/services/plomberie");
  });
});

describe("sitemap", () => {
  it("liste uniquement les pages indexables existantes", () => {
    const paths = getIndexableSitemapEntries().map((entry) => entry.path);

    expect(paths).toContain(routes.home);
    expect(paths).toContain(routes.quote);
    expect(paths).toContain(routes.service("plomberie"));
    expect(paths).toContain(routes.entreprise);
    expect(paths).toContain(routes.contact);
    expect(paths).not.toContain(routes.quoteConfirmation);
    expect(paths).toContain(routes.avis);
    expect(paths).not.toContain(routes.privacy);
    expect(paths).not.toContain(routes.legal);
    expect(paths).not.toContain(routes.cookies);

    const expectedCount =
      1 +
      1 +
      getServices().length +
      1 +
      getRealisations().length +
      1 +
      getZones().length +
      1 +
      1 +
      1 +
      1;

    expect(paths).toHaveLength(expectedCount);
  });
});

describe("pageMetadata", () => {
  it("désindexe la confirmation de devis", () => {
    const metadata = pageMetadata({
      title: "Demande bien reçue",
      description: "Merci.",
      path: routes.quoteConfirmation,
      index: false,
    });

    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("désindexe les pages légales en gardant le suivi des liens", () => {
    const metadata = pageMetadata({
      title: "Mentions légales",
      description: "Mentions.",
      path: routes.legal,
      index: false,
      follow: true,
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});

describe("serializeJsonLd", () => {
  it("échappe les chevrons pour éviter un XSS", () => {
    expect(serializeJsonLd({ name: "A <b>B</b>" })).toContain("\\u003c");
    expect(serializeJsonLd({ name: "A <b>B</b>" })).not.toContain("<b>");
  });
});

describe("telephoneFromHref", () => {
  it("extrait le numéro E.164", () => {
    expect(telephoneFromHref("tel:+33494323615")).toBe("+33494323615");
    expect(telephoneFromHref("04 94 32 36 15")).toBeNull();
  });
});
