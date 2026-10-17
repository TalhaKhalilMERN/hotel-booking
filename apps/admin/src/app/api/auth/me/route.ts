import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api";
import { cookies } from "next/headers";
import type { AuthenticatedAdminUser } from "@/types/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  try {
    const apiBaseUrl = getApiBaseUrl();
    const backendRes = await fetch(`${apiBaseUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `admin_token=${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!backendRes.ok) {
      // Token is invalid or expired
      const res = NextResponse.json({ authenticated: false, user: null }, { status: 401 });
      res.cookies.delete("admin_token");
      return res;
    }

    const data = (await backendRes.json()) as { user: AuthenticatedAdminUser };

    // Verify role is still ADMIN
    if (data.user.role !== "ADMIN") {
      const res = NextResponse.json({ authenticated: false, user: null }, { status: 403 });
      res.cookies.delete("admin_token");
      return res;
    }

    return NextResponse.json({
      authenticated: true,
      user: data.user,
    });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, user: null, message: "Session verification error" },
      { status: 500 }
    );
  }
}
