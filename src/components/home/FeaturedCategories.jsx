import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products.js';

export default function FeaturedCategories({ collections }) {
  const shopCollections = collections
    ?.filter((collection) => ['men', 'women'].includes(collection.handle))
    .map((collection) => {
      const localCategory = categories.find((category) => category.filter.toLowerCase() === collection.handle);
      return {
        title: collection.title,
        image: collection.image?.url || localCategory?.image,
        altText: collection.image?.altText || `${collection.title} fragrances`,
        href: `/shop?category=${encodeURIComponent(collection.title)}`
      };
    });
  const featuredCategories = shopCollections?.length
    ? [...shopCollections, {
        title: 'All Fragrances',
        image: categories.find((category) => category.filter === 'all').image,
        altText: 'All Fragrances',
        href: '/shop'
      }]
    : categories
        .filter((category) => category.filter !== 'Combo')
        .map((category) => ({
          title: category.title,
          image: category.image,
          altText: category.title,
          href: category.filter === 'all' ? '/shop' : `/shop?category=${encodeURIComponent(category.filter)}`
        }));

  return (
    <section className="section featured-categories">
      <div className="section-head container">
        <div><span className="eyebrow">Shop By Fragrance</span><h2>Featured Categories</h2></div>
        <Link className="text-btn" to="/shop">Shop Now <ArrowRight size={17} /></Link>
      </div>
      <div className="container category-grid">
        {featuredCategories.map((category) => (
          <Link to={category.href} className="category-card" key={category.title}>
            <img src={category.image} alt={category.altText} />
            <span className="category-title">{category.title}</span>
            <span className="category-arrow"><ArrowRight size={17} /></span>
          </Link>
        ))}
      </div>
      <div className="container category-mobile-action"><Link className="primary-btn" to="/shop">Shop Now <ArrowRight size={17} /></Link></div>
    </section>
  );
}