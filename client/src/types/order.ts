export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}