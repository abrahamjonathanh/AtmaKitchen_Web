import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { fetchBahanBaku } from "@/lib/api/pesanan";
import { IBahanBaku } from "@/lib/interfaces";
import { toast } from "sonner";
const BahanBakuDialog: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  pesananId: string;
}> = ({ isOpen, setIsOpen, pesananId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bahanBakuData, setBahanBakuData] = useState<IBahanBaku[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchBahanBaku(pesananId);
      setBahanBakuData(data.total_kekurangan_per_bahan_baku);
    } catch (error) {
      console.error("Failed to fetch bahan baku:", error);
      setError("Failed to fetch bahan baku. Please try again later.");
      toast.error("Failed to fetch bahan baku. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div>
              <h3>Data Bahan Baku</h3>
              <ul>
                {bahanBakuData.map((bahan: IBahanBaku) => (
                  <li key={bahan.id_bahan_baku}>
                    Nama Bahan Baku: {bahan.nama_bahan_baku}, Total Kekurangan:{" "}
                    {bahan.total_kekurangan}
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
    </>
  );
};

export default BahanBakuDialog;
