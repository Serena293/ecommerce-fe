import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const EditProductModal = ({ show, onHide, product, onProductUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    canvasSize: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canvasSize, setCanvasSize] = useState("SMALL");

  // Initialize form data once product is loaded
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        canvasSize: product.canvasSize || "",
        category: product.category || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const data = new FormData();
    console.log(data, "in editprofile");
    data.append(
      "product",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    if (image) {
      data.append("image", image);
    }

    const token = localStorage.getItem("authToken");
    // console.log(token, "in editprofile")

    try {
      const response = await axios.put(
        `http://localhost:8080/admin/products/${product.productId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Product updated successfully!");
      onProductUpdate(response.data);
      setTimeout(() => {
        setSuccessMessage("");
        onHide();
      }, 1500);
    } catch (error) {
      setErrorMessage("Failed to update the product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price (£)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            {/* <Form.Label>Canvas Size</Form.Label>
            <Form.Control
              type="text"
              name="canvasSize"
              value={formData.canvasSize}
              onChange={handleChange}
              required
            /> */}

            <label>Canvas Size:</label>
            <select
              value={canvasSize}
              onChange={(e) => setCanvasSize(e.target.value)}
            >
              <option value="SMALL">30x40 cm (Small)</option>
              <option value="MEDIUM">50x70 cm (Medium)</option>
              <option value="LARGE">70x100 cm (Large)</option>
            </select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image (optional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
