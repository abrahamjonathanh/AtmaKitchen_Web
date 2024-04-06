import Image, { StaticImageData } from "next/image";
import Brownies from "@/public/products/Brownies.png";
import { Badge } from "./ui/badge";
import { cn, toRupiah } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const ProductCard = ({
  image = Brownies,
  name = "Brownies",
  variant = "PO",
  price = 300000,
  link = "",
}: {
  image?: HTMLImageElement | StaticImageData;
  name?: string;
  variant?: string;
  price?: number | string;
  link?: string;
}) => {
  return (
    <Link href={""}>
      <div className="border rounded-lg border-slate-200 flex flex-col">
        <Image
          src={image}
          alt={`Image of ${name}`}
          className="rounded-t-lg max-h-36 object-cover"
        />
        <div className="p-3 pb-4 space-y-2">
          <div className="space-y-2">
            <p>{name}</p>
            <Badge variant={"outline"}>{variant}</Badge>
            <p className="font-semibold text-orange-600">
              {toRupiah(parseInt(price.toString()))}
            </p>
          </div>
          {link.length > 0 ? (
            <Link
              href={link}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              Lihat Detail
            </Link>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export { ProductCard };
