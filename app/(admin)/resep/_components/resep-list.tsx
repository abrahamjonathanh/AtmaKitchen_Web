"use client";
import ResepCard from "./resep-card";
import LapisLegit from "../../../../public/products/Lapis legit.png";
import LapisSurabaya from "../../../../public/products/Lapis surabaya.png";
import Brownies from "../../../../public/products/Brownies.png";
import Mandarin from "../../../../public/products/Mandarin.png";
import Spikoe from "../../../../public/products/Spikoe.png";
import RotiSosis from "../../../../public/products/Roti sosis.png";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
export default function ResepList() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const resep = [
    { id: 1, title: "Lapis Legit", image: LapisLegit },
    { id: 2, title: "Lapis Surabaya", image: LapisSurabaya },
    { id: 3, title: "Brownies", image: Brownies },
    { id: 4, title: "Mandarin", image: Mandarin },
    { id: 5, title: "Spikoe", image: Spikoe },
    { id: 6, title: "Roti Sosis", image: RotiSosis },
  ];

  const filteredResep = resep.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4 items-center">
        <Input
          placeholder="Cari berdasarkan nama produk..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link
          href={pathname + "/create"}
          className={cn(
            "flex items-center gap-1",
            buttonVariants({ variant: "default" })
          )}
        >
          Tambah
          <Plus className="text-white" size={"16"} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredResep.length ? (
          filteredResep.map((data, index) => (
            <ResepCard {...data} key={index} />
          ))
        ) : (
          // Handling not found result
          <p className="text-slate-500">Produk tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}
