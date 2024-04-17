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
import Sidebar from "./sidebar";
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

export function Navbar() {
  const navbar = [
    { title: "Produk", href: "" },
    { title: "Produk", href: "" },
    { title: "Produk", href: "" },
    { title: "Produk", href: "" },
    { title: "Produk", href: "" },
  ];
  return (
    <nav className="fixed inset-x-0 h-14 border-b border-slate-200 bg-white bg-opacity-95 top-0 z-50 flex items-center">
      <MaxWidthWrapper className="flex justify-between">
        <Link href={"/"}>
          <Image src={LogoOrange} alt="AtmaKitchen Logo" />
        </Link>
        <div className="hidden lg:flex gap-4">
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
  return (
    <div className="w-full border-b border-slate-200 p-4 lg:pr-16 flex justify-between items-center max-h-16">
      <p className="text-h3">{title}</p>
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="space-x-2 p-1">
              <Image
                src={DefaultAvatar}
                alt="Default Avatar"
                className="border rounded-full border-slate-200 w-10"
              />
              <p className="font-medium hidden sm:block">Jeremy</p>
              <ChevronDown size={"16"} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/profile"}>
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <User2 size={"16"} />
                Profile
              </DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem> */}
            <Link href={""}>
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <LogOut size={"16"} />
                Keluar
              </DropdownMenuItem>
            </Link>
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
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearchHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const encodedQuery = encodeURI(searchQuery);

    router.push(`/search?q=${encodedQuery}`);
  };
  return (
    <MaxWidthWrapper className="flex justify-between items-center border-b border-slate-200 max-h-16 py-4 inset-x-0 sticky top-0 z-50 overflow-y-hidden bg-white bg-opacity-95 gap-4">
      {/* Logo and search */}
      <div className="flex gap-4 w-full">
        <div className="w-32 lg:w-40 hidden sm:inline-flex items-center">
          {/* Logo */}
          <Link href={"/"}>
            <Image src={LogoOrange} alt="AtmaKitchen Logo" />
          </Link>
        </div>
        <div className="flex w-full items-center gap-4 ">
          {/* Kategori */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className="space-x-2 hidden lg:inline-flex"
              >
                <p className="font-medium">Kategori</p>
                <ChevronDown size={"16"} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Kategori Produk</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/profile"}>
                <DropdownMenuItem className="flex gap-2 cursor-pointer">
                  Kue
                </DropdownMenuItem>
              </Link>
              <Link href={""}>
                <DropdownMenuItem className="flex gap-2 cursor-pointer">
                  Roti
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Search */}
          <div className="w-full relative">
            <Search className="absolute top-0 bottom-0 w-6 h-6 my-auto text-slate-500 left-3" />

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
        <Link
          href={"/u/profile?showing=pesanan"}
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "px-2 text-slate-500",
            })
          )}
        >
          <History size={"24"} />
        </Link>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant={"ghost"} className="px-2 text-slate-500 relative">
              <Bell size={"24"} />
              <div className="absolute z-10 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-600 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900">
                1
              </div>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="px-0 pb-0">
            <Notifications />
          </HoverCardContent>
        </HoverCard>

        <Link
          href={"/u/cart"}
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "px-2 text-slate-500 relative",
            })
          )}
        >
          <ShoppingCart size={"24"} />
          <div className="absolute z-10 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-600 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900">
            10
          </div>
        </Link>
        <div className="flex gap-2 ">
          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className="space-x-2 p-1 px-1 hidden lg:inline-flex"
              >
                <Image
                  src={DefaultAvatar}
                  alt="Default Avatar"
                  className="border rounded-full border-slate-200 w-10 max-w-16"
                />
                <p className="font-medium hidden sm:block">Jeremy</p>
                <ChevronDown size={"16"} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/u/profile"}>
                <DropdownMenuItem className="flex gap-2 cursor-pointer">
                  <User2 size={"16"} />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href={""}>
                <DropdownMenuItem className="flex gap-2 cursor-pointer">
                  <LogOut size={"16"} />
                  Keluar
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Menu in mobile */}
          <Sheet>
            <SheetTrigger
              className={buttonVariants({
                variant: "ghost",
                className: "block lg:hidden px-0",
              })}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent className="w-full sm:w-3/4 ">
              <UserSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
