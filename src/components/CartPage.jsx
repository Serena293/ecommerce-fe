import { useState, useEffect, useContext } from "react";
import CardCart from "./CardCart";
import { useAuth } from "../AuthContext";
import CartContext from "../CartContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const { user, isAuthenticated, token } = useAuth();
  const { setCartCountFromItems } = useContext(CartContext);

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
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const items = data.items || [];
      
      setCartItems(items);
      setCartCountFromItems(items.length); // Passa il numero di items
      
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
      setCartCountFromItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (product, action) => {
    setUpdatingItem(product.cartItemId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/users/${user.userId}/cart/items/${product.cartItemId}?action=${action}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update quantity");
      }

      await fetchCartItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert(error.message || "Failed to update quantity");
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleRemoveItem = async (product) => {
    if (!window.confirm(`Remove ${product.productName} from cart?`)) return;
    
    setUpdatingItem(product.cartItemId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/users/${user.userId}/cart/items/${product.cartItemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      await fetchCartItems();
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item");
    } finally {
      setUpdatingItem(null);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.userId) {
      fetchCartItems();
    }
  }, [user?.userId, isAuthenticated, token]);

  if (!isAuthenticated) return <p>Please login to view your cart</p>;
  if (loading) return <div>Loading cart...</div>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-3">
        <h1>My Cart</h1>
        <Link to="/shop" className="text-decoration-none">
          Continue shopping
        </Link>
      </div>

      {cartItems.length > 0 ? (
        cartItems.map((product) => (
          <CardCart
            key={product.cartItemId}
            product={product}
            onRemove={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            isUpdating={updatingItem === product.cartItemId}
          />
        ))
      ) : (
        <p>Your cart is empty</p>
      )}

      {cartItems.length > 0 && (
        <div className="d-flex justify-content-end mx-5 mt-4">
          <Button as={Link} to="/shop" className="btn-dark mx-3">
            Continue Shopping
          </Button>
          <Link to="/checkout">
            <Button variant="dark">Proceed to Checkout</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default CartPage;