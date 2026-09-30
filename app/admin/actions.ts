"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_NAME,
  SESSION_TTL_MS,
  createSessionToken,
  verifyPassword,
} from "@/lib/admin/auth";
import { routes } from "@/lib/routes";

function safeInternalPath(candidate: string): string {
  return candidate.startsWith("/admin") ? candidate : routes.admin;
}

export async function loginAction(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");
  const from = safeInternalPath(String(formData.get("from") ?? routes.admin));

  if (!verifyPassword(password)) {
    redirect(
      `${routes.adminLogin}?error=1&from=${encodeURIComponent(from)}`,
    );
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });

  redirect(from);
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect(routes.adminLogin);
}
