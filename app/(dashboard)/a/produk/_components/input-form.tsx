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
import { IPenitip, IProduk } from "@/lib/interfaces";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import NotAvailable from "@/public/products/Not Available.png";
import { Label } from "@/components/ui/label";
import { getAllPenitip } from "@/lib/api/penitip";

const formSchema = z.object({
  id_produk: z.string().optional(),
  nama: z.string().min(1, { message: "Nama produk tidak boleh kosong" }),
  ukuran: z.string().min(1, { message: "Ukuran tidak boleh kosong" }),
  harga_jual: z.string().min(1, { message: "Harga tidak boleh kosong" }),
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

  const router = useRouter();

  const penitip = getAllPenitip();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: isEditable ? data?.nama.toString() ?? "" : "",
      kapasitas: isEditable ? data?.kapasitas.toString() ?? "" : "",
      ukuran: isEditable ? data?.ukuran.toString() ?? "" : "",
      harga_jual: isEditable ? data?.harga_jual.toString() ?? "" : "",
      id_kategori: isEditable ? data?.id_kategori?.toString() ?? "" : "",
      id_penitip: isEditable ? data?.id_penitip?.toString() ?? "" : "",
    },
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [indexImageSelected, setIndexImageSelected] = useState(0);
  const [isTitipan, setIsTitipan] = useState(
    isEditable && data?.id_penitip ? true : false,
  );

  // TODO: fix update penitip
  useEffect(() => {
    form.setValue("image", selectedImages);
    console.log(selectedImages);
  }, [selectedImages, form]);

  useEffect(() => {
    if (!isTitipan) {
      form.setValue("id_penitip", "");
    }
  }, [isTitipan, form]);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4  md:flex-row"
          encType="multipart/form-data"
        >
          <div className="h-max w-full space-y-4 md:w-1/3">
            {isEditable && data?.thumbnail?.image ? (
              <Image
                src={data?.thumbnail?.image!}
                alt="Product Image"
                className="aspect-square h-max w-full rounded-lg object-cover"
                width={500}
                height={500}
              />
            ) : selectedImages.length === 0 ? (
              <Image
                src={NotAvailable}
                alt="Brownies"
                className="aspect-square h-max w-full rounded-lg object-cover"
              />
            ) : (
              <Image
                src={URL.createObjectURL(selectedImages[indexImageSelected])}
                alt="Selected Image"
                className="aspect-square h-max w-full rounded-lg object-cover"
                width={500}
                height={500}
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
            {!isEditable && (
              <>
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
                  file yang diperbolehkan: .JPG .JPEG .PNG. Maksimal unggah 5
                  foto per produk.
                </p>
              </>
            )}
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
              <div className="flex flex-col items-end gap-4 md:flex-row">
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
                          <SelectItem value="2">Roti</SelectItem>
                          <SelectItem value="3">Minuman</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isTitipan}
                  onCheckedChange={() => {
                    setIsTitipan(!isTitipan);
                  }}
                  id="isTitipanMode"
                />
                <Label htmlFor="isTitipanMode">Produk Titipan</Label>
              </div>
              {isTitipan
                ? !penitip.isLoading &&
                  penitip.data && (
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
                              {penitip.data.map(
                                (data: IPenitip, index: number) => (
                                  <SelectItem
                                    value={data.id_penitip!}
                                    key={index}
                                  >
                                    {data.nama}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                : null}
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
