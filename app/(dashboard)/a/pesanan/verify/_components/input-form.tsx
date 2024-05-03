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

import React from "react";
import { Pencil, Plus, ShieldCheck } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IPesanan } from "@/lib/interfaces";
import { Badge } from "@/components/ui/badge";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";

const formSchema = z.object({
  id_pesanan: z.string().optional(),
  total_dibayarkan: z.string().min(1, { message: "Total tidak boleh kosong" }),
});

export default function VerifikasiForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IPesanan;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Verifikasi Pembayaran editable mode: ${isEditable}`);
  const router = useRouter();

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_pesanan: isEditable ? data?.id_pesanan ?? "" : "",
      total_dibayarkan: isEditable
        ? data?.total_dibayarkan.toString() ?? ""
        : "",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="p-4 border border-slate-200 rounded-lg space-y-1 w-full md:w-3/5">
          <div className="text-slate-500">
            Informasi Pesanan{" "}
            <span>
              <Badge variant={"outline"}>{data?.id_pesanan}</Badge>
            </span>
          </div>
          <p className="text-large">{data?.pelanggan?.nama}</p>
          <p>{data?.pelanggan?.telepon}</p>
        </div>
        <div className="p-4 border border-slate-200 rounded-lg space-y-1 w-full md:w-2/5">
          <div className="text-slate-500">
            Total Tagihan{" "}
            <span>
              <Badge variant={"outline"}>
                {toIndonesiaDate(data?.created_at!)}
              </Badge>
            </span>
          </div>
          <p className="text-large">{toRupiah(data?.total_setelah_diskon!)}</p>
          <p>{(data?.id_metode_pembayaran as { nama: string }).nama}</p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit!)}
          className="space-y-6 w-full"
        >
          <div className="p-4 border rounded-lg border-slate-200">
            <FormField
              control={form.control}
              name="total_dibayarkan"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Total Dibayarkan</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Total Dibayarkan..."
                      {...field}
                    />
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
                  Verifikasi <ShieldCheck size={"16"} />
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
