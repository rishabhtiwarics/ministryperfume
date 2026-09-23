import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/shop/ProductCard.jsx';
import { products } from '../data/products.js';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;
  const title = selectedCategory ? selectedCategory : 'All Fragrances';

  return (
    <section className="page-section container">
      <div className="shop-toolbar">
        <h2>{title}</h2>
        <select defaultValue="Featured">
          <option>Featured</option>
          <option>Price low to high</option>
          <option>New arrivals</option>
        </select>
      </div>
      <div className="product-grid shop-grid">
        {filteredProducts.map((product) => <ProductCard key={product.id} product={product} variant="shop" />)}
      </div>
    </section>
  );
}