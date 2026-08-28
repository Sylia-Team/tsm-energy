import { describe, expect, it } from "vitest";
import {
  contentSecurityPolicy,
  getSecurityHeaders,
} from "@/lib/security/headers";

describe("contentSecurityPolicy", () => {
  it("autorise eval uniquement en développement", () => {
    expect(contentSecurityPolicy(true)).toContain("'unsafe-eval'");
    expect(contentSecurityPolicy(false)).not.toContain("'unsafe-eval'");
  });

  it("interdit le framing et les objets embarqués", () => {
    const csp = contentSecurityPolicy(false);

    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("form-action 'self'");
  });
});

describe("getSecurityHeaders", () => {
  it("expose les en-têtes de durcissement attendus", () => {
    const headers = getSecurityHeaders(false);
    const byKey = Object.fromEntries(
      headers.map((header) => [header.key, header.value]),
    );

    expect(byKey["X-Content-Type-Options"]).toBe("nosniff");
    expect(byKey["X-Frame-Options"]).toBe("DENY");
    expect(byKey["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(byKey["Permissions-Policy"]).toBe(
      "camera=(), microphone=(), geolocation=()",
    );
    expect(byKey["Strict-Transport-Security"]).toContain("max-age=63072000");
    expect(byKey["Content-Security-Policy"]).toBe(contentSecurityPolicy(false));
  });
});
