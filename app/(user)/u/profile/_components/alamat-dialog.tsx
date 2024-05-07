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
import React, { Dispatch, SetStateAction } from "react";
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
  setIsOpen,
  isOpen = false,
}: {
  isEditable?: boolean;
  data?: any;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  isOpen?: boolean;
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={isEditable ? "outline" : "default"} size={"sm"}>
          {isEditable ? "Ubah " : "Tambah"} Alamat
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-sm sm:max-w-xl">
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
              className="flex flex-col space-y-4 text-black"
            >
              <div className="flex items-center gap-4">
                <FormLabel className="hidden w-full text-black sm:block sm:w-1/3">
                  Label Alamat
                </FormLabel>
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="block text-black sm:hidden">
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
                <FormLabel className="hidden w-full text-black sm:block sm:w-1/3">
                  Nama Penerima
                </FormLabel>
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="block text-black sm:hidden">
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
                <FormLabel className="hidden w-full text-black sm:block sm:w-1/3">
                  Alamat Penerima
                </FormLabel>
                <FormField
                  control={form.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="block text-black sm:hidden">
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
                <FormLabel className="hidden w-full text-black sm:block sm:w-1/3">
                  No Telepon
                </FormLabel>
                <FormField
                  control={form.control}
                  name="telepon"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="block text-black sm:hidden">
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
                className="flex gap-2 self-end"
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
