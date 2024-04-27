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

import React, { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IPemesananBahanBaku } from "@/lib/interfaces";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  id_pemesanan_bahan_baku: z.string().optional(),
  id_bahan_baku: z.string().optional(),
  nama: z
    .string()
    // .min(1, { message: "Nama produk tidak boleh kosong" })
    .optional(),
  satuan: z.enum(["gr", "ml", "butir", "buah", ""]),
  jumlah: z.string().min(1, { message: "Harga tidak boleh kosong" }),
  harga_beli: z.string().min(1, { message: "Harga tidak boleh kosong" }),
});

export default function PemesananBahanBakuForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IPemesananBahanBaku;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Pemesanan Bahan Baku editable mode: ${isEditable}`);
  const [isNew, setIsNew] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_pemesanan_bahan_baku: isEditable
        ? data?.id_pemesanan_bahan_baku ?? ""
        : "",
      id_bahan_baku: isEditable ? data?.id_bahan_baku ?? "" : "",
      nama: isEditable ? data?.nama ?? "" : "",
      satuan: isEditable ? data?.satuan ?? "" : "",
      jumlah: isEditable ? data?.jumlah ?? "" : "",
      harga_beli: isEditable ? data?.harga_beli ?? "" : "",
    },
  });

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 md:flex-row  w-full"
          encType="multipart/form-data"
        >
          <div className="space-y-6 w-full p-4 rounded-lg border border-slate-200 h-max ">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <FormField
                  control={form.control}
                  name="id_bahan_baku"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Bahan Baku</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isNew}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Bahan Baku" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Telur</SelectItem>
                          <SelectItem value="2">Coklat Bubuk</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isNew}
                    onCheckedChange={() => {
                      setIsNew(!isNew);
                    }}
                    id="isNewMode"
                  />
                  <Label htmlFor="isNewMode">Bahan Baku Baru</Label>
                </div>
                {isNew ? (
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Nama Bahan Baku</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama Bahan Baku" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <FormField
                  control={form.control}
                  name="jumlah"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Banyak</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Banyak" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="harga_beli"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Harga Satuan</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Harga Satuan"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="satuan"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Satuan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Satuan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gr">Gram</SelectItem>
                          <SelectItem value="ml">Ml</SelectItem>
                          <SelectItem value="butir">Butir</SelectItem>
                          <SelectItem value="buah">Buah</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4">
              <Separator />
            </div>
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
