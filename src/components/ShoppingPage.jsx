import { useState, useEffect } from 'react';
import ProductList from './ProductList';
const ShoppingPage = () => {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch('http://localhost:8080/customer/products'); 
  //       if (!response.ok) throw new Error('Failed to fetch products');
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []); 

  // if (error) return <div>Error: {error}</div>;
  // if (loading) return <div>Loading products...</div>;

  return (
    <div className="shopping-page">
      <h1>All Products</h1>
      <ProductList products={products} /> 
    </div>
  );
};

export default ShoppingPage;