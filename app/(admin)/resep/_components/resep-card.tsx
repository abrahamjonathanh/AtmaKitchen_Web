import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function ResepCard({
  id,
  title,
  image,
}: {
  id: number;
  title: string;
  image: HTMLImageElement | StaticImageData;
}) {
  return (
    <div className="border rounded-lg border-slate-200 flex flex-col">
      <Image
        src={image}
        alt={`Image of ${title}`}
        className="rounded-t-lg max-h-36 object-cover"
      />
      <div className="p-3 pb-4 space-y-2">
        <p className="text-black font-medium cursor-default">{title}</p>
        <Link
          href={`resep/${id}`}
          className={cn("w-full", buttonVariants({ variant: "outline" }))}
        >
          Lihat Resep
        </Link>
      </div>
    </div>
  );
}
