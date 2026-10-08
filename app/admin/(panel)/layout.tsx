import Image from "next/image";
import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { routes } from "@/lib/routes";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b-2 border-brand-green bg-navy text-paper">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link href={routes.admin} className="inline-flex items-center gap-3">
            <Image
              src="/logo-tsm-v2.png"
              alt=""
              width={345}
              height={218}
              sizes="56px"
              className="h-9 w-auto brightness-0 invert"
            />
            <span className="border-l border-paper/30 pl-3 text-sm font-semibold uppercase tracking-[0.14em]">
              Administration
            </span>
          </Link>
          <div className="flex items-center gap-5 text-sm font-medium">
            <Link
              href={routes.home}
              target="_blank"
              className="text-paper/80 underline-offset-4 hover:text-paper hover:underline"
            >
              Voir le site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-paper/80 underline-offset-4 hover:text-paper hover:underline"
              >
                Se déconnecter
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </>
  );
}
