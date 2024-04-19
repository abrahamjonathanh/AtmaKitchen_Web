"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Pencil, Plus } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IProduk } from "@/lib/interfaces";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import NotAvailable from "@/public/products/Not Available.png";

const formSchema = z.object({
  id_produk: z.string().optional(),
  nama: z.string().min(1, { message: "Nama produk tidak boleh kosong" }),
  ukuran: z.string().min(1, { message: "Ukuran tidak boleh kosong" }),
  harga: z.string().min(1, { message: "Harga tidak boleh kosong" }),
  kapasitas: z.string().min(1, {
    message: "Kapasitas produksi setiap hari tidak boleh kosong",
  }),
  id_kategori: z.string().min(1, { message: "Kategori tidak boleh kosong" }),
  id_penitip: z.string().optional(),
  image: z.array(z.instanceof(File)).max(5, {
    message: "Foto produk maksimal 5",
  }),
});

export default function ProdukForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IProduk;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Produk editable mode: ${isEditable}`);
  const [isTitipan, setIsTitipan] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: isEditable ? data?.nama ?? "" : "",
      kapasitas: isEditable ? data?.kapasitas ?? "" : "",
      ukuran: isEditable ? data?.ukuran ?? "" : "",
      harga: isEditable ? data?.harga ?? "" : "",
      id_kategori: isEditable ? data?.id_kategori ?? "" : "",
    },
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  useEffect(() => {
    form.setValue("image", selectedImages);
  }, [selectedImages]);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 md:flex-row  w-full"
          encType="multipart/form-data"
        >
          <div className="w-full md:w-1/3 h-max space-y-4">
            {selectedImages.length === 0 ? (
              <Image
                src={NotAvailable}
                alt="Brownies"
                className="w-full h-max rounded-lg aspect-square object-cover"
              />
            ) : (
              <img
                src={URL.createObjectURL(selectedImages[0])}
                alt="Selected Image"
                className="w-full h-max rounded-lg object-cover aspect-square"
              />
            )}
            <div className="grid grid-cols-5 gap-2">
              {selectedImages.slice(0, 5).map((image, index) => (
                <div key={index}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index}`}
                    className="rounded-lg object-cover aspect-square"
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
                          e.target.files ?? []
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
          <div className="space-y-6 w-full p-4 rounded-lg border border-slate-200 h-max ">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-end">
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
                  name="ukuran"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Ukuran</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Ukuran" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <FormField
                  control={form.control}
                  name="harga"
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
                <FormField
                  control={form.control}
                  name="id_kategori"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Kategori</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori Produk" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Kue</SelectItem>
                          <SelectItem value="2">Minuman</SelectItem>
                          <SelectItem value="3">Roti</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Switch
                checked={isTitipan}
                onCheckedChange={() => {
                  setIsTitipan(!isTitipan);
                }}
              />
              {isTitipan ? (
                <FormField
                  control={form.control}
                  name="id_penitip"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Penitip</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih penitip" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Penitip 1</SelectItem>
                          <SelectItem value="2">Penitip 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
            </div>
            <div className="space-y-4">
              <Separator />
            </div>
            <FormField
              control={form.control}
              name="kapasitas"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Kapasitas Produksi Setiap Hari</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Kapasitas Produk"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end">
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
