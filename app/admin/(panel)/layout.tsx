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
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href={routes.admin} className="font-semibold text-forest">
            Administration TSM
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm font-medium text-ink-muted underline-offset-4 hover:underline"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </>
  );
}
