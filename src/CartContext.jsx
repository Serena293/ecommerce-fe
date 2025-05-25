import { createContext } from 'react';

const CartContext = createContext({
  cartCount: 0,
  setCartCountFromItems: () => {},
  incrementCartCount: () => {},
  decrementCartCount: () => {},
  clearCartCount: () => {}
});

export default CartContext;