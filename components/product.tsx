import Image from "next/image";
import Brownies from "@/public/products/Brownies.png";
import { Badge } from "./ui/badge";
import { categoryBadge, cn, toRupiah } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { IProduk } from "@/lib/interfaces";

const ProductCard = ({
  product = {
    nama: "Brownies",
    harga_jual: "500000",
    id_kategori: "1",
    id_penitip: null,
    id_produk: 1,
    image: [Brownies],
    kapasitas: "20",
    ukuran: "20x20 cm",
    link: "",
  },
  className,
}: {
  product?: IProduk;
  className?: string;
}) => {
  return (
    <Link href={`/u/produk/${product.id_produk}`}>
      <div
        className={cn(
          "border rounded-lg border-slate-200 flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow max-w-full sm:max-w-56 md:max-w-full",
          className
        )}
      >
        <div className="max-h-max relative">
          <Image
            src={product.image[0]}
            alt={`Image of ${product.nama}`}
            className="rounded-t-lg max-h-36 object-cover"
            width={"460"}
            height={"460"}
          />
        </div>
        <div className="p-3 pb-4 space-y-2">
          <div className="space-y-2">
            <p>
              {product.nama} {product.ukuran}
            </p>
            <Badge {...categoryBadge(product.id_kategori)} />
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
