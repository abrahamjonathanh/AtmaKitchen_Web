// import { NextRequest, NextResponse } from "next/server";

// export const config = {
//   matcher: ["/login", "/karyawan, /resep:path*"],
// };

// // TODO: Redirect if unauthenticated
// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token");
//   console.log(token);
//   if (req.nextUrl.pathname != "/login" && token === undefined) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  console.log(request.nextUrl.pathname);
  if (!token && request.nextUrl.pathname != "/login")
    return NextResponse.redirect(new URL("/login", request.url));

  return;
}

export const config = {
  matcher: "/a/:path*",
};
