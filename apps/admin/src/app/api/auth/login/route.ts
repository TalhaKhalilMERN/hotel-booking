import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api";
import type { LoginResponse } from "@/types/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic server-side validation of payload format
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json(
        { message: "Invalid email or password format" },
        { status: 400 }
      );
    }

    const apiBaseUrl = getApiBaseUrl();
    const backendRes = await fetch(`${apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const data = (await backendRes.json()) as LoginResponse;

    // Enforce that only ADMIN accounts can log in to the admin panel
    if (data.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Access denied. Administrator privileges required." },
        { status: 403 }
      );
    }

    // Set secure HttpOnly cookie on Next.js admin origin
    const isProduction = process.env.NODE_ENV === "production";
    const response = NextResponse.json({
      user: data.user,
      success: true,
    });

    response.cookies.set("admin_token", data.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours in seconds
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Authentication service unavailable. Please try again." },
      { status: 500 }
    );
  }
}
