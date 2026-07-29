export interface Product {
  id: number;
  category_id: number;
  category_name: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  material: string;
  color: string;
  dimensions: string;
  is_handmade: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface ProductResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  data: Product[];
}

export interface SearchParams {
  search?: string;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sort?: "price_asc" | "price_desc" | "newest";
}