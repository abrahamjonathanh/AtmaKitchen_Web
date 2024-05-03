import Image from "next/image";
import Default from "@/public/avatars/Default.png";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Phone, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toIndonesiaDate } from "@/lib/utils";

export default function AdminProfileInfo() {
  return (
    <div className="py-4 flex flex-col gap-4 w-full md:w-3/4">
      <div className="flex gap-2 sm:gap-4 items-center flex-col sm:flex-row">
        <Image
          src={Default}
          alt="Profile"
          className="rounded-full border border-slate-200 max-w-20"
        />
        <div className="text-center sm:text-left">
          <p className="text-h4">John Petra</p>
          <p className="text-slate-500">john.petra@gmail.com</p>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="text-slate-500 flex gap-4 items-center justify-start sm:justify-start">
          <span className="flex gap-2 items-center w-1/2 sm:w-1/4">
            <User2 size={"16"} />
            <p>Jabatan</p>
          </span>
          <Badge variant={"outline"}>Admin</Badge>
        </div>
        <div className="text-slate-500 flex gap-4 items-center justify-start sm:justify-start">
          <span className="flex gap-2 items-center w-1/2 sm:w-1/4">
            <Phone size={"16"} />
            <p>Telepon</p>
          </span>
          <p className="text-black">085612852715</p>
        </div>
        <div className="text-slate-500 flex gap-4 items-center justify-start sm:justify-start">
          <span className="flex gap-2 items-center w-1/2 sm:w-1/4">
            <CalendarDays size={"16"} />
            <p>Tanggal Gabung</p>
          </span>
          <p className="text-black">
            {toIndonesiaDate("2024-04-03T13:27:00.007Z")}
          </p>
        </div>
      </div>
    </div>
  );
}
