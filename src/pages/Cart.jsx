import React from 'react';
import { ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard.jsx';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, subtotal } = useCart();

  return (
    <section className="cart-page-section">
      <div className="container">
        {/* Top Header with Eyebrow, Title, and Continue Shopping Button with Arrow */}
        <div className="cart-header-row">
          <div className="cart-header-title">
            <span className="cart-eyebrow">YOUR SELECTIONS</span>
            <h1 className="cart-main-title">Shopping Cart</h1>
          </div>
          <Link to="/shop" className="continue-shopping-btn">
            <ArrowLeft size={18} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Cart Content Layout */}
        <div className="cart-page-layout">
          <div className="cart-items-container">
            {items.length ? (
              <div className="cart-products-list">
                {items.map((item) => (
                  <ProductCard key={item.id} product={item} variant="cart" />
                ))}
              </div>
            ) : (
              <div className="cart-empty-state">
                <div className="cart-empty-icon">
                  <ShoppingBag size={28} />
                </div>
                <h2>Your Shopping Cart Is Empty</h2>
                <p>Explore our luxury fragrances and add your favorite scents to your bag.</p>
                <Link to="/shop" className="continue-shopping-btn primary">
                  <ArrowLeft size={16} />
                  <span>Explore Fragrances</span>
                </Link>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <aside className="cart-summary-aside">
              <h3 className="summary-title">Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">Calculated at Checkout</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total-row">
                <span>Estimated Total</span>
                <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>
              <Link className="checkout-btn full" to="/checkout">
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={18} />
              </Link>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}