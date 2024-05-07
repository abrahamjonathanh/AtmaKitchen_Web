import { Separator } from "@/components/ui/separator";
import { CalendarDays, Phone, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toIndonesiaDate } from "@/lib/utils";
import { IKaryawan } from "@/lib/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminProfileInfo({ data }: { data: IKaryawan }) {
  return (
    <div className="flex w-full flex-col gap-4 py-4 md:w-3/4">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={data.akun?.profile_image}
            className="rounded-full border border-slate-200 object-cover"
          />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <p className="text-h4">{data.nama}</p>
          <p className="text-slate-500">{data.akun?.email}</p>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="flex items-center justify-start gap-4 text-slate-500 sm:justify-start">
          <span className="flex w-1/2 items-center gap-2 sm:w-1/4">
            <User2 size={"16"} />
            <p>Jabatan</p>
          </span>
          <Badge variant={"outline"}>{data.akun?.role?.role}</Badge>
        </div>
        <div className="flex items-center justify-start gap-4 text-slate-500 sm:justify-start">
          <span className="flex w-1/2 items-center gap-2 sm:w-1/4">
            <Phone size={"16"} />
            <p>Telepon</p>
          </span>
          <p className="text-black">{data.telepon}</p>
        </div>
        <div className="flex items-center justify-start gap-4 text-slate-500 sm:justify-start">
          <span className="flex w-1/2 items-center gap-2 sm:w-1/4">
            <CalendarDays size={"16"} />
            <p>Tanggal Gabung</p>
          </span>
          <p className="text-black">{toIndonesiaDate(data.created_at!)}</p>
        </div>
      </div>
    </div>
  );
}
