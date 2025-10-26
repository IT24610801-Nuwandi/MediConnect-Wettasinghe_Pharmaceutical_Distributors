import React from 'react';
import './Products.css';

export default function Products() {
  return (
    <section className="products">
      <h2>Products</h2>
      <p>Browse our wide range of pharmaceutical and healthcare products.</p>
    </section>
  );
}

// const [products, setProducts] = useState([]);

// useEffect(() => {
//   const fetchProducts = async () => {
//     const data = await getJSON('/api/products');  // Assume endpoint
//     setProducts(data);
//   };
//   fetchProducts();
// }, []);