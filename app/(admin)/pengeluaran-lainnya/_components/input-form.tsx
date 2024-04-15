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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";
import { Pencil, Plus } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IPengeluaranLainnya } from "@/lib/interfaces";

const formSchema = z.object({
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  biaya: z
    .string({ required_error: "Biaya tidak boleh kosong" })
    .min(1, { message: "Biaya tidak boleh kosong" }),
  tanggal: z.string().min(1, { message: "Tanggal tidak boleh kosong" }),
  kategori: z.string().min(1, { message: "Kategori tidak boleh kosong" }),
});

export default function PengeluaranLainnyaForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IPengeluaranLainnya;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Pengeluaran Lainnya editable mode: ${isEditable}`);
  const router = useRouter();

  //   Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: isEditable ? data?.nama ?? "" : "",
      biaya: isEditable ? data?.biaya ?? "" : "",
      tanggal: isEditable ? data?.tanggal ?? "" : "",
      kategori: isEditable ? data?.kategori ?? "" : "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit!)}
        className="space-y-6 w-full"
      >
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nama Transaksi</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Transaksi..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="tanggal"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tanggal</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="Tanggal..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="biaya"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Jumlah</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Jumlah..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="kategori"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori Transaksi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Pemasukan</SelectItem>
                    <SelectItem value="2">Pengeluaran</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

         
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
      </form>
    </Form>
  );
}
