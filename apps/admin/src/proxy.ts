import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read admin_token cookie
  const token = request.cookies.get("admin_token")?.value;

  // Define public paths that don't require authentication
  const isLoginPage = pathname === "/login";
  const isApiAuthRoute = pathname.startsWith("/api/auth");

  // Allow auth API routes without redirection
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // If already authenticated and trying to access /login, redirect to dashboard
  if (isLoginPage) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // For all protected admin routes:
  // If no token cookie exists, redirect immediately to /login with returnUrl
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("from", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, svg, icons
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
