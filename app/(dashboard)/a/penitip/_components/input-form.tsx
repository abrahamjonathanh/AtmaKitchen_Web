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
import React, { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IPenitip } from "@/lib/interfaces";
import UpdateDialog from "@/components/updateDialog";

const formSchema = z.object({
  id_penitip: z.string().optional(),
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
      id_penitip: isEditable ? data?.id_penitip ?? "" : "",
      nama: isEditable ? data?.nama ?? "" : "",
      alamat: isEditable ? data?.alamat ?? "" : "",
      telepon: isEditable ? data?.telepon ?? "" : "",
      created_at: isEditable ? data?.created_at ?? "" : "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);

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
        <div className="flex items-center justify-end gap-4">
          <Button variant={"outline"} onClick={() => router.back()}>
            Batal
          </Button>
          <Button
            type="button"
            className="flex gap-2"
            disabled={isLoading}
            onClick={() => setIsOpen(true)}
          >
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
  );
}
