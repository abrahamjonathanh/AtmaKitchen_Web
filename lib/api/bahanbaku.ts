import axios from 'axios';
import { toast } from 'sonner'; 

// Interface Bahan Baku
export interface IBahanBaku {
  id?: number;
  nama: string;
  stok: number;
  satuan: string;
  updated_at: string; 
}

// create
export const createBahanBaku = async (data: IBahanBaku) => {
  try {
    const response = await axios.post(`https://fakestoreapi.com/products`, data);

    toast.success('Berhasil menambah data bahan baku!');

    return response;
  } catch (error) {
    
    toast.error('Terjadi kesalahan saat menambah data bahan baku...');
    throw error; 
  }
};

// update
export const updateBahanBakuById = async (id: number, data: IBahanBaku) => {
  try {
    const response = await axios.put(`https://fakestoreapi.com/products/${id}`, data);

    toast.success('Berhasil mengubah data bahan baku!');

    return response;
  } catch (error: any) {
   
    toast.error('Terjadi kesalahan saat mengubah data bahan baku...');
    throw error; 
  }
};

// delete
export const deleteBahanBakuById = async (id: number) => {
  try {
    const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);

    toast.success('Berhasil menghapus data bahan baku!');

    return response;
  } catch (error: any) {
   
    toast.error('Terjadi kesalahan saat menghapus data bahan baku...');
    throw error; 
  }
};
