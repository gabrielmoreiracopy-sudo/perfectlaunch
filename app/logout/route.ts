import { NextResponse } from "next/server";

import { SESSION_COOKIE } from "@/lib/auth-users";

export function GET(request: Request) {
  const loginUrl = new URL("/login", request.url);
  const response = new NextResponse(
    `<!doctype html><html lang="pt-BR"><body><script>localStorage.removeItem("lp_user");location.replace("${loginUrl.pathname}");</script></body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } }
  );
  response.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
  return response;
}
