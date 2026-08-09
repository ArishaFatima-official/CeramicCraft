import type { Order } from "../../types/order";
import { Link } from "react-router-dom";
import { formatPrice, capitalize } from "../../utils/helpers";
type Props = {
  order: Order;
};

const OrderCard = ({ order }: Props) => {

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="fw-bold mb-1">
              Order #{order.id}
            </h5>

            <small className="text-muted">
              {new Date(order.created_at).toLocaleDateString()}
            </small>
          </div>

          <span className="badge bg-primary">
            {capitalize(order.status)}
          </span>
        </div>

        <hr />

        <div className="row mb-3">

          <div className="col-md-6">
            <strong>Total</strong>
            <p>{formatPrice(order.total_price)}</p>
          </div>

          <div className="col-md-6">
            <strong>Payment</strong>
            <p>{order.payment_method}</p>
          </div>

        </div>

        <div className="mb-3">
          <strong>Shipping Address</strong>
          <p>{order.shipping_address}</p>
        </div>

        <Link
          to={`/orders/${order.id}`}
          className="btn btn-dark"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default OrderCard;