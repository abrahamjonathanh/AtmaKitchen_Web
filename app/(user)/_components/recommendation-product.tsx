import { ProductCard } from "@/components/product";
import { buttonVariants } from "@/components/ui/button";
import { getAllProduk } from "@/lib/api/produk";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProductRecommendation() {
  const { data } = getAllProduk();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-h4">Rekomendasi untukmu</p>
        <Link
          href={""}
          className={cn(
            "inline-flex items-center gap-1 text-slate-500",
            buttonVariants({ variant: "ghost" }),
          )}
        >
          Lihat Semua
          <ChevronRight size={"16"} />
        </Link>
      </div>
      <div className="overflow grid grid-cols-2 grid-rows-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data?.map(
          (data: any, index: number) =>
            index < 6 && <ProductCard product={data} key={index} />,
        )}
      </div>
    </div>
  );
}
