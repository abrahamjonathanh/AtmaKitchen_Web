"use client";
import ResepCard from "./resep-card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { getAllResep } from "@/lib/api/resep";
import Loading from "@/components/ui/loading";
export default function ResepList() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResep, setFilteredResep] = useState([]);

  const { data, isLoading, isValidating } = getAllResep();

  // Perform filtering only when data changes or searchQuery changes
  useMemo(() => {
    if (data && searchQuery) {
      setFilteredResep(
        data.filter((item: any) =>
          item.nama.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredResep(data || []); // Set filteredResep to data if available
    }
  }, [data, searchQuery]);
  console.log(filteredResep);

  return data && !isLoading && !isValidating ? (
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
          filteredResep.map((dataResep, index) => (
            <ResepCard data={dataResep} key={index} />
          ))
        ) : (
          // Handling not found result
          <p className="text-slate-500">Produk tidak ditemukan.</p>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
