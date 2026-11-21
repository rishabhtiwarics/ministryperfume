import React from 'react';
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatMoney, useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const { items, total, currencyCode, checkoutUrl, isLoading, isBusy, hasUnavailableItems, error, clearError } = useCart();

  const continueToCheckout = () => {
    if (!checkoutUrl || isBusy || isLoading || hasUnavailableItems) return;
    window.location.assign(checkoutUrl);
  };

  return (
    <section className="checkout-page-section">
      <div className="container">
        <div className="cart-header-row">
          <div className="cart-header-title">
            <span className="cart-eyebrow">SECURE CHECKOUT</span>
            <h1 className="cart-main-title">Complete Your Order</h1>
          </div>
          <Link to="/cart" className="continue-shopping-btn">
            <ArrowLeft size={18} />
            <span>Back To Cart</span>
          </Link>
        </div>

        <div className="checkout-layout-grid">
          <section className="checkout-billing-card">
            <div className="billing-card-header">
              <div className="billing-header-icon"><Lock size={20} /></div>
              <div>
                <span className="billing-subtitle">SHOPIFY CHECKOUT</span>
                <h2 className="billing-title">Your details and payment</h2>
              </div>
            </div>
            <p>
              Shipping address, delivery options, discounts, and payment will be handled securely by Shopify.
              Your final total, including shipping and taxes, will be shown before you place your order.
            </p>
            {error && <p className="shop-empty" role="alert">{error}<button type="button" onClick={clearError}>Dismiss</button></p>}
          </section>

          <aside className="checkout-sidebar-column">
            <div className="checkout-cart-review-box">
              <h3 className="review-title">Order Summary</h3>
              {isLoading ? (
                <p className="no-items-text" role="status">Loading your Shopify cart…</p>
              ) : items.length ? (
                <div className="review-items-list">
                  {items.map((item) => (
                    <div key={item.lineId} className="review-item-card">
                      <img src={item.image} alt={item.imageAlt || item.name} className="review-item-img" />
                      <div className="review-item-info">
                        <strong>{item.name}</strong>
                        <span className="review-item-price">{formatMoney(item.price, item.currencyCode)} × {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-items-text">Your cart is empty. Add a product before checkout.</p>
              )}
              <div className="review-total-row">
                <span>Estimated total</span>
                <strong>{formatMoney(total, currencyCode)}</strong>
              </div>
              <p className="review-notice">Shipping, taxes, and available payment methods are calculated at Shopify checkout.</p>
              {items.length > 0 && (
                <>
                  {hasUnavailableItems && <p className="cart-availability" role="alert">Remove sold-out items from your cart before continuing.</p>}
                  <button
                    type="button"
                    className="checkout-place-order-btn"
                    disabled={isLoading || isBusy || !checkoutUrl || hasUnavailableItems}
                    onClick={continueToCheckout}
                  >
                    <Lock size={16} />
                    <span>{hasUnavailableItems ? 'Remove sold-out items to continue' : isBusy ? 'Updating cart…' : 'Continue to secure checkout'}</span>
                    <ArrowRight size={18} />
                  </button>
                </>
              )}
              {!items.length && !isLoading && <Link to="/shop" className="primary-btn">Explore fragrances</Link>}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
