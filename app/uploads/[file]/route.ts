import { readManagedUpload } from "@/lib/admin/media-store";

// Les noms de fichiers sont des UUID : un fichier ne change jamais de contenu.
const CACHE_CONTROL = "public, max-age=31536000, immutable";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
): Promise<Response> {
  const { file } = await params;
  const upload = readManagedUpload(file);

  if (!upload) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(upload.bytes, {
    headers: {
      "Content-Type": upload.contentType,
      "Cache-Control": CACHE_CONTROL,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
