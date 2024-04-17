import React from "react";
import { Separator } from "./ui/separator";
import { Info } from "lucide-react";
import { cn, toIndonesiaDate } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface INotification {
  id: number;
  title: string;
  description: string;
  created_at: string;
  isRead: boolean;
}

function Notifications() {
  const notification: INotification[] = [
    {
      id: 1,
      title: "Pesanan #11.04.24.004 siap dikirim",
      description: "Pesanan kamu sudah siap untuk dikirimkan.",
      created_at: "2024-04-11T10:22:52Z",
      isRead: false,
    },
    {
      id: 2,
      title: "Pesanan #11.04.24.006 siap diambil",
      description:
        "Pesanan kamu sudah siap untuk diambil. Yuk segera ambil pesananmu :)",
      created_at: "2024-04-11T12:22:52Z",
      isRead: true,
    },
  ];
  return (
    <div className="max-w-sm w-full flex flex-col">
      <div className="bg-white shadow-md px-4">
        <p className="text-large pb-2">Notifikasi (1)</p>
        {/* <Separator /> */}
      </div>
      <ScrollArea className="h-96 space-y-0">
        {notification.map((data, index) => (
          <NotificationCard key={index} data={data} />
        ))}
      </ScrollArea>
      <Separator />
      <Link
        href={""}
        className={cn(
          buttonVariants({ variant: "link", size: "sm" }),
          "self-end"
        )}
      >
        Lihat Semua
      </Link>
    </div>
  );
}

function NotificationCard({ data }: { data: INotification }) {
  return (
    <div
      className={`p-4 border-t ${
        data.isRead ? "bg-white" : "bg-green-50"
      } space-y-2 w-full cursor-pointer hover:bg-slate-50 transition-colors`}
    >
      <p className="text-slate-500 text-xs flex gap-2 items-center ">
        <span className="text-black flex gap-2 items-center text-xs font-semibold">
          <Info size={"16"} /> Info
        </span>{" "}
        {toIndonesiaDate(data.created_at, {
          day: "2-digit",
          month: "short",
          // year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
      <div className="space-y-0">
        <p className="text-body font-semibold">{data.title}</p>
        <p className="text-xs text-slate-500 line-clamp-4 overflow-ellipsis">
          {data.description}
        </p>
      </div>
    </div>
  );
}

export { Notifications, NotificationCard };
