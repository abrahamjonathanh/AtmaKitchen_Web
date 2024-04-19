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
import { Pencil, Plus } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IPenitip } from "@/lib/interfaces";

const formSchema = z.object({
  id: z.string().optional(),
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  alamat: z.string().min(1, { message: "Alamat tidak boleh kosong" }),
  telepon: z
    .string({ required_error: "Telepon tidak boleh kosong" })
    .min(6, { message: "Nomor telepon harus terdiri dari minimal 6 angka" }),
  created_at: z.string().optional(),
});

export default function PenitipForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IPenitip;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Penitip editable mode: ${isEditable}`);
  const router = useRouter();

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: isEditable ? data?.id_penitip ?? "" : "",
      nama: isEditable ? data?.nama ?? "" : "",
      alamat: isEditable ? data?.alamat ?? "" : "",
      telepon: isEditable ? data?.telepon ?? "" : "",
      created_at: isEditable ? data?.created_at ?? "" : "",
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
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Lengkap..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telepon"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input placeholder="Nomor Telepon..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="alamat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <Textarea
                  placeholder="Alamat lengkap"
                  id="message"
                  {...field}
                />
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
