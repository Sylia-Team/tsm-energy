import { loginAction } from "@/app/admin/actions";
import { routes } from "@/lib/routes";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "1";
  const from = params.from ?? routes.admin;

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <div className="w-full rounded-lg border border-line bg-paper-elevated p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-navy">
          Administration TSM
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Saisissez le mot de passe pour accéder à l’édition du contenu.
        </p>

        <form action={loginAction} className="mt-6 space-y-4">
          <input type="hidden" name="from" value={from} />
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-ink"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          {hasError ? (
            <p className="text-sm text-danger" role="alert">
              Mot de passe incorrect.
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
