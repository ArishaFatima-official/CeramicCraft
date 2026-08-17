import { useEffect, useState } from "react";
import { getAdminOrders, updateOrderStatus,} from "../../api/orderApi";
import type { Order } from "../../types/order";

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await getAdminOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (
    id: number,
    status: string
  ) => {
    try {
      await updateOrderStatus(id, status);

      // Refresh orders after updating status
      await fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">
          Orders
        </h2>

        <span className="badge bg-dark fs-6">
          {orders.length} Orders
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          No orders found.
        </div>
      ) : (
        <div className="card border-0 shadow-sm">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>
                  <tr>
                    <th>Order</th>
                    <th>User</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>

                      <td className="fw-bold">
                        #{order.id}
                      </td>

                      <td>
                        #{order.user_id}
                      </td>

                      <td>
                        Rs.{" "}
                        {Number(order.total_price).toLocaleString()}
                      </td>

                      <td>
                        {order.payment_method}
                      </td>

                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="processing">
                            Processing
                          </option>

                          <option value="shipped">
                            Shipped
                          </option>

                          <option value="delivered">
                            Delivered
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>
                        </select>
                      </td>

                      <td>
                        {new Date(
                          order.created_at
                        ).toLocaleDateString()}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminOrders;