import { useEffect, useState } from "react";
import { getOrder } from "../api/orderApi";
import type { Order } from "../types/order";
import OrderCard from "../components/order/OrderCard";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrder();
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-4">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          No orders found.
        </div>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))
      )}

    </div>
  );
};

export default OrdersPage;