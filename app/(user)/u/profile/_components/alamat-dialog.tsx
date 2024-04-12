"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  label: z.string().min(2).max(50),
  nama: z.string().min(2).max(50),
  alamat: z.string().min(2).max(50),
  telepon: z.string().min(2).max(50),
});
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
export default function AlamatDialog({
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  isEditable?: boolean;
  data?: any;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: isEditable ? data?.label ?? "" : "",
      nama: isEditable ? data?.nama ?? "" : "",
      alamat: isEditable ? data?.alamat ?? "" : "",
      telepon: isEditable ? data?.telepon ?? "" : "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={isEditable ? "outline" : "default"} size={"sm"}>
          {isEditable ? "Ubah " : "Tambah"} Alamat
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-xl max-h-screen">
        <DialogHeader>
          <DialogTitle> {isEditable ? "Ubah " : "Tambah"} Alamat</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <p className="text-sm">
            {isEditable ? "Ubah " : "Tambah"} Alamat kamu disini. Tekan Simpan
            ketika selesai.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col text-black"
            >
              <div className="flex items-center gap-4">
                <FormLabel className="w-full sm:w-1/3 hidden sm:block text-black">
                  Label Alamat
                </FormLabel>
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="block sm:hidden text-black">
                        Label Alamat
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Label Alamat..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <FormLabel className="w-full sm:w-1/3 hidden sm:block text-black">
                  Nama Penerima
                </FormLabel>
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="block sm:hidden text-black">
                        Nama Penerima
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Penerima..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <FormLabel className="w-full sm:w-1/3 hidden sm:block text-black">
                  Alamat Penerima
                </FormLabel>
                <FormField
                  control={form.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="block sm:hidden text-black">
                        Alamat Penerima
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Alamat Penerima..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <FormLabel className="w-full sm:w-1/3 hidden sm:block text-black">
                  No Telepon
                </FormLabel>
                <FormField
                  control={form.control}
                  name="telepon"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="block sm:hidden text-black">
                        No Telepon
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="No Telepon..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="self-end flex gap-2"
                disabled={isLoading}
              >
                {isLoading ? <Loading /> : "Simpan"}
              </Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
