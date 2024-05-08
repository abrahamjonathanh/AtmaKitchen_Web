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
import React, { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import Loading from "@/components/ui/loading";
import { IBahanBaku, IPemesananBahanBaku } from "@/lib/interfaces";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getAllBahanBaku } from "@/lib/api/bahan-baku";
import UpdateDialog from "@/components/updateDialog";

const formSchema = z.object({
  id_bahan_baku: z.string().optional(),
  nama: z
    .string()
    // .min(1, { message: "Nama produk tidak boleh kosong" })
    .optional(),
  satuan: z.enum(["gr", "ml", "butir", "buah", ""]),
  jumlah: z.string().min(1, { message: "Harga tidak boleh kosong" }),
  harga_beli: z.string().min(1, { message: "Harga tidak boleh kosong" }),
});

export default function PemesananBahanBakuForm({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: IPemesananBahanBaku;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  const bahanbaku = getAllBahanBaku();

  const [isNew, setIsNew] = useState(false);
  const [previouslySelectedIdBahanBaku, setPreviouslySelectedIdBahanBaku] =
    useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_bahan_baku: isEditable ? data?.id_bahan_baku!.toString() ?? "" : "",
      nama: isEditable ? data?.nama ?? "" : "",
      satuan: isEditable ? data?.satuan ?? "" : "",
      jumlah: isEditable ? data?.jumlah!.toString() ?? "" : "",
      harga_beli: isEditable ? data?.harga_beli!.toString() ?? "" : "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const idBahanBaku = form.watch("id_bahan_baku");
    if (idBahanBaku && !isNew) {
      const selectedBahanBaku = bahanbaku.data?.find(
        (bahan: IBahanBaku) => bahan.id_bahan_baku?.toString() === idBahanBaku,
      );
      if (selectedBahanBaku) {
        form.setValue("nama", selectedBahanBaku.nama);
      }
    } else if (!isNew) {
      // Mengisi ulang id_bahan_baku saat isNew false
      form.setValue("id_bahan_baku", previouslySelectedIdBahanBaku);
    } else if (isNew) {
      form.setValue("id_bahan_baku", "");
    }
  }, [form, isNew, bahanbaku.data, previouslySelectedIdBahanBaku]);

  console.log(form.watch("id_bahan_baku"));
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4  md:flex-row"
          encType="multipart/form-data"
        >
          <div className="h-max w-full space-y-6 rounded-lg border border-slate-200 p-4 ">
            <div className="space-y-4">
              <div className="flex flex-col items-end gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="id_bahan_baku"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Bahan Baku</FormLabel>
                      {bahanbaku.data && !bahanbaku.isLoading && (
                        <Select
                          // onValueChange={field.onChange}
                          onValueChange={(value) => {
                            setPreviouslySelectedIdBahanBaku(value);
                            field.onChange();
                          }}
                          defaultValue={field.value}
                          disabled={isNew}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Bahan Baku" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bahanbaku.data.map(
                              (bahan: IBahanBaku, index: number) => (
                                <SelectItem
                                  value={bahan.id_bahan_baku!.toString()}
                                  key={index}
                                >
                                  {bahan.nama}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {!isEditable && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={isNew}
                      onCheckedChange={() => {
                        setIsNew(!isNew);
                      }}
                      id="isNewMode"
                    />
                    <Label htmlFor="isNewMode">Bahan Baku Baru</Label>
                  </div>
                  {isNew ? (
                    <FormField
                      control={form.control}
                      name="nama"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Nama Bahan Baku</FormLabel>
                          <FormControl>
                            <Input placeholder="Nama Bahan Baku" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : null}
                </div>
              )}
              <div className="flex flex-col items-end gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="jumlah"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Banyak</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Banyak" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="harga_beli"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Harga Satuan</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Harga Satuan"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="satuan"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Satuan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Satuan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gr">Gram</SelectItem>
                          <SelectItem value="ml">Ml</SelectItem>
                          <SelectItem value="butir">Butir</SelectItem>
                          <SelectItem value="buah">Buah</SelectItem>
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
          </div>
        </form>
      </Form>
    </div>
  );
}
