// detailDialog.tsx
import React, { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { IRiwayatPesanan } from "@/lib/interfaces";
import { toRupiah, toIndonesiaDate } from "@/lib/utils";

interface DetailDialogProps {
  isOpen: boolean;
  onCloseChange: Dispatch<SetStateAction<boolean>>;
  pesanan: IRiwayatPesanan;
}

const DetailDialog: React.FC<DetailDialogProps> = ({
  isOpen,
  onCloseChange,
  pesanan,
}: DetailDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCloseChange}>
      <DialogContent>
        <DialogTitle>Detail Pesanan</DialogTitle>
        <div>
          <p>ID Pesanan: {pesanan.id_pesanan}</p>
          <p>Status: {pesanan.status}</p>
          <p>Total Pesanan: {toRupiah(pesanan.total_pesanan)}</p>
          <p>Tanggal Order: {toIndonesiaDate(pesanan.tgl_order)}</p>
          <div className="mt-4 space-y-2">
            <p className="text-lg font-semibold">Produk:</p>
            {pesanan.produk.map((item) => (
              <div key={item.id}>
                <p>
                  {item.nama} - {toRupiah(item.harga)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
