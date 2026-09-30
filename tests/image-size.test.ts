import { describe, expect, it } from "vitest";
import { detectImage, readImageSize } from "@/lib/admin/image-size";
import { isManagedUpload } from "@/lib/admin/media-store";

function png(width: number, height: number): Uint8Array {
  const bytes = new Uint8Array(24);
  bytes.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], 0);
  bytes[16] = (width >>> 24) & 0xff;
  bytes[17] = (width >>> 16) & 0xff;
  bytes[18] = (width >>> 8) & 0xff;
  bytes[19] = width & 0xff;
  bytes[20] = (height >>> 24) & 0xff;
  bytes[21] = (height >>> 16) & 0xff;
  bytes[22] = (height >>> 8) & 0xff;
  bytes[23] = height & 0xff;
  return bytes;
}

describe("image size", () => {
  it("lit la taille d’un PNG", () => {
    const bytes = png(1600, 1067);
    expect(detectImage(bytes)).toBe("png");
    expect(readImageSize(bytes, "png")).toEqual({ width: 1600, height: 1067 });
  });

  it("refuse un fichier qui n’est pas une image", () => {
    expect(detectImage(new Uint8Array([0x3c, 0x73, 0x76, 0x67]))).toBeNull();
  });
});

describe("managed uploads", () => {
  it("n’efface que les fichiers créés par l’admin", () => {
    expect(isManagedUpload("/uploads/550e8400-e29b-41d4-a716-446655440000.jpg")).toBe(true);
    expect(isManagedUpload("https://images.unsplash.com/photo.jpg")).toBe(false);
    expect(isManagedUpload("/uploads/../secret.jpg")).toBe(false);
    expect(isManagedUpload("/images/logo.svg")).toBe(false);
  });
});
