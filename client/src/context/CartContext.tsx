import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { CartItem } from "../types/cart";
import {
  getCart,
  addtoCart,
  updateCart,
  deleteCartItem,
} from "../api/cartApi";

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;

  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (cartId: number, quantity: number) => Promise<void>;
  removeItem: (cartId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await getCart();
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (
    productId: number,
    quantity: number
  ) => {
    try {
      await addtoCart({
        productId,
        quantity,
      } as any);

      await fetchCart();
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const updateItem = async (
    cartId: number,
    quantity: number
  ) => {
    try {
      await updateCart(cartId, {
        quantity,
      } as any);

      await fetchCart();
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const removeItem = async (cartId: number) => {
    try {
      await deleteCartItem(cartId);

      await fetchCart();
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};