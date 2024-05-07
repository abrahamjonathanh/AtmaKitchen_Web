"use client";
import React, { Suspense, useState } from "react";
import LoginImage from "../../../../public/images/Login.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { MoveLeft } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useTitle } from "@/lib/hooks";
import { sendOTP, verifyOTP } from "@/lib/api/auth";
import Loading from "@/components/ui/loading";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong" })
    .email({ message: "Email tidak valid" }),
  otp: z.string().min(4, { message: "OTP tidak boleh kosong" }),
});

const SentEmail = () => {
  const params = useSearchParams();

  return params.get("e") ?? "";
};

export default function page() {
  useTitle("AtmaKitchen | Verifikasi Email");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const searchParams = useSearchParams(); // Destructure email from search params

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get("e") || "",
      otp: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      setIsLoadingVerify(true);
      const response = await verifyOTP(values);

      if (response?.status === 200 || response?.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error sending OTP: ", error);
    } finally {
      setIsLoadingVerify(false);
    }
  }

  const resendOTP = async () => {
    try {
      setIsLoading(true);
      console.log(form.watch("email"));
      await sendOTP({ email: form.watch("email") });
    } catch (error) {
      console.error("Error sending OTP: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MaxWidthWrapper className="lg:pr-0">
      <div className="flex items-center justify-between gap-8">
        <div className="w-full lg:w-1/3">
          <Button
            className="mb-4 flex gap-2.5"
            variant={"outline"}
            onClick={() => router.push("/forgot-password")}
          >
            <MoveLeft size={"16"} />
            Kembali
          </Button>
          <p className="mb-2 text-3xl font-semibold">Kode OTP</p>
          <Suspense>
            <p className="mb-4 w-full text-base text-slate-500">
              Masukkan 4-digit kode verifikasi yang kami kirimkan ke{" "}
              <span className="font-medium">
                <SentEmail />
              </span>
            </p>
          </Suspense>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={4} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormLabel>OTP (One Time Password)</FormLabel> */}
                <Button
                  variant={"link"}
                  size={"sm"}
                  className="flex w-max self-end text-slate-500"
                  disabled={isLoading}
                  onClick={resendOTP}
                >
                  {!isLoading ? (
                    "Kirim ulang kode OTP"
                  ) : (
                    <Loading title="Mengirim ulang..." />
                  )}
                </Button>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoadingVerify}
              >
                {!isLoadingVerify ? "Verifikasi" : <Loading />}
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
