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

import React, { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IJabatan, IKaryawan } from "@/lib/interfaces";
import { getAllJabatan } from "@/lib/api/jabatan";
import UpdateDialog from "@/components/updateDialog";

const formSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  gaji_harian: z
    .string({ required_error: "Gaji Harian tidak boleh kosong" })
    .min(1, { message: "Gaji Harian tidak boleh kosong" }),
  bonus: z.string().optional(), // Docs: Optional() is used to handle nullable input
  telepon: z
    .string({ required_error: "Telepon tidak boleh kosong" })
    .min(6, { message: "Nomor telepon harus terdiri dari minimal 6 angka" })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Nomor telepon harus terdiri dari angka saja",
    }),
  id_role: z
    .string({ required_error: "Jabatan tidak boleh kosong" })
    .min(1, { message: "Jabatan tidak boleh kosong" }),
  alamat: z.string().min(1, { message: "Alamat tidak boleh kosong" }),
});

export default function KaryawanForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IKaryawan | null;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Karyawan editable mode: ${isEditable}`);
  const router = useRouter();

  //   Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: isEditable ? data?.akun?.email ?? "" : "",
      password: isEditable ? data?.akun?.password ?? "" : "",
      nama: isEditable ? data?.nama ?? "" : "",
      gaji_harian: isEditable ? data?.gaji_harian.toString() ?? "" : "",
      bonus: isEditable ? data?.bonus?.toString() ?? "" : "",
      telepon: isEditable ? data?.telepon ?? "" : "",
      alamat: isEditable ? data?.alamat ?? "" : "",
      id_role: isEditable ? data?.akun?.id_role?.toString() ?? "" : "",
    },
  });

  const jabatan = getAllJabatan();
  const [isOpen, setIsOpen] = useState(false);

  return jabatan.data ? (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit!)}
        className="w-full space-y-6"
      >
        <div className="space-y-4">
          {!isEditable && (
            <div className="flex flex-col gap-4 md:flex-row">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Lengkap" {...field} />
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
                    <Input placeholder="Nomor Telepon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="gaji_harian"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Upah Harian</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Upah Harian" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bonus"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bonus (Opsional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Bonus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="id_role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jabatan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jabatan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jabatan.data.map((jabatan: IJabatan, index: number) => (
                      <SelectItem
                        value={jabatan.id_role.toString()}
                        key={index}
                      >
                        {jabatan.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
  ) : (
    <Loading />
  );
}
