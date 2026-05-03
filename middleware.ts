import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE } from "@/lib/auth-users";

const publicPaths = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  const isLoggedIn = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (!isLoggedIn && !isPublicPath) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && pathname === "/login") {
    const projectsUrl = request.nextUrl.clone();
    projectsUrl.pathname = "/projects";
    projectsUrl.search = "";
    return NextResponse.redirect(projectsUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"]
};
