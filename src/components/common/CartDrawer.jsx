import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../shop/ProductCard.jsx';
import { useCart } from '../../context/CartContext.jsx';

export default function CartDrawer() {
  const { items, subtotal, count, isCartOpen, setIsCartOpen } = useCart();
  return (
    <>
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div><span>Shopping Bag</span><strong>{count} item{count === 1 ? '' : 's'}</strong></div>
          <button className="icon-btn sidebar-close" aria-label="Close cart" onClick={() => setIsCartOpen(false)}><X size={22} /></button>
        </div>
        <div className="cart-drawer-main">
          {items.length ? <div className="cart-list">{items.map((item) => <ProductCard key={item.id} product={item} variant="cart" />)}</div> : <div className="empty-cart"><ShoppingBag size={36} /><h3>Your cart is empty</h3><p>Add Ministry fragrances to see them here.</p><Link className="primary-btn" to="/shop" onClick={() => setIsCartOpen(false)}>Shop Now</Link></div>}
        </div>
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-total"><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div>
            <Link className="primary-btn full" to="/checkout" onClick={() => setIsCartOpen(false)}>Checkout</Link>
          </div>
        )}
      </aside>
      <div className={`overlay ${isCartOpen ? 'show' : ''}`} onClick={() => setIsCartOpen(false)} />
    </>
  );
}