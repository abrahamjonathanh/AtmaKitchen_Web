import { toRupiah } from "@/lib/utils";
import Image from "next/image";

export default function ProdukCard({
  // id,
  name,
  image,
  price,
}: {
  // id: number;
  name: string;
  image: string;
  price: string;
}) {
  // console.log(image);
  return (
    <div className="border rounded-lg border-slate-200 flex flex-col">
      <Image
        src={image}
        alt={`Image of ${name}`}
        className="rounded-t-lg max-h-36 object-cover"
        width="500"
        height="500"
      />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500">{toRupiah(parseInt(price))}</p>
        </div>
      </div>
    </div>
  );
}
