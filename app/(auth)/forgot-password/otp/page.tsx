"use client";
import React from "react";
import LoginImage from "../../../../public/images/Login.png";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z.object({});

import { Button } from "@/components/ui/button";
import {
  Form,
  // FormControl,
  // FormField,
  // FormItem,
  FormLabel,
  // FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
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
          <p className="text-3xl font-semibold mb-2">Lupa Password</p>
          <p className="w-full text-sm text-slate-500 mb-4">
            Masukkan 4-digit kode verifikasi yang kami kirimkan ke ALAMAT
            EMAILNYA
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <FormLabel>OTP (One Time Password)</FormLabel>
                <InputOTP maxLength={4}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
                <p className="mt-4 w-full text-right text-sm text-slate-600">
                  <Link href={""}>Kirim ulang kode OTP</Link>
                </p>
              </div>
              <Button type="submit" className="w-full">
                Kirim OTP
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
