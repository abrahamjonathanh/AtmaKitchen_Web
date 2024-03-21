"use client";
import React from "react";
import LoginImage from "../../../public/images/Login.png";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z
  .object({
    namaLengkap: z.string().min(1, { message: "Nama lengkap tidak boleh kosong!" }),
    email: z.string().min(1, { message: "Email tidak boleh kosong!" }).email({ message: "Email tidak valid" }),
    password: z.string().min(6, { message: "Password harus berisi minimal 6!" }),
    konfirmasiPassword: z.string().min(1, { message: "Konfirmasi Password tidak boleh kosong!" }),
    alamat: z.string().min(1, { message: "Alamat tidak boleh kosong!" }),
  })
  .refine((data) => data.password === data.konfirmasiPassword, {
    message: "Passwords tidak sama!",
    path: ["konfirmasiPassword"],
  });

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaLengkap: "",
      email: "",
      password: "",
      konfirmasiPassword: "",
      alamat: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <MaxWidthWrapper className="my-4">
      <div className="flex justify-between">
        <div className="w-5/12">
          <p className="text-3xl font-semibold">Selamat Datang</p>
          <p className="text-5xl font-extrabold bg-gradient-to-br from-red-600 to-orange-400 text-transparent bg-clip-text mb-8">
            Atma Kitchen
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="namaLengkap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Nama Lengkap" {...field} />
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
                      <Input type="password" placeholder="Password" {...field} />
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
                      <Input type="password" placeholder="Konfirmasi Password" {...field} />
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
              <Button type="submit" className="w-full">
                Daftar Sekarang
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
        <div className="w-1/2">
          <Image src={LoginImage} alt="Login" className="w-full h-full object-cover rounded-3xl" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
