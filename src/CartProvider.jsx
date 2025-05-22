import { useState, useEffect } from "react";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    const total = guestCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, []);

  const updateCartCount = (items) => {
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
