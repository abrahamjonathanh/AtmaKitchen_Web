"use client";
import React, { useState } from "react";
import LoginImage from "../../../../public/images/Login.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z
  .object({
    passwordBaru: z
      .string()
      .min(6, { message: "Password minimal 6 karakter!" }),
    konfirmasiPasswordBaru: z
      .string()
      .min(6, { message: "Konfirmasi password minimal 6 karakter!" }),
  })
  .refine((data) => data.passwordBaru === data.konfirmasiPasswordBaru, {
    message: "Passwords tidak sama!",
    path: ["konfirmasiPasswordBaru"],
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
import Image from "next/image";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { MoveLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/api/auth";
import Loading from "@/components/ui/loading";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwordBaru: "",
      konfirmasiPasswordBaru: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await resetPassword({
        email: searchParams.get("e") || "",
        otp: searchParams.get("otp") || "",
        password: values.passwordBaru,
      });

      if (response?.status === 200 || response?.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MaxWidthWrapper className="lg:pr-0">
      <div className="flex items-center justify-between gap-8">
        <div className="w-full lg:w-1/3">
          <Button
            className="mb-4 flex gap-2.5"
            variant={"outline"}
            onClick={router.back}
          >
            <MoveLeft />
            Kembali
          </Button>
          <p className="mb-4 text-3xl font-semibold">Password Baru</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="passwordBaru"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Baru</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password Baru"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="konfirmasiPasswordBaru"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password Baru</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Konfirmasi Password Baru"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loading /> : "Ubah Password"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="hidden h-screen lg:block lg:w-2/3">
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
