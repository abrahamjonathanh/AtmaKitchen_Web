import Image from "next/image";
import React from "react";
import Logo from "../public/logo/LogoO.svg";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import MaxWidthWrapper from "./maxWidthWrapper";
export default function Footer() {
  const footerData = [
    {
      title: "Produk",
      data: [
        { title: "Pre order", link: "#" },
        { title: "Kue", link: "#" },
        { title: "Roti", link: "#" },
        { title: "Minuman", link: "#" },
        { title: "Hampers", link: "#" },
        { title: "Lainnya", link: "#" },
      ],
    },
    {
      title: "Layanan",
      data: [
        { title: "Poin saya", link: "#" },
        { title: "Delivery order", link: "#" },
        { title: "Take away order", link: "#" },
        { title: "Pusat bantuan", link: "#" },
      ],
    },
    {
      title: "Kontak",
      data: [
        { title: "Kontak kami", link: "#" },
        { title: "Kerja sama", link: "#" },
      ],
    },
  ];
  return (
    <div className="border-t border-slate-200">
      <MaxWidthWrapper className="py-8 xl:py-16 space-y-8 xl:flex xl:justify-between xl:items-start xl:space-y-0">
        {/* Brand */}
        <div className="space-y-4 xl:w-1/3 ">
          <Link
            href={""}
            className="flex gap-1 sm:gap-2 items-center justify-center xl:justify-start"
          >
            <Image src={Logo} alt="AtmaKitchen Logo" />
            <p className="text-xl sm:text-2xl text-orange-600 font-medium">
              AtmaKitchen
            </p>
          </Link>
          <div className="space-y-2">
            <span className="text-slate-700 flex items-center xl:text-left gap-4 w-max mx-auto xl:mx-0">
              <MapPin className="text-orange-600" />
              <p className="w-full">Jln. Babarsari No. 5, Sleman, Yogyakarta</p>
            </span>
            <span className="text-slate-700 flex items-center xl:text-left gap-4 w-max mx-auto xl:mx-0">
              <Phone className="text-orange-600" />
              <p className="w-full">0817 7726 2162</p>
            </span>
          </div>
        </div>
        {/* Links */}
        <div className="space-y-8 flex flex-col md:flex-row justify-center items-center xl:items-start xl:space-y-0 xl:w-7/12 ">
          {footerData.map((footer, index) => (
            <div
              className="space-y-4 text-center md:text-left md:w-1/4"
              key={index}
            >
              <p className="font-medium text-black">{footer.title}</p>
              <div className="space-y-3">
                {footer.data.map((data, index) => (
                  <p
                    key={index}
                    className="text-slate-500 w-full hover:underline hover:text-black"
                  >
                    <Link href={data.link}>{data.title}</Link>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
      <div className="bg-orange-600 py-3 md:py-4">
        <p className="text-white text-center font-bold">
          &copy; AtmaKitchen {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
