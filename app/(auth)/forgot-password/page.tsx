"use client";
import React, { useState } from "react";
import LoginImage from "../../../public/images/Login.png";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong!" })
    .email({ message: "Email tidak valid" }),
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
import { sendOTP } from "@/lib/api/auth";
import Loading from "@/components/ui/loading";
import { useTitle } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  useTitle("AtmaKitchen | Lupa Password");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      router.push(`/forgot-password/otp?e=${values.email}`);
      await sendOTP(values);
    } catch (error) {
      console.error("Error sending OTP: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MaxWidthWrapper className="lg:pr-0">
      <div className="flex items-center justify-between gap-8">
        <div className="w-full lg:w-1/3">
          <Button className="mb-4 flex gap-2.5" variant={"outline"}>
            <MoveLeft size={"16"} />
            Kembali
          </Button>
          <p className="mb-4 text-3xl font-semibold">Lupa Password</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
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
                <p className="w-full text-sm text-slate-500">
                  Kami akan mengirimkan One Time Password (OTP) ke email yang
                  anda daftarkan
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loading /> : "Kirim OTP"}
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
