"use client";
import React from "react";
import AlamatCard from "./alamat-card";
import AlamatDialog from "./alamat-dialog";
import Loading from "@/components/ui/loading";
import { IAlamat } from "@/lib/interfaces";
import { getAlamatPelangganById } from "@/lib/api/alamat";

export default function Alamat({ id_user }: { id_user: number }) {
  const { data, isLoading, mutate } = getAlamatPelangganById(id_user);

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <p className="text-h4">Biodata Diri</p>
        <AlamatDialog />
      </div>
      {data && !isLoading ? (
        <div className="space-y-4">
          {data.alamat.map((data: IAlamat, index: number) => (
            <AlamatCard key={index} data={data} onRefresh={mutate} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
