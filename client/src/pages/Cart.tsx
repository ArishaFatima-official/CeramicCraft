import { useCart } from "../context/CartContext";
import CartItemcomponent from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

const CartPage = () => {
  const { cartItems, updateItem, removeItem } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 250 : 0;
  const total = subtotal + shipping;

return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Shopping Cart</h2>

      <div className="row">

        {/* Cart Items */}
        <div className="col-lg-8">
           <div className="container py-5">
      <div className="row">
        {cartItems.map((item) => (
          <CartItemcomponent key={item.id} item={item} onDelete={removeItem}
  onUpdate={updateItem}/>
        ))}
      </div>
    </div>
        </div>

        
          <div className="col-lg-4">
      <CartSummary
        subtotal={subtotal}
        shipping={shipping}
        total={total}
      />
    </div>
        </div>
    </div>
  );
};

export default CartPage;