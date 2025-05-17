import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("productList is rendering ")

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/customer/products/filter/category?category=${category}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        console.log("ProductList response: ", data)
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="my-4">
      <Row>
        {products.map((product) => (
          <Col key={product.productId} md={4} className="mb-4">
            <ProductCard product={product} />
            {products.length === 0 && <p>No products found.</p>}

          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
