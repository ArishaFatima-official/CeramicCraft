import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../api/orderApi";
import { formatPrice, capitalize } from "../utils/helpers";

const OrderDetailPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(Number(id));
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (order.length === 0) {
    return (
      <div className="container py-5">
        <h4>No order found.</h4>
      </div>
    );
  }

  const orderInfo = order[0];

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">
        Order #{orderInfo.id}
      </h2>
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">

          <div className="row">

            <div className="col-md-6 mb-3">
              <strong>Status</strong>
              <p>{capitalize(orderInfo.status)}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Payment Method</strong>
              <p>{orderInfo.payment_method}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Total</strong>
              <p>{formatPrice(Number(orderInfo.total_price))}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Order Date</strong>
              <p>
                {new Date(orderInfo.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="col-12">
              <strong>Shipping Address</strong>
              <p>{orderInfo.shipping_address}</p>
            </div>

          </div>

        </div>
      </div>

      <h4 className="mb-3">Ordered Products</h4>

      {order.map((item) => (
        <div
          key={item.product_id}
          className="card shadow-sm border-0 mb-3"
        >
          <div className="card-body">

            <div className="row align-items-center">

              <div className="col-md-8">
                <h5>Product ID: {item.product_id}</h5>

                <p className="mb-1">
                  Quantity: {item.quantity}
                </p>

                <p className="mb-0">
                  Price: {formatPrice(Number(item.price))}
                </p>
              </div>

              <div className="col-md-4 text-end">
                <h5 className="fw-bold">
                  {formatPrice(
                    Number(item.price) * item.quantity
                  )}
                </h5>
              </div>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailPage;