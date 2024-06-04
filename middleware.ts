import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IKaryawan, IPelanggan } from "./lib/interfaces";

async function fetchUser(
  request: NextRequest,
): Promise<{ data: IKaryawan } | { data: IPelanggan } | null> {
  const token = request.cookies.get("token");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.BASE_API}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user information: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

const UNPROTECTED_ROUTES = ["/u/produk", "/u/hampers"];

const PROTECTED_ROUTES = [
  {
    role: "Customer",
    default: "/u/produk",
    routes: ["/u/produk", "/u/profile", "/u/cart"],
  },
  {
    role: "Admin",
    default: "/a/karyawan",
    routes: [
      "/u/produk",
      "/a/produk",
      "/a/hampers",
      "/a/jabatan",
      "/a/promo",
      "/a/pesanan",
      "/a/jarak-kirim",
      "/a/akun",
      "/a/karyawan",
      "/a/penitip",
      "/a/pelanggan",
      "/a/bahan-baku",
      "/a/pemesanan-bahan-baku",
      "/a/resep",
      "/a/pengeluaran-lainnya",
      "/a/profile",
      // "/a/dashboard",
    ],
  },
  {
    role: "Manager Operasional",
    default: "/a/dashboard",
    routes: [
      "/u/produk",
      "/a/produk",
      "/a/hampers",
      "/a/jabatan",
      "/a/promo",
      "/a/pesanan",
      "/a/jarak-kirim",
      "/a/akun",
      "/a/karyawan",
      "/a/penitip",
      "/a/pelanggan",
      "/a/bahan-baku",
      "/a/pemesanan-bahan-baku",
      "/a/resep",
      "/a/pengeluaran-lainnya",
      "/a/profile",
      "/a/dashboard",
    ],
  },
];

export async function middleware(request: NextRequest) {
  const user = await fetchUser(request);

  const token = request.cookies.get("token");

  const requestedPath = request.nextUrl.pathname;

  const PROTECTED = PROTECTED_ROUTES.find(
    (route) => route.role === user?.data?.akun?.role?.role,
  );
  console.log(PROTECTED);
  const UNPROTECTED = UNPROTECTED_ROUTES.some((route) =>
    requestedPath.startsWith(route),
  );

  if (UNPROTECTED) {
    return NextResponse.next();
  }

  // if (token && user?.data?.akun?.role?.role === "Customer") {
  //   return NextResponse.redirect(new URL("/u/produk", request.url));
  // }

  if (!token && requestedPath != "/login")
    return NextResponse.redirect(new URL("/login", request.url));

  if (PROTECTED?.default === requestedPath) {
    // Authorized for default route of the user's role
    return NextResponse.next();
  }
  // Authorized for specific routes within the user's role
  if (
    PROTECTED?.routes &&
    PROTECTED.routes.some((route) => requestedPath.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // Unauthorized for the requested route
  return NextResponse.redirect(
    new URL(PROTECTED?.default || "/login", request.url),
  );
}

export const config = {
  matcher: ["/a/:path*", "/u/:path*"],
  // "/u/:path*(?!/produk|!cart)"
};
