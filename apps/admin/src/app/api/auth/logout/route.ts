import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  // Attempt backend logout to clear any server-side cookies or invalidate if supported
  if (token) {
    try {
      const apiBaseUrl = getApiBaseUrl();
      await fetch(`${apiBaseUrl}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `admin_token=${token}`,
        },
      });
    } catch {
      // Continue clearing local cookie even if backend fails
    }
  }

  const isProduction = process.env.NODE_ENV === "production";
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Explicitly clear the HttpOnly admin_token cookie
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
