"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import notFoundAnimation from "../public/lottie/not-found.json";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

export default function page() {
  return (
    <MaxWidthWrapper>
      <div className="flex justify-center items-center gap-4 flex-col h-screen">
        <p className="text-orange-600 text-4xl lg:text-6xl font-semibold lg:font-extrabold flex flex-col gap-2 text-center">
          Oops! <span>Halaman tidak ditemukan :/</span>
        </p>
        <Player
          autoplay
          loop
          src={notFoundAnimation}
          style={{ height: "300px", width: "300px" }}
        ></Player>
        <Link href={"/"} className={buttonVariants({ variant: "default" })}>
          Kembali ke Halaman Utama
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
