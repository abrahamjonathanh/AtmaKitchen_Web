import axios from 'axios';

export async function getProdukByPenitipId(id: string) {
  try {
    const response = await axios.get(`https://example.com/api/produk?penitipId=${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching produk data');
  }
}
