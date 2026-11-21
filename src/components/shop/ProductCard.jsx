import React from 'react';
import { Check, ShoppingBag, Star, Trash2, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatMoney, useCart } from '../../context/CartContext.jsx';
import { getProductAvailability } from '../../lib/productAvailability.js';

export default function ProductCard({ product, variant = 'grid' }) {
  const cart = useCart();
  const added = cart?.inCart(product.id);
  const availability = getProductAvailability(product);
  const soldOut = availability === 'sold-out';
  const variantUnavailable = availability === 'choose-options';
  const unavailable = availability !== 'available';
  const price = formatMoney(product.price, product.currencyCode || 'INR');
  const oldPrice = product.oldPrice > product.price
    ? formatMoney(product.oldPrice, product.currencyCode || 'INR')
    : null;

  if (variant === 'mini') return <Link className="product-mini" to={`/shop/${product.slug}`}><img src={product.image} alt={product.name} /><span>{product.name}</span><Rating rating={product.rating} compact /><strong>{price}</strong>{soldOut && <small className="product-stock-status">Sold out</small>}</Link>;
  if (variant === 'search') return <Link className="product-search" to={`/shop/${product.slug}`}><img src={product.image} alt={product.name} /><span>{product.name}<small>{price}</small>{soldOut && <small className="product-stock-status">Sold out</small>}</span></Link>;

  if (variant === 'drawer-cart') {
    const soldOutInCart = product.availableForSale === false;
    return (
      <div className="cart-product drawer-cart-product">
        <img src={product.image} alt={product.imageAlt || product.name} />
        <div className="cart-product-info">
          <strong>{product.name}</strong>
          <span className="unit-price">{price} each</span>
          {soldOutInCart && <span className="cart-availability" role="status">Sold out — remove to continue</span>}
          <div className="cart-quantity-controls">
            <button
              className="qty-btn"
              aria-label={`Decrease ${product.name} quantity`}
              disabled={cart.isBusy || soldOutInCart}
              onClick={() => cart.updateQuantity(product.lineId, product.quantity - 1)}
            >
              <Minus size={14} />
            </button>
            <span className="qty-number" aria-label={`Quantity: ${product.quantity}`}>{product.quantity}</span>
            <button
              className="qty-btn"
              aria-label={`Increase ${product.name} quantity`}
              disabled={cart.isBusy}
              onClick={() => cart.updateQuantity(product.lineId, product.quantity + 1)}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
        <button className="cart-remove" aria-label="Remove item" disabled={cart.isBusy} onClick={() => cart.removeFromCart(product.lineId)}>
          <Trash2 size={16} />
        </button>
      </div>
    );
  }
  
  if (variant === 'cart') {
    const soldOutInCart = product.availableForSale === false;
    const itemTotal = formatMoney(product.price * product.quantity, product.currencyCode || 'INR');
    return (
      <div className="cart-product">
        <img src={product.image} alt={product.imageAlt || product.name} />
        <div className="cart-product-info">
          <strong>{product.name}</strong>
          <span className="unit-price">{price} each</span>
          {soldOutInCart && <span className="cart-availability" role="status">Sold out — remove to continue</span>}
        </div>
        <div className="cart-quantity-controls">
          <button
            className="qty-btn"
            aria-label="Decrease quantity"
            disabled={cart.isBusy || soldOutInCart}
            onClick={() => cart.updateQuantity(product.lineId, product.quantity - 1)}
          >
            <Minus size={14} />
          </button>
          <span className="qty-number">{product.quantity}</span>
          <button
            className="qty-btn"
            aria-label="Increase quantity"
            disabled={cart.isBusy}
            onClick={() => cart.updateQuantity(product.lineId, product.quantity + 1)}
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="cart-item-total">{itemTotal}</div>
        <button className="cart-remove" aria-label="Remove item" disabled={cart.isBusy} onClick={() => cart.removeFromCart(product.lineId)}>
          <Trash2 size={16} />
        </button>
      </div>
    );
  }

  return (
    <article className={`product-card ${variant}`} style={{ '--tone': product.tone }}>
      <Link to={`/shop/${product.slug}`} className="product-img"><img src={product.image} alt={product.name} /><span>{product.badge}</span></Link>
      <div className="product-info"><p>{product.category}</p><h3>{product.name}</h3><Rating rating={product.rating} /><div className="price"><strong>{price}</strong>{oldPrice && <del>{oldPrice}</del>}</div>{variantUnavailable ? <Link className="primary-btn" to={`/shop/${product.slug}`}>Choose options</Link> : <button className="primary-btn" disabled={added || unavailable || cart?.isBusy || cart?.isLoading} onClick={() => cart.addToCart(product)}>{added ? <Check size={17} /> : <ShoppingBag size={17} />}{unavailable || cart?.isLoading ? (soldOut ? 'Sold Out' : 'Loading…') : added ? 'Added' : 'Add to Cart'}</button>}</div>
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