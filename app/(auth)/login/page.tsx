"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoginImage from "../../../public/images/Login.png";
import Loading from "@/components/ui/loading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getCurrentUser, login } from "@/lib/api/auth";
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
import { useTitle } from "@/lib/hooks";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong!" })
    .email({ message: "Email tidak valid" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong!" }),
});

export default function LoginPage() {
  useTitle("AtmaKitchen | Masuk");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await login(values);

      if (response?.status === 200 || response?.status === 201) {
        router.push("/a/karyawan");
      }
    } catch (error: any) {
      console.error("Error sign in akun: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MaxWidthWrapper className="lg:pr-0">
      <div className="flex h-screen items-center justify-between gap-8">
        <div className="w-full lg:w-1/3">
          {/* Title */}
          <p className="text-h2 font-semibold">Selamat Datang</p>
          <p className="text-h1 mb-8 bg-gradient-to-br from-red-600 to-orange-400 bg-clip-text font-extrabold text-transparent">
            Atma Kitchen
          </p>
          {/* Form */}
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
              <p className="text-body text-center text-black">
                Belum punya akun?{" "}
                <span className="underline">
                  <Link href={"/register"}>Daftar sekarang.</Link>
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
            priority
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
