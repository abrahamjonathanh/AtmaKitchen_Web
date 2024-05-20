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
import { getCurrentUser, logout } from "@/lib/api/auth";
import { IPelanggan } from "@/lib/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface SidebarType {
  title: string;
  icon?: ReactNode;
  link: string;
}

export default function UserSidebar({ data }: { data: IPelanggan }) {
  const router = useRouter();
  const onLogoutHandler = async () => {
    const response = await logout();

    if (response.status === 200) {
      router.push("/login");
    }
    console.log(response);
  };

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
          <Link href={"/"} className="flex flex-col items-center space-y-2">
            <Image src={Logo} alt="AtmaKitchen Logo" />
            <p className="text-h4 text-orange-600">AtmaKitchen</p>
          </Link>
          <Separator />
          <Link
            href={"/u/profile"}
            className="flex items-center gap-4 bg-white"
          >
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={data.akun?.profile_image}
                className="w-full rounded-full border border-slate-200 object-cover"
              />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-0">
              <p className="flex items-center gap-1 font-semibold">
                <span className="text-h4">{data.nama}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Verified className="text-blue-600" size={"16"} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-body flex items-center gap-1 text-blue-600">
                        <Verified className="text-blue-600" size={"16"} />{" "}
                        Verified
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <p className="text-body flex items-center gap-2 text-slate-500">
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
                className="flex items-center gap-4 py-3"
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
                className="flex items-center gap-4 py-3"
                key={index}
              >
                {data.icon} {data.title}
              </Link>
            ))}
            <Button
              variant={"ghost"}
              className="flex w-full items-center justify-start gap-4 px-0 py-0 hover:bg-transparent"
              onClick={onLogoutHandler}
            >
              <LogOut size={"20"} /> Keluar
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
