"use client";
import React from "react";
import LoginImage from "../../../../public/images/Login.png";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z.object({
  passwordBaru: z
    .string()
    .min(1, { message: "Password baru tidak boleh kosong!" }),
  konfirmasiPasswordBaru: z
    .string()
    .min(1, { message: "Konfirmasi password baru tidak boleh kosong!" }),
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

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwordBaru: "",
      konfirmasiPasswordBaru: "",
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
      <div className="flex justify-between items-center">
        <div className="w-5/12">
          <Button className="mb-4 flex gap-2.5" variant={"outline"}>
            <MoveLeft />
            Kembali
          </Button>
          <p className="text-3xl font-semibold mb-4">Password Baru</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1 mb-1">
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
              <Button type="submit" className="w-full">
                Ubah Password
              </Button>
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
