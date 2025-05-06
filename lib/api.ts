import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Produk {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  ukuran: string;
  medium: string;
  slug: string;
  frame: string;
  artist: string;
  order_link: string;
  gambar: string | null;
  kategori_id: number;
  kategori: string;
  // tambahkan field lain jika perlu
}

export interface Kategori {
  id: number;
  name: string;
  index: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface PopularProduk {
  id: number;
  produk_id: number;
  index: number;
  created_at: string;
  updated_at: string;
  artist: string;
  produk: Produk;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Konfigurasi {
  id: number;
  nama_web: string;
  deskripsi_web: string;
  whatsapp: string;
  email: string;
  keyword: string;
  fontee_token: string;
  rekening: string;
  ewallet: string;
  atas_nama: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  alamat: string;
  favico: string;
  jam_buka: string;
  pesan_order: string;
  slogan: string;
  pesan_wa: string;
  logo: string;
  gambar_hero: string;
  faq: { question: string; answer: string }[];
}

export interface Kota {
  id: string;
  code: string;
  province_code: string;
  name: string;
  meta: {
    lat: string;
    long: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Transaksi {
  id: number;
  nama_cust: string;
  is_status: number;
  kode_transaksi: string;
  barcode: string;
  produk_id: number;
  city_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  kota: Kota;
}

export interface Collector {
  id: number;
  name: string;
  index: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  produk: {
    id: number;
    nama: string;
    deskripsi: string;
    harga: number;
    ukuran: string;
    medium: string | null;
    frame: string | null;
    artist: string | null;
    slug: string;
    order_link: string | null;
    gambar: string;
    kategori_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    transaksi: Transaksi[];
  }[];
}

// GET all produk (bisa ditambah pagination/search jika API mendukung)
export async function getProduk(): Promise<Produk[]> {
  try {
    const response = await api.get('/v1/produk');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
}

// GET produk by id
export async function getProdukById(slug: string): Promise<Produk> {
  try {
    const response = await api.get(`/v1/produk/${slug}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
}

export async function getPopularProduk(): Promise<PopularProduk[]> {
  try {
    const response = await api.get('/v1/popular');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
}

export async function getFAQ(): Promise<FAQ[]> {
  try {
    const response = await api.get('/v1/faq');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
}

export async function getKonfigurasi(): Promise<Konfigurasi> {
  try {
    const response = await api.get('/v1/konfigurasi');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
}

// GET all collectors with their products and transactions
export async function getCollectors(): Promise<Collector[]> {
  try {
    const response = await api.get('/v1/transaksi');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
}

// GET collector by id with their products and transactions
export async function getCollectorById(id: number): Promise<Collector> {
  try {
    const response = await api.get(`/v1/transaksi/${id}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
}
