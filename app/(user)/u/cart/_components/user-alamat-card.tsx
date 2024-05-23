import { Button } from "@/components/ui/button";
import { getAlamatPelangganById } from "@/lib/api/alamat";
import React, { useState } from "react";
import { useCurrentUserStore } from "@/lib/state/user-store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IAlamat } from "@/lib/interfaces";

export default function UserAlamatCard({
  onAlamatHandler,
}: {
  onAlamatHandler: (values: IAlamat) => void;
}) {
  const [selectedAlamatIndex, setSelectedAlamatIndex] = useState(0);
  const { currentUser } = useCurrentUserStore();
  const { data, isLoading } = getAlamatPelangganById(
    parseInt(currentUser?.id_pelanggan ?? "1"),
  );

  const onChangeAlamat = (index: number) => {
    setSelectedAlamatIndex(index);
    onAlamatHandler(data.alamat[selectedAlamatIndex]);
  };
  return (
    !isLoading &&
    data && (
      <div className="space-y-4">
        <p className="text-h4">Pengiriman</p>
        <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4">
          <p className=" font-medium text-slate-500">Alamat Pengiriman</p>
          <div>
            <p className="text-h4">
              <span className="text-slate-500">
                {data.alamat[selectedAlamatIndex].label} |{" "}
              </span>
              {data.alamat[selectedAlamatIndex].nama}
            </p>
            <p>{data.alamat[selectedAlamatIndex].alamat}</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"}>Ganti Alamat</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Daftar Alamat</DialogTitle>
                <ScrollArea className="max-h-96">
                  {data.alamat.map((data: IAlamat, index: number) => (
                    <div
                      className={`mb-4 flex flex-col gap-1 rounded-lg border ${selectedAlamatIndex == index ? "border-orange-600 bg-orange-50" : "border-slate-200"} p-4`}
                      key={index}
                    >
                      <p className="text-slate-500">{data.label}</p>
                      <p className="text-lg font-semibold">{data.nama}</p>
                      <p>{data.telepon}</p>
                      <p>{data.alamat}</p>
                      {selectedAlamatIndex !== index && (
                        <DialogClose asChild>
                          <Button
                            variant={"default"}
                            size={"sm"}
                            className="self-end"
                            onClick={() => onChangeAlamat(index)}
                          >
                            Pilih
                          </Button>
                        </DialogClose>
                      )}
                    </div>
                  ))}
                </ScrollArea>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  );
}
