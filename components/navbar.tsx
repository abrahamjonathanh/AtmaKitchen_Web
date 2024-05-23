"use client";
import React, { useState } from "react";
import MaxWidthWrapper from "./maxWidthWrapper";
import LogoOrange from "../public/logo/LogoO.svg";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Bell,
  ChevronDown,
  History,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User2,
} from "lucide-react";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DefaultAvatar from "../public/avatars/Default.png";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import UserSidebar from "./user-sidebar";
import { Notifications } from "./notification";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sidebar } from "./sidebar";
import { getCurrentUser, logout } from "@/lib/api/auth";
import Loading from "./ui/loading";
import Cookies from "js-cookie";
import { useCurrentUserStore } from "@/lib/state/user-store";
export function Navbar() {
  // let user = null;
  // try {
  //   user = JSON.parse(localStorage.getItem("user")!);
  // } catch (error) {
  //   console.error("Error parsing user data from localStorage:", error);
  // }

  // const auth = user;

  // console.log(auth);

  const navbar = [
    { title: "Produk", href: "/u/produk" },
    { title: "Keranjang", href: "/u/cart" },
    { title: "Profil", href: "/u/profile" },
  ];
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-14 items-center border-b border-slate-200 bg-white bg-opacity-95">
      <MaxWidthWrapper className="flex justify-between">
        <Link href={"/"}>
          <Image src={LogoOrange} alt="AtmaKitchen Logo" />
        </Link>
        <div className="hidden gap-4 lg:flex">
          {navbar.map((data, index) => (
            <Button variant={"link"} className="text-black" key={index}>
              <Link href={data.href}>{data.title}</Link>
            </Button>
          ))}
        </div>
        <div className="flex gap-4">
          <Link href={"/login"}>
            <Button>Masuk</Button>
          </Link>
          <Sheet>
            <SheetTrigger className="block lg:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-orange-600">
                  <Link href={""}>AtmaKitchen</Link>
                </SheetTitle>

                <Separator />
                <div className="flex flex-col gap-2">
                  {navbar.map((data, index) => (
                    <Button variant={"link"} className="text-black" key={index}>
                      <Link href={data.href}>{data.title}</Link>
                    </Button>
                  ))}
                  <Button>
                    <Link href={"/login"}>Masuk</Link>
                  </Button>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export function NavbarDashboard({ title }: { title: string }) {
  const { data, isLoading } = getCurrentUser();
  const router = useRouter();

  const onLogoutHandler = async () => {
    const response = await logout();

    if (response.status === 200) {
      router.push("/login");
    }
    console.log(response);
  };

  return (
    <div className="flex max-h-16 w-full items-center justify-between border-b border-slate-200 p-4 lg:pr-16">
      <p className="text-h3">{title}</p>
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {!isLoading ? (
              <Button variant={"ghost"} className="space-x-2 p-1">
                <Avatar>
                  <AvatarImage
                    src={data.akun.profile_image}
                    className="w-10 rounded-full border border-slate-200 object-cover"
                  />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <p className="hidden font-medium sm:block">
                  {data.nama.split(" ")[0]}
                </p>
                <ChevronDown size={"16"} />
              </Button>
            ) : null}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/a/profile"}>
              <DropdownMenuItem className="flex cursor-pointer gap-2">
                <User2 size={"16"} />
                Profile
              </DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem> */}
            <DropdownMenuItem
              className="flex cursor-pointer gap-2"
              onClick={onLogoutHandler}
            >
              <LogOut size={"16"} />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger
            className={buttonVariants({
              variant: "ghost",
              className: "block lg:hidden",
            })}
          >
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <Sidebar className={"block lg:hidden"} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export function NavbarUser() {
  // const user = Cookies.get("token") ? getCurrentUser() : null;
  // const { data, isLoading } = user || {}; // Destructuring assignment with default value
  const { currentUser, isLoggedIn } = useCurrentUserStore();
  const router = useRouter();

  const onLogoutHandler = async () => {
    const response = await logout();

    if (response.status === 200) {
      router.push("/login");
    }
    console.log(response);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const onSearchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedQuery = encodeURI(searchQuery);
    console.log(encodedQuery);

    router.push(`/u/produk/search?q=${encodedQuery}`);
  };

  return (
    <MaxWidthWrapper className="sticky inset-x-0 top-0 z-50 flex max-h-16 items-center justify-between gap-4 overflow-y-hidden border-b border-slate-200 bg-white bg-opacity-95 py-4">
      {/* Logo and search */}
      <div className="flex w-full gap-4">
        <div className="hidden w-32 items-center sm:inline-flex lg:w-40">
          {/* Logo */}
          <Link href={"/u/produk"}>
            <Image src={LogoOrange} alt="AtmaKitchen Logo" />
          </Link>
        </div>
        <div className="flex w-full items-center gap-4 ">
          {/* Kategori */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className="hidden space-x-2 lg:inline-flex"
              >
                <p className="font-medium">Kategori</p>
                <ChevronDown size={"16"} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Kategori Produk</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/profile"}>
                <DropdownMenuItem className="flex cursor-pointer gap-2">
                  Kue
                </DropdownMenuItem>
              </Link>
              <Link href={""}>
                <DropdownMenuItem className="flex cursor-pointer gap-2">
                  Roti
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-slate-500" />

            <form onSubmit={onSearchHandler}>
              <Input
                placeholder="Cari di AtmaKitchen..."
                className="max-w-xl pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
      {/* History, Cart, and Menu */}
      <div className="flex gap-0 lg:gap-2">
        {isLoggedIn && currentUser && (
          <>
            {/* History */}
            <Link
              href={"/u/profile?showing=pesanan"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "px-2 text-slate-500",
                }),
              )}
            >
              <History size={"24"} />
            </Link>
            {/* Notification */}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="relative px-2 text-slate-500"
                >
                  <Bell size={"24"} />
                  <div className="absolute -end-1 -top-1 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-orange-600 text-xs font-bold text-white dark:border-gray-900">
                    1
                  </div>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="px-0 pb-0">
                <Notifications />
              </HoverCardContent>
            </HoverCard>
            {/* Cart */}
            <Link
              href={"/u/cart"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "relative px-2 text-slate-500",
                }),
              )}
            >
              <ShoppingCart size={"24"} />
              <div className="absolute -end-1 -top-1 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-orange-600 text-xs font-bold text-white dark:border-gray-900">
                {currentUser.count_keranjang?.detail_keranjang_count}
              </div>
            </Link>
          </>
        )}

        <div className="flex gap-2 ">
          {/* Profile */}
          {isLoggedIn && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="hidden space-x-2 p-1 px-1 lg:inline-flex"
                >
                  <Avatar>
                    <AvatarImage
                      src={currentUser.akun?.profile_image}
                      className="w-10 rounded-full border border-slate-200"
                    />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <p className="hidden font-medium sm:block">
                    {currentUser.nama.split(" ")[0]}
                  </p>
                  <ChevronDown size={"16"} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/u/profile"}>
                  <DropdownMenuItem className="flex cursor-pointer gap-2">
                    <User2 size={"16"} />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="flex cursor-pointer gap-2"
                  onClick={onLogoutHandler}
                >
                  <LogOut size={"16"} />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={"/login"}
              className={cn(
                buttonVariants({
                  variant: "default",
                }),
              )}
            >
              Masuk
            </Link>
          )}
          {/* Menu in mobile */}
          <Sheet>
            <SheetTrigger
              className={buttonVariants({
                variant: "ghost",
                className: "block px-0 lg:hidden",
              })}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent className="w-full sm:w-3/4 ">
              {currentUser && isLoggedIn && <UserSidebar data={currentUser} />}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
