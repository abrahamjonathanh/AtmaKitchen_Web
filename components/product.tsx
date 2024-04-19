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
  image?: string | HTMLImageElement | StaticImageData;
  name?: string;
  variant?: string;
  price?: number | string;
  link?: string;
}) => {
  return (
    <Link href={""}>
      <div className="border rounded-lg border-slate-200 flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow">
        <div className="max-h-max relative">
          <Image
            src={image}
            alt={`Image of ${name}`}
            className="rounded-t-lg max-h-36 object-cover"
            width={"460"}
            height={"460"}
          />
          {/* <div className="relative w-full text-sm text-white">
            <img
              src="https://images.tokopedia.net/img/phOWBv/2024/3/28/0473d7a1-cc8a-41fb-aeff-0a7633a445e5.png"
              className="h-5"
            />
            <p className="absolute top-0 bottom-0 text-xs font-semibold px-3">
              Flash Sale
            </p>
          </div> */}
        </div>
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
