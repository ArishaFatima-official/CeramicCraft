export interface LowStockProduct {
  id: number;
  name: string;
  stock: number;
}

export interface AdminDashboard {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: LowStockProduct[];
}