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
import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentUserStore } from "@/lib/state/user-store";

interface ContentType {
  title: string;
  icon?: ReactNode;
  link: string;
  more?: ContentType[];
  access_role?: string[];
}

interface SidebarType {
  title: string;
  content: ContentType[];
}

export function Sidebar({ className }: { className?: string }) {
  const { currentUser } = useCurrentUserStore();

  const sidebarData: SidebarType[] = useMemo(
    () => [
      {
        title: "Toko",
        content: [
          {
            title: "Beranda",
            icon: <Home size={"16"} />,
            link: "/a/dashboard",
            access_role: ["Owner", "Manager Operasional"],
          },
          {
            title: "Produk",
            icon: <Box size={"16"} />,
            link: "",
            more: [
              { title: "Produk Biasa", link: "/a/produk" },
              { title: "Produk Hampers", link: "/a/hampers" },
            ],
          },
          {
            title: "Promo",
            icon: <BadgePercent size={"16"} />,
            link: "/a/promo",
          },
          {
            title: "Jabatan",
            icon: <UserCog size={"16"} />,
            link: "/a/jabatan",
          },
        ],
      },
      {
        title: "Pesanan",
        content: [
          {
            title: "Pesanan",
            icon: <ScrollText size={"16"} />,
            link: "/a/pesanan",
          },
          {
            title: "Jarak Kirim",
            icon: <Truck size={"16"} />,
            link: "/a/jarak-kirim",
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
                link: "/a/akun",
              },
              {
                title: "Karyawan",
                link: "/a/karyawan",
              },
              {
                title: "Penitip",
                link: "/a/penitip",
              },
              {
                title: "Pelanggan",
                link: "/a/pelanggan",
              },
            ],
          },
        ],
      },
      {
        title: "Operasional",
        content: [
          {
            title: "Bahan Baku",
            icon: <Warehouse size={"16"} />,
            link: "/a/bahan-baku",
          },
          {
            title: "Pemesanan Bahan Baku",
            icon: <Boxes size={"16"} />,
            link: "/a/pemesanan-bahan-baku",
          },
          { title: "Resep", icon: <BookOpen size={"16"} />, link: "/a/resep" },
        ],
      },
      {
        title: "Keuangan",
        content: [
          {
            title: "Arus Kas",
            icon: <AreaChart size={"16"} />,
            link: "/a/pengeluaran-lainnya",
          },
          {
            title: "Pembayaran Gaji",
            icon: <DollarSign size={"16"} />,
            link: "",
          },
          {
            title: "Penarikan Saldo",
            icon: <CreditCard size={"16"} />,
            link: "/a/penarikan-saldo",
          },
        ],
      },
    ],
    [],
  );

  console.log(currentUser?.akun.role?.role);
  return (
    <div
      className={cn(
        "hidden h-screen w-full space-y-4 p-4 lg:block lg:h-auto lg:max-w-64 lg:border-r",
        className,
      )}
    >
      <ScrollArea className="h-full pb-12 lg:pb-0">
        <div className="space-y-4">
          {/* Brand */}
          <Link href={"/"} className="flex flex-col items-center space-y-2">
            <Image src={Logo} alt="AtmaKitchen Logo" />
            <p className="text-h4 text-orange-600">AtmaKitchen</p>
          </Link>

          {/* Links */}
          {sidebarData.map((sidebar, index) => (
            <div className="space-y-2" key={index}>
              <p className="font-medium text-slate-500">{sidebar.title}</p>
              <div className="flex flex-col gap-1">
                {sidebar.content.map((data, index) => (
                  <div key={index}>
                    {data.more ? (
                      <Collapsible key={index}>
                        <CollapsibleTrigger
                          className={buttonVariants({
                            variant: "ghost",
                            className:
                              "flex w-full items-center justify-between text-sm text-black",
                          })}
                        >
                          <span className="flex justify-start gap-4">
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
                                className="flex w-full justify-start pl-12 text-sm text-black"
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
                        <span className="flex w-full justify-start gap-4 text-sm text-black">
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
        "hidden h-screen w-full space-y-4 p-4 lg:block lg:h-auto lg:max-w-64 lg:border-r lg:pl-16",
        className,
      )}
    >
      {/* Links */}
      {sidebarData.map((sidebar, index) => (
        <div className="space-y-2" key={index}>
          <p className="font-medium text-black">{sidebar.title}</p>
          <div className="flex flex-col gap-1">
            {sidebar.content.map((data, index) => (
              <div key={index}>
                {data.more ? (
                  <Collapsible key={index}>
                    <CollapsibleTrigger
                      className={buttonVariants({
                        variant: "ghost",
                        className:
                          "flex w-full items-center justify-between text-sm text-slate-500",
                      })}
                    >
                      <span className="flex justify-start gap-4 text-slate-500">
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
                            className="flex w-full justify-start pl-12 text-sm text-black"
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
                    <span className="flex w-full justify-start gap-4 text-sm text-slate-500">
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
