"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Pencil, Plus, Trash2 } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IResep } from "@/lib/interfaces";
import Image from "next/image";
import Brownies from "@/public/products/Brownies.png";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  id: z.string().optional(),
  // nama: z
  //   .string()
  //   .min(1, { message: "Nama produk tidak boleh kosong" })
  //   .optional(),
  bahan_baku: z.array(
    z.object({
      id: z.string().optional(),
      // nama: z
      //   .string()
      //   .min(1, { message: "Nama bahan baku tidak boleh kosong" })
      //   .optional(),
      jumlah: z.string().min(1, { message: "Jumlah tidak boleh kosong" }),
    })
  ),
});

export default function ResepForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IResep;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  console.log(`⚠️ Resep editable mode: ${isEditable}`);
  const router = useRouter();

  // 📄 DOCS: To make add button for fields.
  // 1️⃣ You must make the zod in object, then wrap it in array. Example:
  //  z.array(
  //    z.object({
  //      sample: z.string()
  //    })
  //  )
  // 2️⃣ Make defaultValues in useForm in array of objects. Example:
  // defaultValues: {
  //   sample: [{ sampe: ""}]
  // }
  // 3️⃣ Implement useFieldArray to make array in our field. Example:
  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "sample", // This must be the name of zod object name
  // });
  // 4️⃣ Copy the `Fields auto add` in this code.

  //   Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: isEditable ? data?.id ?? "" : "",
      // nama: isEditable ? data?.nama ?? "" : "",
      bahan_baku: isEditable
        ? data?.bahan_baku
        : [{ id: "", nama: "", jumlah: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "bahan_baku",
  });

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Image
        src={Brownies}
        alt="Brownies"
        className="w-full md:w-1/3 rounded-lg h-max"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full p-4 rounded-lg border border-slate-200 h-max"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nama Produk</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Produk" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Lapis Legit</SelectItem>
                      <SelectItem value="2">Manajer Operasional</SelectItem>
                      <SelectItem value="3">Manajer Operasional</SelectItem>
                      <SelectItem value="4">Lapis Legit</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <div className="space-y-4">
              {/* Fields auto add  */}
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-row md:flex-row gap-4 items-end"
                >
                  <FormField
                    control={form.control}
                    name={`bahan_baku.${index}.id`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Nama Bahan ke-{index + 1}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Bahan Baku" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Coklat batang</SelectItem>
                            <SelectItem value="2">Butter</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`bahan_baku.${index}.jumlah`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Jumlah Bahan ke-{index + 1}</FormLabel>
                        <FormControl>
                          <Input placeholder="Jumlah..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="outline"
                  >
                    <Trash2 size={"16"} />
                  </Button>
                </div>
              ))}
              <Button
                variant={"outline"}
                type="button"
                onClick={() => append({ id: "", jumlah: "" })}
                className="flex gap-2 w-full"
              >
                <Plus size={"16"} /> Tambah Bahan Baku
              </Button>
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
    </div>
  );
}
