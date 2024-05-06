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
import { CalendarIcon, Pencil, Plus } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IPengeluaranLainnya } from "@/lib/interfaces";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  biaya: z
    .string({ required_error: "Biaya tidak boleh kosong" })
    .min(1, { message: "Biaya tidak boleh kosong" }),
  tanggal: z.date({ required_error: "Tanggal tidak boleh kosong" }),
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
      biaya: isEditable ? data?.biaya.toString() ?? "" : "",
      kategori: isEditable ? data?.kategori ?? "" : "",
      tanggal: isEditable ? new Date(data?.tanggal!) ?? new Date() : new Date(),
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit!)}
        className="w-full space-y-6"
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nama Transaksi</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Transaksi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Tanggal Transaksi</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Tanggal Transaksi</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        // disabled={(date) =>
                        //   date < new Date(Date.now() - 24 * 60 * 60 * 1000)
                        // }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="biaya"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Jumlah</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Jumlah" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kategori"
              render={({ field }) => (
                <FormItem className="w-full">
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
                      <SelectItem value="Pemasukan">Pemasukan</SelectItem>
                      <SelectItem value="Pengeluaran">Pengeluaran</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
      </form>
    </Form>
  );
}
