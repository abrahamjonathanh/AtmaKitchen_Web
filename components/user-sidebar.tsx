import React, { ReactNode } from "react";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";
import Logo from "@/public/logo/LogoO.png";
import Default from "@/public/avatars/Default.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CreditCard,
  FileText,
  HelpCircle,
  LogOut,
  Settings,
  Verified,
  Wallet2,
} from "lucide-react";
import { toRupiah } from "@/lib/utils";

interface SidebarType {
  title: string;
  icon?: ReactNode;
  link: string;
}

export default function UserSidebar() {
  const generalLinks: SidebarType[] = [
    {
      title: "Daftar Transaksi",
      icon: <FileText size={"20"} />,
      link: "/u/profile?showing=pesanan",
    },
    {
      title: "Penarikan Saldo",
      icon: <CreditCard size={"20"} />,
      link: "/u/profile?showing=pesanan",
    },
  ];

  const storeLinks: SidebarType[] = [
    {
      title: "Bantuan AtmaKitchen",
      icon: <HelpCircle size={"20"} />,
      link: "/u/profile?showing=pesanan",
    },
  ];
  return (
    <div className={"block lg:hidden "}>
      <ScrollArea className="h-full pb-12 lg:pb-0">
        <div className="space-y-4">
          {/* Brand */}
          <Link href={"/"} className="space-y-2 flex flex-col items-center">
            <Image src={Logo} alt="AtmaKitchen Logo" />
            <p className="text-orange-600 text-h4">AtmaKitchen</p>
          </Link>
          <Separator />
          <Link
            href={"/u/profile"}
            className="flex gap-4 items-center bg-white"
          >
            <Image
              src={Default}
              alt="Default"
              className="max-w-16 border rounded-full border-slate-200 object-cover"
            />
            <div className="space-y-0 w-full">
              <p className="font-semibold flex gap-1 items-center">
                <span className="text-h4">John Petra</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Verified className="text-blue-600" size={"16"} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-blue-600 text-body flex gap-1 items-center">
                        <Verified className="text-blue-600" size={"16"} />{" "}
                        Verified
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <p className="text-slate-500 flex items-center gap-2 text-body">
                <Wallet2 size={"16"} />
                Saldo {toRupiah(10000)}
              </p>
            </div>
            <Settings size={"32"} className="text-black" />
          </Link>
          <Separator />

          <div className="space-y-2 bg-white">
            {generalLinks.map((data, index) => (
              <Link
                href={data.link}
                className="flex gap-4 items-center py-3"
                key={index}
              >
                {data.icon} {data.title}
              </Link>
            ))}
          </div>
          <Separator />
          <div className="space-y-2 bg-white">
            {storeLinks.map((data, index) => (
              <Link
                href={data.link}
                className="flex gap-4 items-center py-3"
                key={index}
              >
                {data.icon} {data.title}
              </Link>
            ))}
            <Link href={""} className="flex gap-4 items-center py-4">
              <LogOut size={"20"} /> Keluar
            </Link>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
