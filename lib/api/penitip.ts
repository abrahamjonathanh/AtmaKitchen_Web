import axios from 'axios';
import { toast } from 'sonner';

export interface IPenitip {
  id?: string;
  nama: string;
  alamat: string;
  telepon: string;
  created_at: string;
}

//create
export const createPenitip = async (data: IPenitip) => {
  try {
    const response = await axios.post(`https://fakestoreapi.com/users`, data);
    toast.success('Berhasil menambah data penitip!');
    return response;
  } catch (error) {
    toast.error('Terjadi kesalahan saat menambah data penitip...');
    throw error;
  }
};

//update
export const updatePenitipById = async (id: string, data: IPenitip) => {
  try {
    const response = await axios.put(`https://fakestoreapi.com/users/${id}`, data);
    toast.success('Berhasil mengubah data penitip!');
    return response;
  } catch (error: any) {
    toast.error('Terjadi kesalahan saat mengubah data penitip...');
    throw error;
  }
};

//delete
export const deletePenitipById = async (id: string) => {
  try {
    const response = await axios.delete(`https://fakestoreapi.com/users/${id}`);
    toast.success('Berhasil menghapus data penitip!');
    return response;
  } catch (error: any) {
    toast.error('Terjadi kesalahan saat menghapus data penitip...');
    throw error;
  }
};
