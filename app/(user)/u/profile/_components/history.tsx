import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import UserHistoryCard from "./history-card";
import { Search } from "lucide-react";
import { getPelangganById } from "@/lib/api/pelanggan";
import { IPesananv2 } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import Loading from "@/components/ui/loading";

const formSchema = z.object({
  searchQuery: z.string().optional(),
});

export default function UserHistory({ id_user }: { id_user: string }) {
  const { data, isLoading } = getPelangganById(parseInt(id_user));

  return data && !isLoading ? (
    <div className="space-y-4">
      <p className="text-h4">Riwayat Pesanan Saya</p>
      <UserListHistory data={data.histori_pesanan} />
    </div>
  ) : (
    <Loading />
  );
}

export const UserListHistory = ({
  data,
  isAdmin = false,
}: {
  data: IPesananv2[];
  isAdmin?: boolean;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  const filteredData = data
    .map((pesanan) => {
      const matchingDetailPesanan = pesanan.detail_pesanan!.filter((detail) =>
        detail.nama_produk
          .toLowerCase()
          .includes(form.watch("searchQuery")!.toLowerCase()),
      );
      // If there are matching products, return a new pesanan object with only the matching detail_pesanan
      return matchingDetailPesanan.length > 0
        ? { ...pesanan, detail_pesanan: matchingDetailPesanan }
        : null;

      // return matchingDetailPesanan.length > 0 ? pesanan : null;
    })
    .filter((pesanan) => pesanan); // Filter out null values

  return (
    <>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <div className="relative">
                <Search className="absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-slate-500" />
                <Input
                  placeholder="Cari berdasarkan nama produk..."
                  className="max-w-sm pl-12"
                  {...field}
                />
              </div>
            )}
          />
        </form>
      </Form>

      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((data, index: number) => (
            <UserHistoryCard key={index} data={data!} isAdmin={isAdmin} />
          ))
        ) : (
          <p className=" text-slate-500">
            Produk{" "}
            <span className="font-medium">
              &quot;{form.watch("searchQuery")}&quot;
            </span>{" "}
            tidak ditemukan.
          </p>
        )}
      </div>
    </>
  );
};
