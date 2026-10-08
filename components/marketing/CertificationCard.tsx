import type { Certification } from "@/types/content";

type CertificationCardProps = {
  certification: Certification;
};

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <article className="border border-line bg-paper-elevated p-6">
      <h3 className="text-lg font-semibold tracking-[-0.01em] text-navy">
        {certification.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {certification.description}
      </p>
    </article>
  );
}
