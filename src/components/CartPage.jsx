import { useEffect, useState, useContext } from 'react';
import CardCart from "./CardCart";
import { useAuth } from '../AuthContext';
import CartContext from '../CartContext';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, token } = useAuth();
  const { updateCartCount } = useContext(CartContext);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/users/${user.userId}/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("data in fetchCart, CartPage", data);

      const items = data.items || [];
      setCartItems(items);
      updateCartCount(items); // 🔁 aggiorna il totale degli oggetti nel contesto
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (product) => {
    if (!window.confirm(`Remove ${product.productName} from cart?`)) return;

    console.log("Product passed to handleRemoveItem: -----", product);

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/users/${user.userId}/cart/items/${product.productId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to remove item');

      await fetchCartItems(); // 🔁 Refresha e aggiorna count
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item");
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.userId) {
      fetchCartItems();
    }
  }, [user?.userId, isAuthenticated, token]);

  if (!isAuthenticated) {
    return <p>Please login to view your cart</p>;
  }

  if (loading) return <div>Loading cart...</div>;

  return (
    <>
      <h1>My Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((product) => {
          console.log(product, "in CartPage");
          return (
            <CardCart
              key={product.productId}
              product={product}
              onRemove={handleRemoveItem}
            />
          );
        })
      ) : (
        <p>Your cart is empty</p>
      )}
    </>
  );
};

export default CartPage;
