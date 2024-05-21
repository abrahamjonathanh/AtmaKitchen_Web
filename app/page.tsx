import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import PoinPreview from "../public/images/Preview.png";
import { cn } from "@/lib/utils";
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

      <MaxWidthWrapper className="mb-8 space-y-12 sm:space-y-16">
        {/* Hero */}
        <div className="relative mt-16 flex w-full flex-col-reverse items-center gap-4 md:mt-32 md:flex-row lg:mt-48">
          <div className="w-full space-y-8 text-center md:w-1/2 md:text-left ">
            <p className="mx-auto flex w-max max-w-xs cursor-default items-center gap-4 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-lg sm:max-w-max md:mx-0">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500"></span>
              </span>
              <span className="text-sm">
                <span className="font-bold">AtmaKitchen</span> sekarang tersedia
                di Android dan iOS!
              </span>
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-h1 font-extrabold">Atma Kitchen</p>
              </div>
              <p className="text-slate-500">
                Selamat datang di Atma Kitchen, destinasi terbaik untuk
                menemukan berbagai pilihan roti, kue, dan produk lezat lainnya
                yang bermutu tinggi. Kami berkomitmen untuk memberikan pelayanan
                dan kualitas terbaik.
              </p>
            </div>
            <Link
              className={cn(
                buttonVariants(),
                "mx-auto flex w-max items-center gap-2 md:mx-0",
              )}
              href={"/u/produk"}
            >
              Pesan Sekarang <MoveRight width={16} />
            </Link>
            <div className="flex items-center justify-center gap-8 md:justify-start">
              {/* {statistics.map((data, index) => (
                <div className="space-y-2 text-center" key={index}>
                  <p className="text-h2 font-semibold">{data.count}</p>
                  <p className="text-slate-500">{data.title}</p>
                </div>
              ))} */}
            </div>
          </div>
          <Image
            src={HeroImage}
            alt="Hero Bread Illustration"
            className="-z-10 max-w-sm md:absolute md:-right-32 
            md:max-w-lg
            lg:max-w-xl xl:max-w-2xl"
          />
        </div>
        {/* Products */}
        <div className="space-y-8 lg:space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-h1 font-extrabold">Produk Fresh Kami</p>
            <p className="text-slate-500">
              Berbagai produk fresh yang kami jaga kualitasnya demi kepuasan
              pelanggan.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-8">
            <ProductCarousel />
            <Button>
              <Link href={"/u/produk"}>Lihat Semua</Link>
            </Button>
          </div>
        </div>
        {/* Proses */}
        {/* <div className="space-y-8 lg:space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-h1 font-extrabold">Bagaimana Prosesnya?</p>
            <p className="text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
              rhoncus tellus.
            </p>
          </div>{" "}
        </div> */}
        {/* Testimonial */}
        <div className="space-y-8 lg:space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-h1 font-extrabold">Apa Kata Mereka?</p>
            <p className="text-slate-500">
              Pendapat pelanggan tentang menu dan pelayanan kami.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            {testimonialData.map((data, index) => (
              <div className="flex h-max basis-full flex-col gap-4" key={index}>
                {data.map((testimony, index) => (
                  <div
                    className="h-max basis-full space-y-4 rounded border border-slate-200 p-6"
                    key={index}
                  >
                    <div className="flex gap-2">
                      <Image
                        src={testimony.avatar}
                        alt="Avatar"
                        className="h-12 w-12 rounded border"
                      />
                      <div className="space-y-0">
                        <p>{testimony.fullname}</p>
                        <p className="w-full text-slate-500">
                          {testimony.username} on X
                        </p>
                      </div>
                    </div>
                    <p>
                      {testimony.comment.split(" ").map((word, index) =>
                        word.toLowerCase().includes("atmakitchen") ? (
                          <span
                            key={index}
                            className="font-bold text-orange-600"
                          >
                            {word}{" "}
                          </span>
                        ) : (
                          <span key={index}>{word} </span>
                        ),
                      )}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Poin */}
        <div className="flex flex-col overflow-hidden">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-h1 font-semibold">
                  Beli. Dapat Poin. <br />
                  <span className="mt-1 text-5xl font-extrabold leading-none md:text-[6rem] md:font-bold ">
                    Tukar Reward.
                  </span>
                </h1>
              </>
            }
          >
            <Image
              src={PoinPreview}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto h-full rounded-2xl object-cover object-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>
        {/* CTA */}
        <div className="space-y-8 rounded-3xl bg-gradient-to-br from-red-600 to-orange-400 p-8 text-center text-white sm:space-y-8 sm:p-16">
          <div className="space-y-4">
            <p className="text-h1 font-extrabold ">Tunggu apa lagi? </p>
            <p className="text-sm sm:text-base">
              Pesan dan kumpulkan poinmu sekarang!
            </p>
          </div>
          <div>
            <Link href={""}>
              <Button
                variant={"default"}
                size={"lg"}
                className="text-bg-slate-0 bg-slate-900 hover:bg-slate-800 "
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
