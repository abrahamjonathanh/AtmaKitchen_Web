import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Plus, ShieldCheck } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IPesanan, IPesananv2 } from "@/lib/interfaces";
import { Badge } from "@/components/ui/badge";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import UpdateDialog from "@/components/updateDialog";
import Link from "next/link";

export default function VerifikasiForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IPesanan;
  onSubmit?: (values: any) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Verifikasi Pembayaran editable mode: ${isEditable}`);
  const router = useRouter();
  const formSchema = z.object({
    id_pesanan: z.string().optional(),
    total_dibayarkan: z
      .string()
      .transform((str) => Number(str)) // Convert to number before validation
      .refine((num) => num >= (data?.total_setelah_diskon ?? 1), {
        message: `Total dibayarkan harus lebih besar atau sama dengan tagihan (${toRupiah(data?.total_setelah_diskon!)})`,
      }),
  });
  const [isOpen, setIsOpen] = useState(false);
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_pesanan: isEditable ? data?.id_pesanan ?? "" : "",
      total_dibayarkan: isEditable
        ? parseInt(data?.total_dibayarkan?.toString() ?? "0")
        : 0,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full space-y-1 rounded-lg border border-slate-200 p-4 md:w-3/5">
          <div className="text-slate-500">
            Informasi Pesanan{" "}
            <span>
              <Badge variant={"outline"}>{data?.id_pesanan}</Badge>
            </span>
          </div>
          <p className="text-large">
            {data?.pelanggan?.nama}{" "}
            <Link
              href={data?.bukti_pembayaran!}
              target="_blank"
              className={buttonVariants({ variant: "link" })}
            >
              Lihat Bukti
            </Link>
          </p>
          <p>{data?.pelanggan?.telepon}</p>
        </div>
        <div className="w-full space-y-1 rounded-lg border border-slate-200 p-4 md:w-2/5">
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
          className="w-full space-y-6"
        >
          <div className="rounded-lg border border-slate-200 p-4">
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
          <div className="flex items-center justify-end gap-4">
            <Button variant={"outline"} onClick={() => router.back()}>
              Batal
            </Button>
            <Button
              type="submit"
              className="flex gap-2"
              disabled={isLoading}
              onClick={() => setIsOpen(true)}
            >
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
  );
}
