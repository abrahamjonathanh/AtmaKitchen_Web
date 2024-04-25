"use client";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import LoginImage from "../../../public/images/Login.png";
import Loading from "@/components/ui/loading";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { login } from "@/lib/api/auth";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong!" })
    .email({ message: "Email tidak valid" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong!" }),
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

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await login(values);

      if (response?.status === 200 || response?.status === 201) {
        router.push("/karyawan"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error creating akun: ", error);
    } finally {
      setIsLoading(false);
    }
    // console.log(values);
  }

  return (
    <MaxWidthWrapper className="my-4">
      <div className="flex justify-between items-center">
        <div className="w-5/12">
          <p className="text-3xl font-semibold">Selamat Datang</p>
          <p className="text-5xl font-extrabold bg-gradient-to-br from-red-600 to-orange-400 text-transparent bg-clip-text mb-8">
            Atma Kitchen
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <p className="mt-4 w-full text-right text-sm text-slate-600">
                <Link href={"/forgot-password"}>Lupa password?</Link>
              </p>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loading /> : <>Masuk</>}
              </Button>
              <p className="text-sm text-black">
                Belum punya akun?{" "}
                <span className="underline">
                  <Link href={"/register"}>Daftar sekarang.</Link>
                </span>
              </p>
            </form>
          </Form>
        </div>
        <div className="w-1/2">
          <Image
            src={LoginImage}
            alt="Login"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
