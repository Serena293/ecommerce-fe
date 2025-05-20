import { Card, Button } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import EditProductModal from "./EditProductModal";
import React, { useState } from "react";
import axios from "axios";
import useCart from "../useCart"; 

const ProductCard = ({ product }) => {
  const { user, isAuthenticated } = useAuth();
  const { updateCartCount } = useCart(); 

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(product);
  const [productId, setProductId] = useState("");

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.delete(
        `http://localhost:8080/admin/products/${product.productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "in product card");
      setProductId("");
    } catch (error) {
      console.log("err delete fetch", error);
    }
  };

  const addToCart = async () => {
    console.log("User object:", user);
    console.log("User ID:", user.userId);

    if (isAuthenticated && user) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
          `http://localhost:8080/api/v1/users/${user.userId}/cart/add`,
          {
            productId: product.productId,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Added to backend cart:", response.data);
        alert("Product added to your cart!");
        updateCartCount(prev => prev + 1); // ✅ aggiornato
      } catch (error) {
        console.error("Failed to add to cart:", error);
        alert("Failed to add product to cart.");
      }
    } else {
      const cart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existingItemIndex = cart.findIndex(
        (item) => item.productId === product.productId
      );

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({
          productId: product.productId,
          quantity: 1,
          name: product.name,
          price: product.price,
        });
      }

      localStorage.setItem("guestCart", JSON.stringify(cart));

      // ✅ aggiorna il contatore
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      updateCartCount(totalCount);
    }
  };

  return (
    <>
      <Card>
        <Card.Img variant="top" src={currentProduct.imageUrl} />
        <Card.Body>
          <Card.Title>{currentProduct.name}</Card.Title>
          <Card.Text>{currentProduct.description}</Card.Text>
          <Card.Text> price: {currentProduct.price} £</Card.Text>
          <Card.Text> size: {currentProduct.canvasSize}</Card.Text>
          {(!user || user.role !== "ADMIN") && (
            <Button variant="dark" onClick={addToCart}>
              Add to cart
            </Button>
          )}

          {isAuthenticated && user.role === "ADMIN" && (
            <div className="d-flex flex-row m-2">
              <Button
                variant="warning me-2"
                onClick={() => setShowEditModal(true)}
              >
                {" "}
                Edit
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete{" "}
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      <EditProductModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        product={currentProduct}
        onProductUpdate={(updatedProduct) => setCurrentProduct(updatedProduct)}
      />
    </>
  );
};

export default ProductCard;
