"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { getCurrentUser } from "@/lib/api/auth";
import Loading from "@/components/ui/loading";
import { updatePelangganById } from "@/lib/api/pelanggan";
import { useSWRConfig } from "swr";

const formSchema = z.object({
  nama: z.string().min(2).max(50),
  tgl_lahir: z.date(),
  email: z.string().email(),
});
export default function BiodataCard({
  data,
}: {
  data: {
    id_pelanggan: string;
    nama: string;
    tgl_lahir: string;
    akun: { id_akun: string; email: string };
  };
}) {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: data?.nama ?? "",
      tgl_lahir: new Date(data?.tgl_lahir) ?? new Date(),
      email: data?.akun.email ?? "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const date = new Date(values.tgl_lahir);

      // TODO: Update tanggal lahir

      const response = await updatePelangganById(parseInt(data.id_pelanggan), {
        ...values,
        tgl_lahir: `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}`,
        id_pelanggan: data.id_pelanggan,
        id_akun: data.akun.id_akun,
      });

      if (response?.status === 200 || response?.status === 201) {
        mutate("/u/profile");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  return data ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="space-y-2">
          <p className="text-h4">Biodata Diri</p>
          <div className="space-y-4 sm:space-y-2">
            <div className="flex items-center gap-4">
              <FormLabel className="hidden w-full text-slate-500 sm:block sm:w-1/3">
                Nama
              </FormLabel>
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block text-slate-500 sm:hidden">
                      Nama
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <FormLabel className="hidden w-full text-slate-500 sm:block sm:w-1/3">
                Tanggal Lahir
              </FormLabel>
              <FormField
                control={form.control}
                name="tgl_lahir"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block text-slate-500 sm:hidden">
                      Tanggal Lahir
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal ",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pilih tanggal lahir...</span>
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
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-h4">Informasi Kontak</p>
          <div className="flex items-center gap-4">
            <FormLabel className="hidden w-full text-slate-500 sm:block sm:w-1/3">
              Email
            </FormLabel>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="block text-slate-500 sm:hidden">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Email..." {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant={"outline"} type="submit">
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loading /> : "Perbarui data saya"}
          </Button>
        </div>
      </form>
    </Form>
  ) : (
    <Loading />
  );
}
