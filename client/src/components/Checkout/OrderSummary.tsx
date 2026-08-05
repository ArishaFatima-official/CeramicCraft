type Props = {
  subtotal: number;
  shipping: number;
  total: number;
};

const OrderSummary = ({ subtotal, shipping, total }: Props) => {
  return (
    <div className="card shadow-sm border-0 sticky-top">
      <div className="card-body">
        <h4 className="fw-bold mb-4">Order Summary</h4>

        <div className="d-flex justify-content-between mb-2">
          <span>Subtotal</span>
          <strong>Rs. {subtotal.toFixed(2)}</strong>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span>Shipping</span>
          <strong>Rs. {shipping.toFixed(2)}</strong>
        </div>

        <hr />

        <div className="d-flex justify-content-between mb-4">
          <h5>Total</h5>
          <h5>Rs. {total.toFixed(2)}</h5>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;