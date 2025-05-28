import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductList = ({ category = null }) => { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const endpoint = category
          ? `http://localhost:8080/customer/products/filter/category?category=${category}`
          : `http://localhost:8080/customer/products`;
        
        const response = await fetch(endpoint);
        
        if (!response.ok) throw new Error(`Failed to fetch products (HTTP ${response.status})`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleProductDelete = (deletedProductId) => {
    setProducts(products.filter(product => product.productId !== deletedProductId));
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (products.length === 0) return <Alert variant="info">No products found.</Alert>;

  return (
    <Container className="my-4">
      <Row>
        {products.map((product) => (
          <Col key={product.productId} md={4} className="mb-4">
            <ProductCard 
              product={product} 
              onDelete={handleProductDelete}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;