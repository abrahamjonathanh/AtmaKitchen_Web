"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image, { StaticImageData } from "next/image";
import { toRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Spikoe from "../../public/products/Spikoe.png";
import Brownies from "../../public/products/Brownies.png";
import LapisLegit from "../../public/products/Lapis legit.png";
import LapisSurabaya from "../../public/products/Lapis surabaya.png";
import ChocoCreamy from "../../public/products/Choco creamy latte.png";
import KopiLuwak from "../../public/products/Kopi luwak bubuk.png";
import MatchaCreamy from "../../public/products/Matcha creamy latte.png";
import MatchaOrganik from "../../public/products/Matcha organik bubuk.png";
import MilkBun from "../../public/products/Milk bun.png";
import RotiKeju from "../../public/products/Roti keju.png";
import RotiSosis from "../../public/products/Roti sosis.png";
import Link from "next/link";

type Product = {
  image: StaticImageData;
  name: string;
  price: string;
};

export default function ProductCarousel() {
  const data: { value: string; data: Product[] }[] = [
    {
      value: "Kue",
      data: [
        { image: Spikoe, name: "Spikoe", price: "Rp350.000" },
        { image: Brownies, name: "Brownies", price: "Rp250.000" },
        { image: LapisLegit, name: "Lapis Legit", price: "Rp850.000" },
        { image: LapisSurabaya, name: "Lapis Surabaya", price: "Rp550.000" },
      ],
    },
    {
      value: "Minuman",
      data: [
        { image: ChocoCreamy, name: "Choco Creamy", price: "Rp75.000" },
        { image: KopiLuwak, name: "Kopi Luwak", price: "Rp250.000" },
        { image: MatchaCreamy, name: "Matcha Creamy", price: "Rp100.000" },
        { image: MatchaOrganik, name: "Matcha Organik", price: "Rp300.000" },
      ],
    },
    {
      value: "Roti",
      data: [
        { image: MilkBun, name: "Milk Bun", price: "Rp120.000" },
        { image: RotiKeju, name: "Roti Keju", price: "Rp150.000" },
        { image: RotiSosis, name: "Roti Sosis", price: "Rp180.000" },
      ],
    },
  ];

  const [productDisplay, setProductDisplay] = useState<Product[]>([
    { image: Spikoe, name: "Spikoe", price: "Rp350.000" },
    { image: Brownies, name: "Brownies", price: "Rp250.000" },
    { image: LapisLegit, name: "Lapis Legit", price: "Rp850.000" },
    { image: LapisSurabaya, name: "Lapis Surabaya", price: "Rp550.000" },
  ]);

  return (
    <Tabs
      defaultValue="Kue"
      className="flex w-full flex-col items-center justify-center gap-8"
    >
      <TabsList>
        {data.map((data, index) => (
          <TabsTrigger
            value={data.value}
            onClick={() => setProductDisplay(data.data)}
            key={index}
          >
            {data.value}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map((data, index) => (
        <TabsContent value={data.value} key={index}>
          <Carousel
            className="w-full max-w-64 sm:max-w-lg lg:max-w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {productDisplay.map((data, index) => (
                <CarouselItem
                  className="basis-full sm:basis-1/3 lg:basis-1/4"
                  key={index}
                >
                  <div
                    className="w-full space-y-4 rounded-md border p-4"
                    key={index}
                  >
                    <Image
                      src={data.image}
                      alt={data.name}
                      className="rounded-sm"
                    />
                    <div className="space-y-2">
                      <p>{data.name}</p>
                      <Badge variant={"outline"}>PO</Badge>
                      <p className="font-semibold text-orange-600">
                        {data.price}
                      </p>
                    </div>
                    <Link href="/u/produk">
                      <Button variant={"outline"} className="w-full">
                        Lihat Detail
                      </Button>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </TabsContent>
      ))}
    </Tabs>
  );
}
