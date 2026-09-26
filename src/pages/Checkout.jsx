import React, { useState } from 'react';
import {
  ArrowLeft, User, Mail, Phone, MapPin, Building, Home, Globe,
  Lock, Trash2, CheckCircle, FileText, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const { items, subtotal, removeFromCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('online');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!agreedTerms) {
      alert('Please agree to the website terms and conditions before placing your order.');
      return;
    }
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <section className="checkout-page-section">
        <div className="container">
          <div className="order-success-card">
            <CheckCircle size={56} className="success-icon" />
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for shopping with Avenlora. Your order has been confirmed and our concierge team is preparing your luxury package.</p>
            <div className="order-summary-box">
              <span>Total Amount Paid</span>
              <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>
            <Link to="/shop" className="continue-shopping-btn primary">
              <ArrowLeft size={16} />
              <span>Back To Shop</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page-section">
      <div className="container">
        {/* Top Header matching Cart page style */}
        <div className="cart-header-row">
          <div className="cart-header-title">
            <span className="cart-eyebrow">PLACE ORDER</span>
            <h1 className="cart-main-title">Billing Details</h1>
          </div>
          <Link to="/cart" className="continue-shopping-btn">
            <ArrowLeft size={18} />
            <span>Back To Cart</span>
          </Link>
        </div>

        {/* 2-Column Checkout Layout matching Figma UI */}
        <form className="checkout-layout-grid" onSubmit={handlePlaceOrder}>
          {/* Left Column: Billing Details Form */}
          <div className="checkout-billing-card">
            <div className="billing-card-header">
              <div className="billing-header-icon">
                <FileText size={20} />
              </div>
              <div>
                <span className="billing-subtitle">PLACE ORDER</span>
                <h2 className="billing-title">Billing details</h2>
              </div>
            </div>

            <div className="billing-form-grid">
              {/* First Name & Last Name */}
              <div className="form-row-2col">
                <div className="checkout-field">
                  <label htmlFor="firstName">First name *</label>
                  <div className="input-icon-wrapper">
                    <User className="input-icon" size={18} />
                    <input id="firstName" type="text" placeholder="First name" required />
                  </div>
                </div>
                <div className="checkout-field">
                  <label htmlFor="lastName">Last name *</label>
                  <div className="input-icon-wrapper">
                    <User className="input-icon" size={18} />
                    <input id="lastName" type="text" placeholder="Last name" required />
                  </div>
                </div>
              </div>

              {/* Company Name */}
              <div className="checkout-field">
                <label htmlFor="company">Company name (optional)</label>
                <div className="input-icon-wrapper">
                  <Building className="input-icon" size={18} />
                  <input id="company" type="text" placeholder="Company name" />
                </div>
              </div>

              {/* Country / Region */}
              <div className="checkout-field">
                <label htmlFor="country">Country / Region *</label>
                <div className="input-icon-wrapper">
                  <Globe className="input-icon" size={18} />
                  <select id="country" required defaultValue="India">
                    <option value="India">India</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
              </div>

              {/* Street Address */}
              <div className="checkout-field">
                <label htmlFor="address">Street address *</label>
                <div className="input-icon-wrapper">
                  <MapPin className="input-icon" size={18} />
                  <input id="address" type="text" placeholder="House number and street name" required />
                </div>
              </div>

              {/* Apartment, Suite */}
              <div className="checkout-field">
                <label htmlFor="apartment">Apartment, suite, unit, etc. (optional)</label>
                <div className="input-icon-wrapper">
                  <Home className="input-icon" size={18} />
                  <input id="apartment" type="text" placeholder="Apartment, suite, unit, etc. (optional)" />
                </div>
              </div>

              {/* Town / City & State */}
              <div className="form-row-2col">
                <div className="checkout-field">
                  <label htmlFor="city">Town / City *</label>
                  <div className="input-icon-wrapper">
                    <Building className="input-icon" size={18} />
                    <input id="city" type="text" placeholder="Town / City" required />
                  </div>
                </div>
                <div className="checkout-field">
                  <label htmlFor="state">State *</label>
                  <div className="input-icon-wrapper">
                    <Globe className="input-icon" size={18} />
                    <input id="state" type="text" placeholder="State" required />
                  </div>
                </div>
              </div>

              {/* ZIP Code & Phone */}
              <div className="form-row-2col">
                <div className="checkout-field">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <div className="input-icon-wrapper">
                    <FileText className="input-icon" size={18} />
                    <input id="zipCode" type="text" placeholder="ZIP Code" required />
                  </div>
                </div>
                <div className="checkout-field">
                  <label htmlFor="phone">Phone *</label>
                  <div className="input-icon-wrapper">
                    <Phone className="input-icon" size={18} />
                    <input id="phone" type="tel" placeholder="Phone" required />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="checkout-field">
                <label htmlFor="email">Email address *</label>
                <div className="input-icon-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input id="email" type="email" placeholder="Email address" required />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="checkout-checkboxes">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Create an account?</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Ship to a different address?</span>
                </label>
              </div>

              {/* Order Notes */}
              <div className="checkout-field">
                <label htmlFor="orderNotes">Order notes (optional)</label>
                <div className="input-icon-wrapper textarea-wrapper">
                  <MessageSquare className="input-icon textarea-icon" size={18} />
                  <textarea id="orderNotes" placeholder="Notes about your order, e.g. special delivery instructions" rows={3}></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cart Review & Payment Method */}
          <div className="checkout-sidebar-column">
            {/* Dark Theme Cart Review Box */}
            <div className="checkout-cart-review-box">
              <h3 className="review-title">Cart Review</h3>

              <div className="review-items-list">
                {items.length ? (
                  items.map((item) => (
                    <div key={item.id} className="review-item-card">
                      <img src={item.image} alt={item.name} className="review-item-img" />
                      <div className="review-item-info">
                        <strong>{item.name}</strong>
                        <span className="review-item-price">₹{item.price.toLocaleString('en-IN')} × {item.quantity}</span>
                      </div>
                      <button type="button" className="review-item-remove" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="no-items-text">No items in cart</p>
                )}
              </div>

              <div className="review-total-row">
                <span>Total</span>
                <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>
              <p className="review-notice">Final shipping details can be confirmed by Avenlora team.</p>
            </div>

            {/* Payment Method Card */}
            <div className="checkout-payment-card">
              <h3 className="payment-title">Payment method</h3>

              <div className="payment-options-group">
                <label className={`payment-option-card ${paymentMethod === 'online' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                  />
                  <div>
                    <strong>Razorpay</strong>
                    <p>Pay securely online with Razorpay.</p>
                  </div>
                </label>

                <label className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <div>
                    <strong>Cash on delivery</strong>
                    <p>Pay when your order is delivered.</p>
                  </div>
                </label>
              </div>

              <p className="privacy-notice">
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
              </p>

              <label className="terms-checkbox-label">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                />
                <span>I have read and agree to the website terms and conditions *</span>
              </label>

              <button type="submit" className="checkout-place-order-btn">
                <Lock size={16} />
                <span>Place order</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}