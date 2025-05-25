import { useState } from 'react';
import CartContext from './CartContext';

const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const contextValue = {
    cartCount,
    setCartCountFromItems: (items) => {
      const count = Array.isArray(items) ? items.length : items;
      setCartCount(count);
    },
    incrementCartCount: () => setCartCount(prev => prev + 1),
    decrementCartCount: () => setCartCount(prev => Math.max(0, prev - 1)),
    clearCartCount: () => setCartCount(0)
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;