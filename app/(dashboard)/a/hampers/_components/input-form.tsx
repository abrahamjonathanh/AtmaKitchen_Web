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

import React, { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IHampers } from "@/lib/interfaces";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import NotAvailable from "@/public/products/Not Available.png";

const formSchema = z.object({
  id_produk_hampers: z.string().optional(),
  nama: z.string().min(1, { message: "Nama produk tidak boleh kosong" }),
  harga_jual: z.string().min(1, { message: "Harga tidak boleh kosong" }),
  image: z.array(z.instanceof(File)).max(5, {
    message: "Foto produk maksimal 5",
  }),
  detail_produk: z.array(
    z.object({
      id_produk: z.string().min(1, { message: "Produk harus dipilih" }),
    }),
  ),
});

export default function HampersForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IHampers;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: isEditable ? data?.nama ?? "" : "",
      harga_jual: isEditable ? data?.harga_jual ?? "" : "",
      detail_produk: isEditable ? data?.detail_hampers : [{ id_produk: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "detail_produk",
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [indexImageSelected, setIndexImageSelected] = useState(0);

  useEffect(() => {
    form.setValue("image", selectedImages);
  }, [selectedImages, form]);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4  md:flex-row"
          encType="multipart/form-data"
        >
          <div className="h-max w-full space-y-4 md:w-1/3">
            {selectedImages.length === 0 ? (
              <Image
                src={NotAvailable}
                alt="Image not available"
                className="aspect-square h-max w-full rounded-lg object-cover"
              />
            ) : (
              <Image
                src={URL.createObjectURL(selectedImages[indexImageSelected])}
                alt="Selected Image"
                className="aspect-square h-max w-full rounded-lg object-cover"
                width={"500"}
                height={"500"}
              />
            )}
            <div className="grid grid-cols-5 gap-2">
              {selectedImages.slice(0, 5).map((image, index) => (
                <div key={index}>
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index}`}
                    className="aspect-square rounded-lg object-cover"
                    width={"500"}
                    height={"500"}
                    onClick={() => setIndexImageSelected(index)}
                  />
                </div>
              ))}
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange } }) => (
                <FormItem className="w-max">
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(
                          e.target.files ?? [],
                        ) as File[];
                        setSelectedImages((prev) => [...prev, ...files]);
                        onChange(selectedImages);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-body text-slate-500">
              Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi
              file yang diperbolehkan: .JPG .JPEG .PNG. Maksimal unggah 5 foto
              per produk.
            </p>
          </div>
          <div className="h-max w-full space-y-6 rounded-lg border border-slate-200 p-4 ">
            <div className="space-y-4">
              <div className="flex flex-col items-end gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nama Produk</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nama Produk"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="harga_jual"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Harga</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Harga Produk"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4">
              <Separator />
            </div>
            <div className="space-y-4">
              {/* Fields auto add  */}
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-row items-end gap-4 md:flex-row"
                >
                  <FormField
                    control={form.control}
                    name={`detail_produk.${index}.id_produk`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Isi Produk ke-{index + 1}</FormLabel>
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
                            <SelectItem value="1">Coklat batang</SelectItem>
                            <SelectItem value="2">Butter</SelectItem>
                          </SelectContent>
                        </Select>
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
                onClick={() => append({ id_produk: "" })}
                className="flex w-full gap-2"
              >
                <Plus size={"16"} /> Tambah Bahan Baku
              </Button>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button variant={"outline"} onClick={() => router.back()}>
                Batal
              </Button>
              <Button type="submit" className="flex gap-2" disabled={isLoading}>
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
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
