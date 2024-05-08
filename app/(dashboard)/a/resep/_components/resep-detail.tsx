"use client";
import DeleteDialog from "@/components/deleteDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { deleteResepById } from "@/lib/api/resep";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Brownies from "@/public/products/Brownies.png";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";

export default function ResepDetail({
  data,
}: {
  data: {
    id_produk: number;
    nama: string;
    ukuran: string;
    images: {
      image: string;
    }[];
    // | HTMLImageElement
    // | StaticImageData;
    bahan_baku: {
      id_bahan_baku: string;
      bahan_baku: {
        satuan: string;
        nama: string;
      };
      id: number;
      nama: string;
      jumlah: number;
      satuan: string;
    }[];
  };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter();

  const onDeleteHandler = async () => {
    try {
      setIsLoading(true);
      const response = await deleteResepById(data.id_produk);

      if (response?.status === 200 || response?.status === 201) {
        mutate("/a/resep"); // For auto refresh
        router.push("/a/resep"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error deleting resep: " + error);
    } finally {
      setIsLoading(false); //For stop the loading process
      setIsOpen(false); // For close the dialog
    }
  };
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* <p>{data.resep[0].id}</p> */}
      <Image
        src={data.images.length ? data.images[0].image : Brownies}
        alt={data.nama}
        className="w-full rounded-lg sm:w-1/2 md:w-1/3"
        width={"720"}
        height={"720"}
      />
      <div className="space-y-2">
        <p className="text-h3">{data.nama}</p>
        <p>
          Untuk membuat {data.nama} ({data.ukuran}), dibutuhkan bahan-bahan
          sebagai berikut.
        </p>
        <ul className="list-inside list-decimal">
          {data.bahan_baku.map((bahan, index) => (
            <li key={index}>
              {bahan.bahan_baku.nama} {bahan.jumlah} {bahan.bahan_baku.satuan}
            </li>
          ))}
        </ul>

        {/* Action button */}
        <div className="flex justify-end gap-4">
          <Button variant={"outline"} onClick={() => setIsOpen(true)}>
            Hapus
          </Button>
          <Link
            href={`/a/resep/edit/${data.id_produk}`}
            className={cn(
              "flex items-center gap-1",
              buttonVariants({ variant: "default" }),
            )}
          >
            Ubah <Pencil className="text-white" size={"16"} />
          </Link>
        </div>
        <DeleteDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={`Hapus ${data.nama}`}
          isLoading={isLoading}
          onSubmit={onDeleteHandler}
        />
      </div>
    </div>
  );
}
