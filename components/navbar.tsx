import React from "react";
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
import { ChevronDown, LogOut, Menu, User2 } from "lucide-react";
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
