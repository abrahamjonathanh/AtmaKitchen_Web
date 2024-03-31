import React from "react";
import MaxWidthWrapper from "./maxWidthWrapper";
import LogoOrange from "../public/logo/LogoO.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "./ui/separator";

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
    <div className="w-full border-b border-slate-200 p-4">
      <p className="text-semilarge">{title}</p>
    </div>
  );
}
