import { Card, Button } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import EditProductModal from "./EditProductModal";
import React, { useState } from "react";
import axios from "axios";
import useCart from "../useCart";


const ProductCard = ({ product, onDelete }) => {
  const { user, isAuthenticated } = useAuth();
  const { incrementCartCount, setCartCountFromItems } = useCart();

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(product);

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(
        `http://localhost:8080/admin/products/${product.productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
          },
        }
      );
      onDelete(product.productId);
    } catch (error) {
      console.log("err delete fetch", error);
    }
  };

  const addToCart = async () => {
    if (isAuthenticated && user) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.post(
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
        alert("Product added to your cart!");
        incrementCartCount(); 
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
      setCartCountFromItems(cart);
    }
  };

  return (
    <>
      <Card className="product-card shadow-sm">
        <Card.Img variant="top" src={currentProduct.imageUrl} />
        <Card.Body>
          <Card.Title className="text-truncate">{currentProduct.name}</Card.Title>
          <Card.Text className="text-muted mb-2">
            {currentProduct.description.length > 100 
              ? `${currentProduct.description.substring(0, 100)}...` 
              : currentProduct.description}
          </Card.Text>
          <Card.Text className="fw-bold">Price: {currentProduct.price} £</Card.Text>
          <Card.Text>Size: {currentProduct.canvasSize}</Card.Text>
          
          <div className="btn-container mt-auto">
            {(!user || user.role !== "ADMIN") && (
              <Button variant="dark" onClick={addToCart} className="w-100">
                Add to cart
              </Button>
            )}

            {isAuthenticated && user.role === "ADMIN" && (
              <div className="d-flex flex-row">
                <Button
                  variant="warning me-2"
                  onClick={() => setShowEditModal(true)}
                  className="flex-grow-1"
                >
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  onClick={handleDelete}
                  className="flex-grow-1"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
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