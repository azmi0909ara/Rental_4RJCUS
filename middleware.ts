import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin", "/admin/dashboard"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));

  const token = request.cookies.get("__session")?.value;

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
