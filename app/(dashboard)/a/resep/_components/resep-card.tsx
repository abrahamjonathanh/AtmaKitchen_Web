import { buttonVariants } from "@/components/ui/button";
import { IResep } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ResepCard({ data }: { data: IResep }) {
  // console.log(thumbnail.image);
  console.log(data);
  return (
    <div className="flex flex-col rounded-lg border border-slate-200">
      {/* {data.thumbnail?.image && ( */}
      <Image
        src={
          data.thumbnail?.image ||
          "https://via.placeholder.com/640x480.png/eee?text=Not Available"
        }
        alt={`Image of ${data.nama}`}
        className="max-h-36 rounded-t-lg object-cover"
        width={"480"}
        height={"480"}
        priority
      />
      {/* )} */}
      <div className="space-y-2 p-3 pb-4">
        <p className="cursor-default font-medium text-black">
          {data.nama} {data.ukuran!}
        </p>
        <Link
          href={`resep/${data.id_produk}`}
          className={cn("w-full", buttonVariants({ variant: "outline" }))}
        >
          Lihat Resep
        </Link>
      </div>
    </div>
  );
}
