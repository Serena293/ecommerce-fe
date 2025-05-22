import { useContext, useEffect, useState } from "react";
import CartContext from "../CartContext";
import { useAuth } from "../AuthContext";
import { Button, Form, Table } from "react-bootstrap";

const CheckoutPage = () => {
  const { cartCount } = useContext(CartContext);
  const { user, token, isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dati spedizione (stato locale semplice)
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    email: "",
  });

  // Fetch articoli nel carrello dal backend
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated || !user?.userId) return;

      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/users/${user.userId}/cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch cart");

        const data = await response.json();
        setCartItems(data.items || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, token, isAuthenticated]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui invieresti i dati al backend o procedi con pagamento
    alert("Order placed! (funzionalità da implementare)");
  };

  if (!isAuthenticated) {
    return <p>Please login to checkout.</p>;
  }

  if (loading) return <div>Loading checkout...</div>;

  return (
    <section className="container my-4">
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price (each)</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>${item.productPrice.toFixed(2)}</td>
                  <td>${(item.productPrice * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="text-end fw-bold">
                  Total:
                </td>
                <td className="fw-bold">${totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>

          <h2>Shipping Information</h2>
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your full name"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Shipping address"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Place Order
            </Button>
          </Form>
        </>
      )}
    </section>
  );
};

export default CheckoutPage;
