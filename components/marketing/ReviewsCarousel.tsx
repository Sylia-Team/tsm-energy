"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReviewCard } from "@/components/marketing/ReviewCard";
import { IconArrow } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { GoogleReview } from "@/types/reviews";

type ReviewsCarouselProps = {
  reviews: GoogleReview[];
  className?: string;
};

const navButton =
  "inline-flex h-12 w-12 items-center justify-center border border-navy text-navy transition-colors duration-300 hover:bg-navy hover:text-paper disabled:pointer-events-none disabled:opacity-30";

/** Carrousel d'avis : deux par vue (un sur mobile), défilement natif avec accroche + flèches. */
export function ReviewsCarousel({ reviews, className }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // Tolérance d'un pixel : les largeurs fractionnaires empêchent d'atteindre exactement la fin.
    setCanPrev(track.scrollLeft > 1);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateControls();
    window.addEventListener("resize", updateControls);
    return () => window.removeEventListener("resize", updateControls);
  }, [updateControls]);

  function scrollByPage(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  const hasControls = canPrev || canNext;

  return (
    <div
      className={className}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Avis Google"
    >
      <ul
        ref={trackRef}
        onScroll={updateControls}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] focus-visible:outline-offset-4 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review, index) => (
          <li
            key={review.id}
            className="shrink-0 basis-full snap-start md:basis-[calc((100%-1.5rem)/2)]"
            aria-label={`Avis ${index + 1} sur ${reviews.length}`}
          >
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>

      <div className={cn("mt-10 flex justify-end gap-3", !hasControls && "hidden")}>
        <button
          type="button"
          className={navButton}
          onClick={() => scrollByPage(-1)}
          disabled={!canPrev}
          aria-label="Avis précédents"
        >
          <IconArrow className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          className={navButton}
          onClick={() => scrollByPage(1)}
          disabled={!canNext}
          aria-label="Avis suivants"
        >
          <IconArrow className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
