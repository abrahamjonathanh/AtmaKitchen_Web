import {
  AreaChart,
  BadgePercent,
  BookOpen,
  Box,
  Boxes,
  ChevronsUpDown,
  CreditCard,
  DollarSign,
  Home,
  ScrollText,
  Truck,
  User2,
  UserCog,
  Warehouse,
} from "lucide-react";
import Logo from "../public/logo/LogoO.png";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContentType {
  title: string;
  icon?: ReactNode;
  link: string;
  more?: ContentType[];
}

interface SidebarType {
  title: string;
  content: ContentType[];
}

export function Sidebar({ className }: { className?: string }) {
  const sidebarData: SidebarType[] = [
    {
      title: "Toko",
      content: [
        {
          title: "Beranda",
          icon: <Home size={"16"} />,
          link: "",
        },
        { title: "Produk", icon: <Box size={"16"} />, link: "" },
        { title: "Promo", icon: <BadgePercent size={"16"} />, link: "/promo" },
        { title: "Jabatan", icon: <UserCog size={"16"} />, link: "/jabatan" },
      ],
    },
    {
      title: "Pesanan",
      content: [
        {
          title: "Pesanan",
          icon: <ScrollText size={"16"} />,
          link: "/pesanan",
        },
        {
          title: "Jarak Kirim",
          icon: <Truck size={"16"} />,
          link: "/jarak-kirim",
        },
      ],
    },
    {
      title: "Pengguna",
      content: [
        {
          title: "Pengguna",
          icon: <User2 size={"16"} />,
          link: "",
          more: [
            {
              title: "Semua Akun",
              link: "/akun",
            },
            {
              title: "Karyawan",
              link: "/karyawan",
            },
            {
              title: "Penitip",
              link: "/penitip",
            },
            {
              title: "Pelanggan",
              link: "/pelanggan",
            },
          ],
        },
        //   TODO: Make dropdown for more sidebar items
      ],
    },
    {
      title: "Operasional",
      content: [
        {
          title: "Bahan Baku",
          icon: <Warehouse size={"16"} />,
          link: "/bahan-baku",
        },
        {
          title: "Pemesanan Bahan Baku",
          icon: <Boxes size={"16"} />,
          link: "",
        },
        { title: "Resep", icon: <BookOpen size={"16"} />, link: "/resep" },
      ],
    },
    {
      title: "Keuangan",
      content: [
        {
          title: "Arus Kas",
          icon: <AreaChart size={"16"} />,
          link: "",
        },
        {
          title: "Pembayaran Gaji",
          icon: <DollarSign size={"16"} />,
          link: "",
        },
        {
          title: "Penarikan Saldo",
          icon: <CreditCard size={"16"} />,
          link: "",
        },
      ],
    },
  ];
  return (
    <div
      className={cn(
        "lg:border-r lg:max-w-64 p-4 space-y-4 hidden lg:block w-full h-screen lg:h-auto",
        className
      )}
    >
      <ScrollArea className="h-full pb-12 lg:pb-0">
        <div className="space-y-4">
          {/* Brand */}
          <Link href={"/"} className="space-y-2 flex flex-col items-center">
            <Image src={Logo} alt="AtmaKitchen Logo" />
            <p className="text-orange-600 text-h4">AtmaKitchen</p>
          </Link>

          {/* Links */}
          {sidebarData.map((sidebar, index) => (
            <div className="space-y-2" key={index}>
              <p className="text-slate-500 font-medium">{sidebar.title}</p>
              <div className="flex flex-col gap-1">
                {sidebar.content.map((data, index) => (
                  <div key={index}>
                    {data.more ? (
                      <Collapsible key={index}>
                        <CollapsibleTrigger
                          className={buttonVariants({
                            variant: "ghost",
                            className:
                              "flex justify-between items-center text-black text-sm w-full",
                          })}
                        >
                          <span className="flex gap-4 justify-start">
                            {data.icon}
                            {data.title}
                          </span>

                          <ChevronsUpDown size={"16"} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {data.more.map((moreData, moreIndex) => (
                            <Link href={moreData.link} key={moreIndex}>
                              <Button
                                variant={"ghost"}
                                size={"default"}
                                className="flex justify-start text-black text-sm w-full pl-12"
                              >
                                {moreData.title}
                              </Button>
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        href={data?.link}
                        key={index}
                        className={buttonVariants({
                          variant: "ghost",
                          className: "w-full",
                        })}
                      >
                        <span className="flex gap-4 justify-start text-black text-sm w-full">
                          {data.icon}
                          {data.title}
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export function UserSidebar({ className }: { className?: string }) {
  const sidebarData: SidebarType[] = [
    {
      title: "Kategori",
      content: [
        { title: "Cake", link: "" },
        { title: "Minuman", link: "" },
        { title: "Roti", link: "" },
        { title: "Hampers", link: "" },
        { title: "Ready Stock", link: "" },
      ],
    },
  ];
  return (
    <div
      className={cn(
        "lg:border-r lg:max-w-64 p-4 space-y-4 hidden lg:block w-full h-screen lg:h-auto lg:pl-16",
        className
      )}
    >
      {/* Links */}
      {sidebarData.map((sidebar, index) => (
        <div className="space-y-2" key={index}>
          <p className="text-black font-medium">{sidebar.title}</p>
          <div className="flex flex-col gap-1">
            {sidebar.content.map((data, index) => (
              <div key={index}>
                {data.more ? (
                  <Collapsible key={index}>
                    <CollapsibleTrigger
                      className={buttonVariants({
                        variant: "ghost",
                        className:
                          "flex justify-between items-center text-slate-500 text-sm w-full",
                      })}
                    >
                      <span className="flex gap-4 justify-start text-slate-500">
                        {data.icon}
                        {data.title}
                      </span>

                      <ChevronsUpDown size={"16"} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {data.more.map((moreData, moreIndex) => (
                        <Link href={moreData.link} key={moreIndex}>
                          <Button
                            variant={"ghost"}
                            size={"default"}
                            className="flex justify-start text-black text-sm w-full pl-12"
                          >
                            {moreData.title}
                          </Button>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    href={data?.link}
                    key={index}
                    className={buttonVariants({
                      variant: "ghost",
                      className: "w-full",
                    })}
                  >
                    <span className="flex gap-4 justify-start text-slate-500 text-sm w-full">
                      {data.icon}
                      {data.title}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
