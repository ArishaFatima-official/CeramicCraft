import { useState } from "react";
import { useCart } from "../context/CartContext";
import OrderSummary from "../components/Checkout/OrderSummary";
import {addOrder} from "../api/orderApi";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
const navigate = useNavigate();
    const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 250 : 0;
  const total = subtotal + shipping;
  const [checkoutData, setCheckoutData] = useState({
    shipping_address: "",
    payment_method: "Cash on Delivery",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCheckoutData({
      ...checkoutData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
      try {
        await addOrder({
            shipping_address: checkoutData.shipping_address,
            payment_method: checkoutData.payment_method,
        });
        alert("Order Placed Successfully!");
      } catch (error) {
        console.error("Failed to place order", error);
      }
    console.log(checkoutData);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Checkout</h2>

      <div className="row">
       
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">

              <h4 className="mb-4">Shipping Information</h4>

              <div className="mb-3">
                <label className="form-label">
                  Shipping Address
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="shipping_address"
                  value={checkoutData.shipping_address}
                  onChange={handleChange}
                  placeholder="Enter your shipping address"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Payment Method
                </label>

                <select
                  className="form-select"
                  name="payment_method"
                  value={checkoutData.payment_method}
                  onChange={handleChange}
                >
                  <option>Cash on Delivery</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

            </div>
          </div>
        </div>

          <div className="col-lg-4">
      <OrderSummary
        subtotal={subtotal}
        shipping={shipping}
        total={total}
      />
    </div>
                      <button
                className="btn btn-dark w-100"
                onClick={() => {
                  handlePlaceOrder();
                  navigate("/profile");
                }}
              >
                Place Order
              </button>

            </div>
          </div>
        
  );
};

export default CheckoutPage;