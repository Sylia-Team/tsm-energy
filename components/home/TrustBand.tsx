import Link from "next/link";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";
import type { Certification, ZoneSummary } from "@/types/content";

type TrustBandProps = {
  certificationsLabel: string;
  certifications: Certification[];
  zonesLabel: string;
  zones: ZoneSummary[];
};

/** Garanties et secteur, présentés discrètement plutôt qu’en grilles de cartes. */
export function TrustBand({
  certificationsLabel,
  certifications,
  zonesLabel,
  zones,
}: TrustBandProps) {
  return (
    <section className="border-t border-line py-16">
      <Container className="grid gap-10 text-sm md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-[0.7rem] uppercase tracking-[0.3em] text-ink-muted">
            {certificationsLabel}
          </h2>
          <p className="mt-4 leading-relaxed text-ink">
            {certifications.map((item) => item.name).join(" · ")}
          </p>
        </div>
        <div>
          <h2 className="text-[0.7rem] uppercase tracking-[0.3em] text-ink-muted">
            <Link href={routes.zones} className="hover:text-navy">
              {zonesLabel}
            </Link>
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-2 leading-relaxed text-ink">
            {zones.map((zone, index) => (
              <li key={zone.slug}>
                <Link href={routes.zone(zone.slug)} className="hover:text-navy hover:underline">
                  {zone.name}
                </Link>
                {index < zones.length - 1 ? (
                  <span aria-hidden="true" className="ml-2">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
