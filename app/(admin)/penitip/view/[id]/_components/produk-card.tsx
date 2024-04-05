import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function ProdukCard({
  id,
  title,
  image,
  price,
}: {
  id: number;
  title: string;
  image: HTMLImageElement | StaticImageData;
  price: number;
}) {
  return (
    <div className="border rounded-lg border-slate-200 flex flex-col">
    <Image
      src={image}
      alt={`Image of ${title}`}
      className="rounded-t-lg max-h-36 object-cover"
    />
    <div className="p-4 flex flex-col justify-between flex-1">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">Rp. {price}</p>
      </div>

    </div>
  </div>
);
}
