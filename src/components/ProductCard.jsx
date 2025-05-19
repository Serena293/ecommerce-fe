import { Card, Button } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import EditProductModal from "./EditProductModal";
import React, { useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { user, isAuthenticated } = useAuth();

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(product);
  const [productId, setProductId] = useState("");

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    // console.log(token, "in productcard")
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

  return (
    <>
      <Card>
        <Card.Img variant="top" src={currentProduct.imageUrl} />
        <Card.Body>
          <Card.Title>{currentProduct.name}</Card.Title>
          <Card.Text>{currentProduct.description}</Card.Text>
          <Card.Text> price: {currentProduct.price} £</Card.Text>
          <Card.Text> size: {currentProduct.canvasSize}</Card.Text>
          {isAuthenticated && user.role === "CUSTOMER" && (
            <Button variant="dark">Add to cart</Button>
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
