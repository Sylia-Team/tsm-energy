import type { NextRequest } from "next/server";

const POSTAL_PATTERN = /^\d{5}$/;
const UPSTREAM = "https://geo.api.gouv.fr/communes";
// Les communes changent très rarement : cache long côté serveur.
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

type GeoCommune = { nom: string };

export async function GET(request: NextRequest): Promise<Response> {
  const postalCode = request.nextUrl.searchParams.get("cp")?.trim() ?? "";

  if (!POSTAL_PATTERN.test(postalCode)) {
    return Response.json([] as string[], { status: 400 });
  }

  try {
    const response = await fetch(
      `${UPSTREAM}?codePostal=${postalCode}&fields=nom&format=json`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      return Response.json([] as string[]);
    }

    const data = (await response.json()) as GeoCommune[];
    const communes = Array.from(new Set(data.map((item) => item.nom))).sort(
      (a, b) => a.localeCompare(b, "fr"),
    );

    return Response.json(communes, {
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return Response.json([] as string[]);
  }
}
