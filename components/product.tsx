import Image from "next/image";
import { Badge } from "./ui/badge";
import { categoryBadge, cn, toRupiah } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { IHampers, IProduk } from "@/lib/interfaces";
import NotAvailable from "@/public/products/Not Available.png";

const ProductCard = ({
  product = {
    nama: "Brownies",
    harga_jual: "500000",
    id_kategori: "1",
    id_penitip: null,
    id_produk: "1",
    image: [
      {
        image: "https://atmaimages.blob.core.windows.net/images/Brownies.png",
      },
    ],
    thumbnail: {
      image: "https://atmaimages.blob.core.windows.net/images/Brownies.png",
    },
    kapasitas: "20",
    ukuran: "20x20 cm",
    link: "",
  },
  className,
}: {
  product?: any;
  className?: string;
}) => {
  return (
    <Link href={`/u/produk/${product.id_produk}`}>
      <div
        className={cn(
          "flex max-w-full flex-col rounded-lg border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg sm:max-w-56 md:max-w-full",
          className,
        )}
      >
        <div className="relative max-h-max">
          {product.thumbnail?.image ? (
            <Image
              src={product.thumbnail?.image!}
              alt={`Image of ${product.nama}`}
              className="max-h-36 rounded-t-lg object-cover"
              width={"460"}
              height={"460"}
              priority
            />
          ) : product.image ? (
            <Image
              src={product.image!}
              alt={`Image of ${product.nama}`}
              className="max-h-36 rounded-t-lg object-cover"
              width={"460"}
              height={"460"}
              priority
            />
          ) : (
            <Image
              src={NotAvailable}
              alt={`Image of ${product.nama}`}
              className="max-h-36 rounded-t-lg object-cover"
              width={"460"}
              height={"460"}
              priority
            />
          )}
        </div>
        <div className="space-y-2 p-3 pb-4">
          <div className="space-y-2">
            <p>
              {product.nama} {product.ukuran}
            </p>
            <Badge {...categoryBadge(product.id_kategori!)} />
            <p className="font-semibold text-orange-600">
              {toRupiah(parseInt(product.harga_jual.toString()))}
            </p>
          </div>
          {product.link! ? (
            <Link
              href={product.link!}
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
