import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect /login if already authenticated
  if (request.nextUrl.pathname === "/login" && session) {
    try {
      await decrypt(session);
      return NextResponse.redirect(new URL("/admin", request.url));
    } catch (e) {
      // Invalid session, allow login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
