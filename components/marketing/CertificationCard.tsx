import type { Certification } from "@/types/content";

type CertificationCardProps = {
  certification: Certification;
};

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <article className="border-t border-line pt-8">
      <h3 className="font-display text-2xl text-navy">
        {certification.name}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        {certification.description}
      </p>
    </article>
  );
}
