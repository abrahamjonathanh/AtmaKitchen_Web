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

import React from "react";
import { Pencil, Plus } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IBahanBaku } from "@/lib/interfaces";

const formSchema = z.object({
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  stok: z.string().min(1, { message: "Stok tidak boleh kosong" }),
  stok_minimum: z
    .string()
    .min(1, { message: "Stok minimum tidak boleh kosong" }),
  satuan: z.string().min(1, { message: "Satuan tidak boleh kosong" }),
});

export default function BahanBakuForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IBahanBaku;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Bahan Baku editable mode: ${isEditable}`);
  console.log(data);
  const router = useRouter();

  //   Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: isEditable ? data?.nama ?? "" : "",
      stok: isEditable ? data?.stok ?? "" : "",
      stok_minimum: isEditable ? data?.stok_minimum ?? "" : "",
      satuan: isEditable ? data?.satuan ?? "" : "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit!)}
        className="space-y-6 w-full"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nama Bahan Baku</FormLabel>
                <FormControl>
                  <Input placeholder=" Nama Bahan Baku..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="stok"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Stok</FormLabel>
                  <FormControl>
                    <Input placeholder=" Stok..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stok_minimum"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Stok Minimum</FormLabel>
                  <FormControl>
                    <Input placeholder=" Stok_minimum..." {...field} />
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
                      <SelectItem value="gr">gram</SelectItem>
                      <SelectItem value="butir">butir</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="buah">buah</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
