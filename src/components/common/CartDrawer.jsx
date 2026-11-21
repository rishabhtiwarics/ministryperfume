import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatMoney, useCart } from '../../context/CartContext.jsx';
import ProductCard from '../shop/ProductCard.jsx';
import DiscountCodeForm from './DiscountCodeForm.jsx';

export default function CartDrawer() {
  const { items, count, total, currencyCode, isCartOpen, setIsCartOpen, isLoading, isBusy, hasUnavailableItems, error, clearError } = useCart();
  return (
    <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
      <div className="cart-drawer-header">
        <span>Shopping Bag <strong>{count} Items</strong></span>
        <button className="icon-btn sidebar-close" aria-label="Close cart" onClick={() => setIsCartOpen(false)}><X size={22} /></button>
      </div>
      <div className="cart-drawer-main">
        {error && <p className="shop-empty" role="alert">{error}<button type="button" onClick={clearError} aria-label="Dismiss cart error">Dismiss</button></p>}
        {isLoading ? <p className="shop-empty" role="status">Restoring your cart…</p> : items.length ? <div className="cart-list">{items.map((item) => <ProductCard key={item.lineId} product={item} variant="drawer-cart" />)}</div> : <div className="empty-cart"><ShoppingBag size={36} /><h3>Your cart is empty</h3><p>Add Ministry Perfume fragrances to see them here.</p><Link className="primary-btn" to="/shop" onClick={() => setIsCartOpen(false)}>Shop Now</Link></div>}
        {!isLoading && items.length > 0 && <DiscountCodeForm />}
      </div>
      {items.length > 0 && (
        <div className="cart-drawer-footer">
          <div className="cart-total"><span>Total</span><strong>{formatMoney(total, currencyCode)}</strong></div>
          <div className="cart-drawer-buttons">
            <Link className="view-cart-btn full" to="/cart" onClick={() => setIsCartOpen(false)}>VIEW CART</Link>
            {hasUnavailableItems
              ? <button className="primary-btn full" type="button" disabled>Remove sold-out items to checkout</button>
              : <Link className={`primary-btn full ${isBusy ? 'disabled' : ''}`} to="/checkout" onClick={() => setIsCartOpen(false)}>CHECKOUT</Link>}
          </div>
        </div>
      )}
    </aside>
  );
}
