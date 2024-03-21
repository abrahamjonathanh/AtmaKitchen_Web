import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import HeroImage from "../public/images/Hero.png";
import Image from "next/image";

import Link from "next/link";

import ProductCarousel from "./_components/productCarousel";
import Navbar from "@/components/navbar";

export default function Home() {
  const statistics = [
    { title: "Testimoni", count: 203 },
    { title: "Produk", count: 33 },
    { title: "Partner", count: 10 },
  ];

  return (
    <>
      <Navbar />

      <MaxWidthWrapper className="space-y-16">
        <div className="w-full flex md:flex-row flex-col-reverse gap-4 items-center relative mt-16 md:mt-48">
          <div className="space-y-8 w-full md:w-1/2 text-center md:text-left ">
            <p className="cursor-default rounded-full bg-white shadow-lg border border-slate-200 px-4 py-2 w-max text-sm mx-auto md:mx-0 flex items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              <span>
                <span className="font-bold">AtmaKitchen</span> sekarang tersedia di Android dan iOS!
              </span>
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-5xl font-extrabold">Judulnya Apa ya</p>
                <p className="text-5xl font-extrabold">Judulnya Apa ya</p>
              </div>
              <p className="text-base text-slate-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu dolor vel lorem fringilla auctor nec
                id dolor.
              </p>
            </div>
            <Button className="flex items-center gap-2 mx-auto md:mx-0">
              Pesan Sekarang <MoveRight width={16} />
            </Button>
            <div className="flex items-center gap-8 justify-center md:justify-start">
              {statistics.map((data, index) => (
                <div className="text-center space-y-2" key={index}>
                  <p className="text-3xl font-semibold">{data.count}</p>
                  <p className="text-slate-500">{data.title}</p>
                </div>
              ))}
            </div>
          </div>
          <Image
            src={HeroImage}
            alt="Hero Bread Illustration"
            className="md:absolute md:-right-32 max-w-md md:max-w-sm xl:max-w-2xl"
          />
        </div>
        {/* Products */}
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-5xl font-extrabold">Produk Fresh Kami</p>
            <p className="text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non rhoncus tellus.
            </p>
          </div>
          <div className="flex flex-col gap-8 justify-center items-center">
            <ProductCarousel />
            <Button>
              <Link href={""}>Lihat Semua</Link>
            </Button>
          </div>
        </div>
        {/* Proses */}
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-5xl font-extrabold">Bagaimana Prosesnya?</p>
            <p className="text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non rhoncus tellus.
            </p>
          </div>{" "}
        </div>
        {/* CTA */}
        <div className="text-white rounded-3xl bg-orange-600 p-16 text-center">
          <div className="space-y-4">
            <p className="text-5xl font-extrabold ">Berlangganan Sekarang!</p>
            <p>Dapatkan informasi produk terbaru dan diskon spesial!</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
