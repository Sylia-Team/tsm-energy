import { Container } from "@/components/ui/container";
import type { ValueProposition } from "@/types/content";
import { Eyebrow } from "@/components/ui/eyebrow";

type HomeIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: ValueProposition[];
};

export function HomeIntro({ eyebrow, title, description, items }: HomeIntroProps) {
  return (
    <section className="py-28 lg:py-40">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow centered>{eyebrow}</Eyebrow>
          <h2 className="mt-8 font-display text-4xl text-navy sm:text-5xl lg:text-[4rem]">
            {title}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {description}
          </p>
        </div>
        <ul className="mt-24 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {items.map((item, index) => (
            <li key={item.id} className="border-t border-line pt-8">
              <p className="text-xs tracking-[0.3em] text-brass">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-2xl text-navy lg:text-[1.75rem]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
