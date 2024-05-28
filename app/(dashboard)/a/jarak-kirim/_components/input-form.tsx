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
import { IPengiriman } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toRupiah } from "@/lib/utils";
import ConfirmDialog from "@/components/confirmDialog";
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
  data?: IPengiriman;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Jarak Kirim editable mode: ${isEditable}`);
  const router = useRouter();
  console.log(data);
  //   Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jarak: isEditable ? data?.jarak?.toString() ?? "" : "",
    },
  });

  const radiusByDistance = (distance: number): String => {
    if (distance <= 5) {
      return "0-5";
    } else if (distance <= 10) {
      return "5-10";
    } else if (distance <= 15) {
      return "10-15";
    } else if (distance > 15) {
      return ">15";
    }
    return "0";
  };

  const radiusToPrice = (distance: number): number => {
    if (distance <= 5) {
      return 10000;
    } else if (distance <= 10) {
      return 15000;
    } else if (distance <= 15) {
      return 20000;
    } else if (distance > 15) {
      return 25000;
    }
    return 0;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="rounded-lg border border-slate-200 p-4 lg:w-2/3">
          <p className="text-slate-500">{data?.nama}</p>
          <p className="text-large">{data?.nama}</p>
          <p>{data?.telepon}</p>
          <p className="line-clamp-2 overflow-ellipsis">{data?.alamat}</p>
        </div>
        <div className="borderslate-200 rounded-lg border p-4 lg:w-1/3">
          <p className="text-slate-500">Ongkos Kirim</p>
          <p className="text-large">
            {toRupiah(radiusToPrice(parseInt(form.watch("jarak"))))}
          </p>
          <p>{form.watch("jarak") == "" ? "0" : form.watch("jarak")} km</p>
          <p>Radius {radiusByDistance(parseInt(form.watch("jarak")))} km</p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit!)}
          className="w-full space-y-6 rounded-lg border border-slate-200 p-4"
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
          <div className="flex items-center justify-end gap-4">
            <Button variant={"outline"} onClick={() => router.back()}>
              Batal
            </Button>
            <ConfirmDialog submitTitle="Tambah" title="Tambah Jarak Kirim">
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
            </ConfirmDialog>
          </div>
        </form>
      </Form>
    </div>
  );
}
