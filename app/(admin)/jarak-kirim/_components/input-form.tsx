"use client";
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
import Loading from "@/components/ui/loading";
import { IJarakKirim } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toRupiah } from "@/lib/utils";
const formSchema = z.object({
  jarak: z.string().min(1, { message: "Jarak Kirim tidak boleh kosong" }),
});
export default function JarakKirimForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IJarakKirim;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Jarak Kirim editable mode: ${isEditable}`);
  const router = useRouter();

  //   Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jarak: isEditable ? data?.jarak ?? "" : "",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="border border-slate-200 rounded-lg p-4 lg:w-2/3">
          <p className="text-slate-500">{data?.alamat.nama}</p>
          <p className="text-large">{data?.nama}</p>
          <p>{data?.alamat.telepon}</p>
          <p className="overflow-ellipsis line-clamp-2">
            {data?.alamat.alamat}
          </p>
        </div>
        <div className="lg:w-1/3 border borderslate-200 rounded-lg p-4">
          <p className="text-slate-500">Ongkos Kirim</p>
          <p className="text-large">{toRupiah(15000)}</p>
          <p>11 km</p>
          <p>Radius 10-15 km</p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit!)}
          className="space-y-6 w-full p-4 border border-slate-200 rounded-lg"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="jarak"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Jarak Kirim</FormLabel>
                  <FormControl>
                    <Input placeholder="Jarak Kirim..." {...field} />
                  </FormControl>
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
    </div>
  );
}
