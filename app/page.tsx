import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import HeroImage from "../public/images/Hero.png";
import Image from "next/image";

import Link from "next/link";

import ProductCarousel from "./_components/productCarousel";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

import StephanieAvatar from "../public/avatars/Stephanie.png";
import AndrewAvatar from "../public/avatars/Andrew.png";
import AyuAvatar from "../public/avatars/Ayu.png";
import JessicaAvatar from "../public/avatars/Jessica.png";
import AlbertAvatar from "../public/avatars/Albert.png";
import GantaAvatar from "../public/avatars/Ganta.png";

export default function Home() {
  const statistics = [
    { title: "Testimoni", count: 203 },
    { title: "Produk", count: 33 },
    { title: "Partner", count: 10 },
  ];

  const testimonialData = [
    [
      {
        avatar: StephanieAvatar,
        fullname: "Stephanie",
        username: "@stephanie78",
        comment:
          "AtmaKitchen gue beli kemarin lgsg jatuh cinta. Seenak itu woii 😍😍💕",
      },
      {
        avatar: JessicaAvatar,
        fullname: "Jessica",
        username: "@jessy",
        comment:
          "Barusan dapat oleh2 dr teman, gila enak banget browniesnya! Lgsung cari tau dia beli dimana, rupanya di AtmaKitchen 😃",
      },
    ],
    [
      {
        avatar: AndrewAvatar,
        fullname: "Andrew",
        username: "@aandr3w",
        comment:
          "Kmrn ke Jogja sempat beli kue di AtmaKitchen, ga nyangka seenak itu. Kalo ke jogja jgn lupa ges cobain. Semoga cepat buka di Bali dahh",
      },
      {
        avatar: GantaAvatar,
        fullname: "Ganta",
        username: "@giganta",
        comment: "Plis ngidam browniesnya AtmaKitchen 😭😭😭😭😭",
      },
    ],
    [
      {
        avatar: AyuAvatar,
        fullname: "Ayu",
        username: "@4yz982",
        comment:
          "Kangen banget beli Spikoe di AtmaKitchen. Bener2 bikin kecanduan 😭😭🤣",
      },
      {
        avatar: AlbertAvatar,
        fullname: "Albert",
        username: "@alb3rtstar",
        comment:
          "Gua kira biasa aja, tp emg bnrn enak sih ternyata Browniesnya AtmaKitchen. Next nyobain kue lapis nya kali ya...",
      },
    ],
  ];

  return (
    <>
      <Navbar />

      <MaxWidthWrapper className="space-y-12 sm:space-y-16 mb-8">
        {/* Hero */}
        <div className="w-full flex md:flex-row flex-col-reverse gap-4 items-center relative mt-16 md:mt-32 lg:mt-48">
          <div className="space-y-8 w-full md:w-1/2 text-center md:text-left ">
            <p className="max-w-xs sm:max-w-max cursor-default rounded-full bg-white shadow-lg border border-slate-200 px-4 py-2 w-max mx-auto md:mx-0 flex items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              <span className="text-sm">
                <span className="font-bold">AtmaKitchen</span> sekarang tersedia
                di Android dan iOS!
              </span>
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-title font-extrabold">Judulnya Apa ya</p>
                <p className="text-title font-extrabold">Judulnya Apa ya</p>
              </div>
              <p className="text-slate-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                eu dolor vel lorem fringilla auctor nec id dolor.
              </p>
            </div>
            <Button className="flex items-center gap-2 mx-auto md:mx-0">
              Pesan Sekarang <MoveRight width={16} />
            </Button>
            <div className="flex items-center gap-8 justify-center md:justify-start">
              {statistics.map((data, index) => (
                <div className="text-center space-y-2" key={index}>
                  <p className="text-large font-semibold">{data.count}</p>
                  <p className="text-slate-500">{data.title}</p>
                </div>
              ))}
            </div>
          </div>
          <Image
            src={HeroImage}
            alt="Hero Bread Illustration"
            className="md:absolute md:-right-32 max-w-sm md:max-w-lg 
            lg:max-w-xl
            xl:max-w-2xl -z-10"
          />
        </div>
        {/* Products */}
        <div className="space-y-8 lg:space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-title font-extrabold">Produk Fresh Kami</p>
            <p className="text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
              rhoncus tellus.
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
        <div className="space-y-8 lg:space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-title font-extrabold">Bagaimana Prosesnya?</p>
            <p className="text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
              rhoncus tellus.
            </p>
          </div>{" "}
        </div>
        {/* Testimonial */}
        <div className="space-y-8 lg:space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-title font-extrabold">Apa Kata Mereka?</p>
            <p className="text-slate-500">
              Pendapat pelanggan tentang menu dan pelayanan kami.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {testimonialData.map((data, index) => (
              <div className="flex flex-col gap-4 h-max basis-full" key={index}>
                {data.map((testimony, index) => (
                  <div
                    className="space-y-4 p-6 border rounded border-slate-200 basis-full h-max"
                    key={index}
                  >
                    <div className="flex gap-2">
                      <Image
                        src={testimony.avatar}
                        alt="Avatar"
                        className="w-12 h-12 border rounded"
                      />
                      <div className="space-y-0">
                        <p>{testimony.fullname}</p>
                        <p className="text-slate-500 w-full">
                          {testimony.username} on X
                        </p>
                      </div>
                    </div>
                    <p>
                      {testimony.comment.split(" ").map((word, index) =>
                        word.toLowerCase().includes("atmakitchen") ? (
                          <span
                            key={index}
                            className="text-orange-600 font-bold"
                          >
                            {word}{" "}
                          </span>
                        ) : (
                          <span key={index}>{word} </span>
                        )
                      )}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* CTA */}
        <div className="text-white rounded-3xl bg-gradient-to-br from-orange-600 to-orange-800 p-8 sm:p-16 text-center space-y-8 sm:space-y-8">
          <div className="space-y-4">
            <p className="text-title font-extrabold ">Tunggu apa lagi? </p>
            <p className="text-sm sm:text-base">
              Pesan dan kumpulkan poinmu sekarang!
            </p>
          </div>
          <div>
            <Link href={""}>
              <Button
                variant={"default"}
                size={"lg"}
                className="bg-slate-900 text-bg-slate-0 hover:bg-slate-800 "
              >
                Pesan Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>

      <Footer />
    </>
  );
}
