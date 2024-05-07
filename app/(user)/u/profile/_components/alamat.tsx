"use client";
import React, { useState } from "react";
import AlamatCard from "./alamat-card";
import AlamatDialog from "./alamat-dialog";
import Loading from "@/components/ui/loading";
import { IAlamat } from "@/lib/interfaces";
import { createAlamat, getAlamatPelangganById } from "@/lib/api/alamat";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";

export default function Alamat({ id_user }: { id_user: number }) {
  const { data, isLoading, mutate } = getAlamatPelangganById(id_user);

  const { mutate: mutateClient } = useSWRConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onCreateHandler = async (values: any) => {
    try {
      setIsSubmitting(true);

      const response = await createAlamat({ ...values, id_pelanggan: id_user });

      if (response?.status === 200 || response?.status === 201) {
        mutateClient("/u/profile");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <p className="text-h4">Biodata Diri</p>
        <AlamatDialog
          onSubmit={onCreateHandler}
          isLoading={isSubmitting}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
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
