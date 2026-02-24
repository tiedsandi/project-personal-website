import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  // Allow login page freely
  if (pathname === "/admin/login") {
    // If already logged in, redirect to dashboard
    if (token && adminPassword && token === adminPassword) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protect all /admin/* except /admin/login
  if (pathname.startsWith("/admin")) {
    if (!token || !adminPassword || token !== adminPassword) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
