import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHome, getSite } from "@/lib/content";
import { localBusinessJsonLd } from "@/lib/seo/json-ld";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-archivo",
});

const site = getSite();
const home = getHome();

export const viewport: Viewport = {
  themeColor: "#24332E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
