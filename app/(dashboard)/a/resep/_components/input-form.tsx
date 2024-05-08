"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IBahanBaku, IProduk, IResep } from "@/lib/interfaces";
import Image from "next/image";
import Brownies from "@/public/products/Brownies.png";
import { Separator } from "@/components/ui/separator";
import { getAllResep } from "@/lib/api/resep";
import { getAllBahanBaku } from "@/lib/api/bahan-baku";
import { getAllProduk } from "@/lib/api/produk";
import UpdateDialog from "@/components/updateDialog";

const formSchema = z.object({
  id_produk: z.string().min(1, { message: "Produk tidak boleh kosong" }),
  bahan_baku: z.array(
    z.object({
      id_bahan_baku: z
        .string()
        .min(1, { message: "Bahan baku tidak boleh kosong" }),
      jumlah: z.string().min(1, { message: "Jumlah tidak boleh kosong" }),
    }),
  ),
});

export default function ResepForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IResep;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Resep editable mode: ${isEditable}`);
  const router = useRouter();

  // 📄 DOCS: To make add button for fields.
  // 1️⃣ You must make the zod in object, then wrap it in array. Example:
  //  z.array(
  //    z.object({
  //      sample: z.string()
  //    })
  //  )
  // 2️⃣ Make defaultValues in useForm in array of objects. Example:
  // defaultValues: {
  //   sample: [{ sampe: ""}]
  // }
  // 3️⃣ Implement useFieldArray to make array in our field. Example:
  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "sample", // This must be the name of zod object name
  // });
  // 4️⃣ Copy the `Fields auto add` in this code.

  //   Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_produk: isEditable ? data?.id_produk.toString() ?? "" : "",
      // nama: isEditable ? data?.nama ?? "" : "",
      bahan_baku: isEditable
        ? data?.bahan_baku
        : [{ id_bahan_baku: "", nama: "", jumlah: "" }],
    },
  });

  console.log(data);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "bahan_baku",
  });

  const produk = getAllProduk();
  const resep = getAllResep();
  const bahan_baku = getAllBahanBaku();
  const [isOpen, setIsOpen] = useState(false);

  // const handleSubmit = (values: {
  //   id_produk: string;
  //   bahan_baku: { id_bahan_baku: string; jumlah: string }[];
  // }) => {
  //   onSubmit(values);
  //   setIsOpen(false);
  // };

  return !resep.isLoading && !bahan_baku.isLoading && !produk.isLoading ? (
    <div className="flex flex-col gap-4 md:flex-row">
      <Image
        src={data?.images?.length ? data?.images[0].image : Brownies}
        alt="Brownies"
        className="h-max w-full rounded-lg md:w-1/3"
        width={"480"}
        height={"480"}
        // placeholder="blur"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-max w-full space-y-6 rounded-lg border border-slate-200 p-4"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="id_produk"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nama Produk</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Produk" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!produk.isLoading &&
                        produk.data.map((produk: IProduk, index: number) => (
                          <SelectItem
                            value={produk.id_produk.toString()}
                            key={index}
                          >
                            {produk.nama} {produk.ukuran}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <div className="space-y-4">
              {/* Fields auto add  */}
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-row items-end gap-4 md:flex-row"
                >
                  {!bahan_baku.isLoading && (
                    <FormField
                      control={form.control}
                      name={`bahan_baku.${index}.id_bahan_baku`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Nama Bahan ke-{index + 1}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih Bahan Baku" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {!bahan_baku.isLoading &&
                                bahan_baku.data.map(
                                  (bahan: IBahanBaku, index: number) => (
                                    <SelectItem
                                      value={bahan.id_bahan_baku!.toString()}
                                      key={index}
                                    >
                                      {bahan.nama} ({bahan.satuan})
                                    </SelectItem>
                                  ),
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name={`bahan_baku.${index}.jumlah`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Jumlah Bahan ke-{index + 1}</FormLabel>
                        <FormControl>
                          <Input placeholder="Jumlah..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="outline"
                  >
                    <Trash2 size={"16"} />
                  </Button>
                </div>
              ))}
              <Button
                variant={"outline"}
                type="button"
                onClick={() => append({ id_bahan_baku: "", jumlah: "" })}
                className="flex w-full gap-2"
              >
                <Plus size={"16"} /> Tambah Bahan Baku
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button variant={"outline"} onClick={() => router.back()}>
              Batal
            </Button>
            <Button
              type="button"
              className="flex gap-2"
              disabled={isLoading}
              onClick={() => setIsOpen(true)}
            >
              {isLoading ? (
                <Loading />
              ) : isEditable ? (
                <>
                  Ubah <Pencil size={"16"} />
                </>
              ) : (
                <>
                  Tambah <Plus size={"16"} />
                </>
              )}
            </Button>
            <UpdateDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title={isEditable ? "Ubah" : "Tambah"}
              description={`Tindakkan ini tidak dapat diulang ketika anda menekan ${isEditable ? "Ubah" : "Tambah"}.`}
              onSubmit={() => onSubmit(form.getValues())}
              isLoading={isLoading}
            />
          </div>
        </form>
      </Form>
    </div>
  ) : (
    <Loading />
  );
}
