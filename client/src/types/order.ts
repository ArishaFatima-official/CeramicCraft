export interface CheckoutData {
  shipping_address: string;
  payment_method: string;
}

export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  shipping_address: string;
  payment_method: string;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

