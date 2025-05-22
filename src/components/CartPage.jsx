import { useEffect, useState, useContext } from "react";
import CardCart from "./CardCart";
import { useAuth } from "../AuthContext";
import CartContext from "../CartContext";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";



const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, token } = useAuth();
  const { updateCartCount } = useContext(CartContext);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/users/${user.userId}/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

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
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to remove item");

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
      <div className="d-flex justify-content-between align-items-center px-3">
        <h1>My Cart</h1>
        <a href="#" className="">
          Continue shopping
        </a>
      </div>

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
      <div className="d-flex  justify-content-end mx-5">
        <Button className="btn-dark mx-3">Continue Shopping</Button>
        <Link to="/checkout"> <Button variant="dark">Proceed Checkout</Button></Link>
       
      </div>
    </>
  );
};

export default CartPage;
