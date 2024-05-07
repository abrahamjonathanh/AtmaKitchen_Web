"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoginImage from "../../../public/images/Login.png";
import Loading from "@/components/ui/loading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    nama: z.string().min(1, { message: "Nama lengkap tidak boleh kosong!" }),
    email: z
      .string()
      .min(1, { message: "Email tidak boleh kosong!" })
      .email({ message: "Email tidak valid" }),
    password: z
      .string()
      .min(6, { message: "Password harus berisi minimal 6!" }),
    konfirmasiPassword: z
      .string()
      .min(6, { message: "Konfirmasi Password harus berisi minimal 6!" }),
    telepon: z
      .string()
      .min(6, { message: "Nomor telepon tidak boleh kosong!" })
      .refine((value) => /^[0-9]+$/.test(value), {
        message: "Nomor telepon harus terdiri dari angka saja",
      }),
    nama_alamat: z
      .string()
      .min(1, { message: "Nama alamat tidak boleh kosong!" }),
    alamat: z.string().min(1, { message: "Alamat tidak boleh kosong!" }),
    tgl_lahir: z.date({ required_error: "Alamat tidak boleh kosong" }),
  })
  .refine((data) => data.password === data.konfirmasiPassword, {
    message: "Passwords tidak sama!",
    path: ["konfirmasiPassword"],
  });

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
import Link from "next/link";
import Image from "next/image";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

import { register } from "@/lib/api/auth";
import { useTitle } from "@/lib/hooks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function RegisterPage() {
  useTitle("AtmaKitchen | Daftar");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const date = new Date(values.tgl_lahir);

      setIsLoading(true);
      const response = await register({
        ...values,
        id_role: 1,
        tgl_lahir: `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}`,
      });

      if (response?.status === 200 || response?.status === 201) {
        router.push(`/register/verify-otp?e=${values.email}`);
      }
    } catch (error: any) {
      console.error("Error creating akun: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      email: "",
      password: "",
      konfirmasiPassword: "",
      telepon: "",
      nama_alamat: "",
      alamat: "",
    },
  });

  return (
    <MaxWidthWrapper className="lg:pr-0">
      <div className="flex h-full items-center justify-between gap-8">
        <div className="w-full lg:w-1/3">
          <p className="text-h2 font-semibold">Selamat Datang</p>
          <p className="text-h1 mb-8 bg-gradient-to-br from-red-600 to-orange-400 bg-clip-text font-extrabold text-transparent">
            Atma Kitchen
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nama Lengkap"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
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
              <FormField
                control={form.control}
                name="konfirmasiPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Konfirmasi Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telepon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nomor Telepon"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tgl_lahir"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tanggal Lahir</FormLabel>
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
                              <span>Pilih tanggal lahir</span>
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
              <FormField
                control={form.control}
                name="nama_alamat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Alamat</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Nama Alamat" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Input type="text" placeholder="Alamat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loading /> : <>Daftar Sekarang</>}
              </Button>
              <p className="text-sm text-black">
                Sudah punya akun?{" "}
                <span className="underline">
                  <Link href={"/login"}>Masuk sekarang.</Link>
                </span>
              </p>
            </form>
          </Form>
        </div>
        <div className="hidden h-full lg:block lg:w-2/3">
          <Image
            src={LoginImage}
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
