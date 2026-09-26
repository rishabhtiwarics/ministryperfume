import React from 'react';
import { Check, ShoppingBag, Star, Trash2, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

export default function ProductCard({ product, variant = 'grid' }) {
  const cart = useCart();
  const added = cart?.inCart(product.id);
  const price = `₹${product.price.toLocaleString('en-IN')}`;
  const oldPrice = `₹${product.oldPrice.toLocaleString('en-IN')}`;

  if (variant === 'mini') return <Link className="product-mini" to={`/shop/${product.slug}`}><img src={product.image} alt={product.name} /><span>{product.name}</span><Rating rating={product.rating} compact /><strong>{price}</strong></Link>;
  if (variant === 'search') return <Link className="product-search" to={`/shop/${product.slug}`}><img src={product.image} alt={product.name} /><span>{product.name}<small>{price}</small></span></Link>;

  if (variant === 'drawer-cart') {
    return (
      <div className="cart-product drawer-cart-product">
        <img src={product.image} alt={product.name} />
        <div className="cart-product-info">
          <strong>{product.name}</strong>
          <span>{price} x {product.quantity}</span>
        </div>
        <button className="cart-remove" aria-label="Remove item" onClick={() => cart.removeFromCart(product.id)}>
          <Trash2 size={16} />
        </button>
      </div>
    );
  }
  
  if (variant === 'cart') {
    const itemTotal = `₹${(product.price * product.quantity).toLocaleString('en-IN')}`;
    return (
      <div className="cart-product">
        <img src={product.image} alt={product.name} />
        <div className="cart-product-info">
          <strong>{product.name}</strong>
          <span className="unit-price">{price} each</span>
        </div>
        <div className="cart-quantity-controls">
          <button
            className="qty-btn"
            aria-label="Decrease quantity"
            onClick={() => cart.updateQuantity(product.id, product.quantity - 1)}
          >
            <Minus size={14} />
          </button>
          <span className="qty-number">{product.quantity}</span>
          <button
            className="qty-btn"
            aria-label="Increase quantity"
            onClick={() => cart.updateQuantity(product.id, product.quantity + 1)}
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="cart-item-total">{itemTotal}</div>
        <button className="cart-remove" aria-label="Remove item" onClick={() => cart.removeFromCart(product.id)}>
          <Trash2 size={16} />
        </button>
      </div>
    );
  }

  return (
    <article className={`product-card ${variant}`} style={{ '--tone': product.tone }}>
      <Link to={`/shop/${product.slug}`} className="product-img"><img src={product.image} alt={product.name} /><span>{product.badge}</span></Link>
      <div className="product-info"><p>{product.category}</p><h3>{product.name}</h3><Rating rating={product.rating} /><div className="price"><strong>{price}</strong><del>{oldPrice}</del></div><button className="primary-btn" disabled={added} onClick={() => cart.addToCart(product)}>{added ? <Check size={17} /> : <ShoppingBag size={17} />}{added ? 'Added' : 'Add to Cart'}</button></div>
    </article>
  );
}

function Rating({ rating = 4, compact = false }) {
  return (
    <div className={`product-rating ${compact ? 'compact' : ''}`} aria-label={`${rating} out of 5 rating`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.max(0, Math.min(1, rating - index));
        return (
          <span className="rating-star" key={index} style={{ '--fill': `${fill * 100}%` }}>
            <Star size={compact ? 12 : 14} />
          </span>
        );
      })}
      {!compact && <small>{rating.toFixed(1)}</small>}
    </div>
  );
}