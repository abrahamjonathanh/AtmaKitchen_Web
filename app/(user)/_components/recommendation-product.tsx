import { ProductCard } from "@/components/product";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProductRecommendation() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-h4">Rekomendasi untukmu</p>
        <Link
          href={""}
          className={cn(
            "text-slate-500 inline-flex gap-1 items-center",
            buttonVariants({ variant: "ghost" })
          )}
        >
          Lihat Semua
          <ChevronRight size={"16"} />
        </Link>
      </div>
      <div className="grid grid-rows-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow">
        {[1, 2, 3, 4, 5, 6].map((data, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
}
