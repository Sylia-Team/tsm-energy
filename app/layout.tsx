import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomeContent, getSiteContent } from "@/lib/admin/content-read";
import { localBusinessJsonLd } from "@/lib/seo/json-ld";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const viewport: Viewport = {
  themeColor: "#0A5A9E",
  width: "device-width",
  initialScale: 1,
};

export function generateMetadata(): Metadata {
  const site = getSiteContent();
  const home = getHomeContent();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} | Entreprise générale du bâtiment dans le Var`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: site.name,
      images: [
        {
          url: home.hero.image.src,
          alt: home.hero.image.alt,
          width: home.hero.image.width,
          height: home.hero.image.height,
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSiteContent();

  return (
    <html lang="fr" className={archivo.variable} data-scroll-behavior="smooth">
      <body className="min-h-dvh bg-paper font-sans text-ink antialiased">
        <SkipLink />
        <JsonLd data={localBusinessJsonLd(site)} />
        <Header />
        <main id="contenu-principal">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
