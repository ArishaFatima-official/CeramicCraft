import type { CartItem } from "../../types/cart";

type Props = {
  item: CartItem;
 onDelete: (id: number) => void;
  onUpdate: (id: number, quantity: number) => void;
};

const CartItemcomponent = ({ item,onDelete,onUpdate }: Props) => {
  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="row g-0 align-items-center">
        <div className="col-md-3">
          <img
            src={item.images}
            className="img-fluid rounded-start"
            alt={item.name}
            style={{ height: "180px", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-9">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="card-title mb-1">{item.name}</h5>

                <h6 className="fw-bold">
                  Rs. {item.price}
                </h6>
              </div>

              <button className="btn btn-sm btn-outline-danger"
               onClick={() => onDelete(item.id)}>
                Remove
              </button>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button className="btn btn-outline-dark"
                onClick={() =>
    onUpdate(item.id, Math.max(1, item.quantity - 1))
  }>
                  -
                </button>

                <button className="btn btn-light" disabled>
                  {item.quantity}
                </button>

                <button className="btn btn-outline-dark"
                  onClick={() =>
    onUpdate(item.id, item.quantity + 1)
  }>
                  +
                </button>
              </div>

              <h5 className="fw-bold mb-0">
                Rs. {(item.price * item.quantity).toFixed(2)}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemcomponent;