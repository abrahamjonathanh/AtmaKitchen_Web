import axios from "axios";

export async function getProdukByPenitipId(id: string) {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching produk data");
  }
}
