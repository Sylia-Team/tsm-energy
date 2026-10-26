import Image from "next/image";
import Link from "next/link";
import { textLinkOnDarkClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconArrow } from "@/components/ui/icons";
import type { ManagerContent } from "@/types/entreprise";

type ManagerQuoteProps = {
  manager: ManagerContent;
  href: string;
  linkLabel: string;
};

export function ManagerQuote({ manager, href, linkLabel }: ManagerQuoteProps) {
  return (
    <section className="bg-navy py-28 text-paper lg:py-40">
      <Container>
        <figure className="mx-auto max-w-4xl text-center">
          <span aria-hidden="true" className="mx-auto mb-12 block h-px w-10 bg-brass-light" />
          <blockquote className="font-display text-3xl italic text-paper sm:text-4xl lg:text-[3.25rem]">
            « {manager.quote} »
          </blockquote>
          <figcaption className="mt-12 flex flex-col items-center gap-5">
            {manager.image.src ? (
              <span className="relative block h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src={manager.image.src}
                  alt={manager.image.alt}
                  fill
                  sizes="80px"
                  className="object-cover grayscale"
                />
              </span>
            ) : null}
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-paper/60">
              <span className="text-brass-light">{manager.name}</span>
              {" — "}
              {manager.role}
            </span>
          </figcaption>
          <Link
            href={href}
            className={`${textLinkOnDarkClassName} mt-10`}
          >
            {linkLabel}
            <IconArrow className="h-4 w-4" />
          </Link>
        </figure>
      </Container>
    </section>
  );
}
