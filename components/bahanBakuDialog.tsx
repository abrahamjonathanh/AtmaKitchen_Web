import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { fetchBahanBaku } from "@/lib/api/pesanan";
import { IBahanBaku } from "@/lib/interfaces";
import { toast } from "sonner";

const BahanBakuDialog: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  bahanBakuData: [];
}> = ({ isOpen, setIsOpen, title, bahanBakuData }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [bahanBakuData, setBahanBakuData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // if (isOpen) {
    //   fetchData();
    // }
  }, [isOpen]);

  // const fetchData = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     const data = await fetchBahanBaku(pesananId);
  //     setBahanBakuData(data.data);
  //   } catch (error) {
  //     console.error("Failed to fetch bahan baku:", error);
  //     setError("Failed to fetch bahan baku. Please try again later.");
  //     toast.error("Failed to fetch bahan baku. Please try again later.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "visible" : "invisible"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div>
                <h3 className="mb-4 text-xl font-semibold">Data Bahan Baku</h3>
                <ul>
                  {bahanBakuData.map((bahan: any, index: number) => (
                    <li key={index} className="mb-2">
                      <p>Nama: {bahan.nama}</p>
                      <p>
                        Stok yang dibutuhkan: {bahan.total} {bahan.satuan}
                      </p>
                      <p>
                        Stok saat ini: {bahan.stok} {bahan.satuan}
                      </p>
                      <p>
                        Kekurangan: {bahan.total - bahan.stok} {bahan.satuan}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Tutup
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BahanBakuDialog;
