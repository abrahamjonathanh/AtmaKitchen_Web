import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ResepCard({
  data,
}: {
  data: {
    id_produk: number;
    nama: string;
    thumbnail: {
      image: string;
    };
  };
}) {
  // console.log(thumbnail.image);
  console.log(data);
  return (
    <div className="border rounded-lg border-slate-200 flex flex-col">
      {/* {data.thumbnail?.image && ( */}
      <Image
        src={
          data.thumbnail?.image ||
          "https://via.placeholder.com/640x480.png/eee?text=Not Available"
        }
        alt={`Image of ${data.nama}`}
        className="rounded-t-lg max-h-36 object-cover"
        width={"480"}
        height={"480"}
        priority
      />
      {/* )} */}
      <div className="p-3 pb-4 space-y-2">
        <p className="text-black font-medium cursor-default">{data.nama}</p>
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
