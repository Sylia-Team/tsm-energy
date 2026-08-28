"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { buttonClassName } from "@/components/ui/button";
import { IconClose, IconMenu, IconPhone } from "@/components/ui/icons";
import { getSite } from "@/lib/content";
import { headerNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const site = getSite();

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center text-forest"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <IconClose className="h-6 w-6" />
        ) : (
          <IconMenu className="h-6 w-6" />
        )}
        <span className="sr-only">
          {open ? "Fermer le menu" : "Ouvrir le menu"}
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          className="fixed inset-x-0 top-[6.75rem] bottom-0 z-40 overflow-y-auto bg-paper"
        >
          <nav aria-label="Navigation mobile" className="px-4 py-8 sm:px-6">
            <ul className="flex flex-col gap-1 border-b border-line pb-6">
              {headerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 text-lg font-semibold text-forest"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 pt-6">
              <TrackedLink
                href={routes.quote}
                event="cta_click"
                payload={{ location: "mobile_nav" }}
                className={buttonClassName("primary", "w-full")}
                onClick={() => setOpen(false)}
              >
                Demander un devis
              </TrackedLink>
              <TrackedLink
                href={site.phoneHref}
                event="phone_click"
                payload={{ location: "mobile_nav" }}
                className={buttonClassName("secondary", "w-full")}
              >
                <IconPhone className="h-4 w-4" />
                Appeler {site.phone}
              </TrackedLink>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
