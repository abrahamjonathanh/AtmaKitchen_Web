import { Input } from "@/components/ui/input";
import React from "react";
import UserHistoryCard from "./history-card";
import { Search } from "lucide-react";

export default function UserHistory() {
  return (
    <div className="space-y-4">
      <p className="text-h4">Riwayat Pesanan Saya</p>
      <div className="relative">
        <Search className="absolute top-0 bottom-0 w-6 h-6 my-auto text-slate-500 left-3" />
        <Input
          placeholder="Cari berdasarkan nama produk..."
          className="max-w-sm pl-12"
        />
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((data, index) => (
          <UserHistoryCard key={index} />
        ))}
      </div>
    </div>
  );
}
