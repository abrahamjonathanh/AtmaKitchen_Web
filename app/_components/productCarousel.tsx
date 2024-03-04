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

import Image from "next/image";
import { toRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Spikoe from "../../public/products/Spikoe.png";
import Brownies from "../../public/products/Brownies.png";

export default function ProductCarousel() {
  const data = [
    {
      value: "Kue",
      data: [
        { image: Spikoe },
        { image: Spikoe },
        { image: Spikoe },
        { image: Spikoe },
      ],
    },
    {
      value: "Minuman",
      data: [
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
      ],
    },
    {
      value: "Roti",
      data: [
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
      ],
    },
    {
      value: "Hampers",
      data: [
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
        { image: Brownies },
      ],
    },
  ];
  const [productDisplay, setProductDisplay] = useState([
    { image: Spikoe },
    { image: Spikoe },
    { image: Spikoe },
    { image: Spikoe },
    { image: Spikoe },
    { image: Spikoe },
  ]);
  return (
    <Tabs
      defaultValue="Kue"
      className="w-full flex justify-center flex-col items-center gap-8"
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
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {productDisplay.map((data, index) => (
                <CarouselItem className="basis-1/3 md:basis-1/4" key={index}>
                  <div
                    className="w-full border rounded-md p-4 space-y-4"
                    key={index}
                  >
                    <Image
                      src={data.image}
                      alt="Spikoe"
                      className="rounded-sm"
                    />
                    <div className="space-y-2">
                      <p>Spikoe</p>
                      <Badge variant={"outline"}>PO</Badge>
                      <p className="font-semibold text-orange-600">
                        {toRupiah(150000)}
                      </p>
                    </div>
                    <Button variant={"outline"} className="w-full">
                      Lihat Detail
                    </Button>
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
