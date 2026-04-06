"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signToken, verifyToken } from "@/lib/auth-token";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "kinuit_admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Kinuit@2026";
const SESSION_NAME = "kinuit_admin_session";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = await signToken({ username });
    const cookieStore = await cookies();
    cookieStore.set(SESSION_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "lax",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid credentials" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_NAME);
  redirect("/admin/login");
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_NAME)?.value;
  if (!token) return false;
  
  const payload = await verifyToken(token);
  return !!payload;
}
