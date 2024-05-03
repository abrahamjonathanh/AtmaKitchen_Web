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
    <div className="flex flex-col rounded-lg border border-slate-200">
      <Image
        src={image}
        alt={`Image of ${name}`}
        className="max-h-36 rounded-t-lg object-cover"
        width="500"
        height="500"
      />
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500">{toRupiah(parseInt(price))}</p>
        </div>
      </div>
    </div>
  );
}
