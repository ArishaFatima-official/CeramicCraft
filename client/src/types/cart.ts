
export interface CartItem {
  id: number;
  quantity: number;
  product_id: number;
  name: string;
  price: number;
  images: string;
}
export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}