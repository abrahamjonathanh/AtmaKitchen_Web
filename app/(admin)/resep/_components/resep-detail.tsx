"use client";
import DeleteDialog from "@/components/deleteDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { deleteResepById } from "@/lib/api/resep";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Brownies from "@/public/products/Brownies.png";

export default function ResepDetail({
  data,
}: {
  data: {
    id: number;
    nama: string;
    ukuran: string;
    images: {
      image: string;
    }[];
    // | HTMLImageElement
    // | StaticImageData;
    resep: {
      id_bahan_baku: {
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

  const onDeleteHandler = async () => {
    try {
      setIsLoading(true);
      await deleteResepById(data.id);
    } catch (error: any) {
      console.error("Error deleting karyawan: " + error);
    } finally {
      setIsLoading(false); //For stop the loading process
      setIsOpen(false); // For close the dialog
    }
  };
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* <p>{data.resep[0].id}</p> */}
      <Image
        src={data.images[0].image || Brownies}
        alt={data.nama}
        className="rounded-lg w-full sm:w-1/2 md:w-1/3"
        width={"720"}
        height={"720"}
      />
      <div className="space-y-2">
        <p className="text-h3">{data.nama}</p>
        <p>
          Untuk membuat {data.nama} 1 loyang ({data.ukuran}), dibutuhkan
          bahan-bahan sebagai berikut.
        </p>
        <ul className="list-decimal list-inside">
          {data.resep.map((bahan, index) => (
            <li key={index}>
              {bahan.id_bahan_baku.nama} {bahan.jumlah}{" "}
              {bahan.id_bahan_baku.satuan}
            </li>
          ))}
        </ul>

        {/* Action button */}
        <div className="flex justify-end gap-4">
          <Button variant={"outline"} onClick={() => setIsOpen(true)}>
            Hapus
          </Button>
          <Link
            href={`/resep/edit/${data.id}`}
            className={cn(
              "flex items-center gap-1",
              buttonVariants({ variant: "default" })
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
