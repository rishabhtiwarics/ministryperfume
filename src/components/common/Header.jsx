import React from 'react';
import { Menu, Search, UserRound, ShoppingBag, X, LayoutDashboard, LogOut, ShieldCheck, Facebook, Instagram } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { products, brandAssets, categories } from '../../data/products.js';
import ProductCard from '../shop/ProductCard.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useCustomerAccount } from '../../context/CustomerAccountContext.jsx';
import { fetchShopifyCatalog, fetchShopifyMenu, getShopifyMenuHref, mapShopifyProduct } from '../../lib/shopify.js';

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Shop', path: '/shop', mega: true },
  { label: 'Contact', path: '/contact' }
];
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navigationLinks, setNavigationLinks] = useState(links);
  const [menuError, setMenuError] = useState('');
  const { count, setIsCartOpen } = useCart();

  useEffect(() => {
    let active = true;
    fetchShopifyMenu('header-menu')
      .then((menu) => {
        if (active) {
          setNavigationLinks(menu.items.map((item) => ({
            label: item.title,
            path: getShopifyMenuHref(item),
            mega: item.title.toLowerCase() === 'shop'
          })));
        }
      })
      .catch(() => {
        if (active) setMenuError('Shopify header menu could not load; showing local links.');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link to="/" className="logo"><img src={brandAssets.blackLogo} alt="Ministry Perfume" /></Link>
        <nav className="desktop-nav">
          {navigationLinks.map((link) => (
            <div className="nav-item" key={`${link.label}-${link.path}`}>
              {link.path.startsWith('/') ? (
                <NavLink to={link.path} className={({ isActive }) => isActive ? 'active' : ''}>{link.label}</NavLink>
              ) : (
                <a href={link.path}>{link.label}</a>
              )}
              {link.mega && <MegaMenu />}
            </div>
          ))}
        </nav>
        <div className="header-actions">
          <div className="search-mega-item">
            <span className="icon-btn search-action" aria-hidden="true">
              <Search size={21} />
            </span>
            <SearchMegaDropdown />
          </div>
          <UserMenu />
          <button className="icon-btn cart-trigger" aria-label="Cart" onClick={() => setIsCartOpen(true)}><ShoppingBag size={21} />{count > 0 && <span>{count}</span>}</button>
          <button className="icon-btn mobile-only" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={22} /></button>
        </div>
      </div>
      {menuError && <p className="shopify-menu-status" role="status">{menuError}</p>}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={brandAssets.whiteLogo} alt="Ministry Perfume" />
          <button className="icon-btn sidebar-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={22} /></button>
        </div>
        <div className="sidebar-main">
          <nav className="mobile-nav-list">{navigationLinks.map(({ label, path }) => path.startsWith('/')
            ? <NavLink key={`${label}-${path}`} to={path} onClick={() => setMenuOpen(false)}>{label}</NavLink>
            : <a key={`${label}-${path}`} href={path} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
          <Link className="sidebar-mini-banner" to="/shop" onClick={() => setMenuOpen(false)}><img src={brandAssets.sidebarBannerImg} alt="Ministry Perfume" /></Link>
          <div className="mobile-user-wrap"><UserPanel compact /></div>
        </div>
        <div className="sidebar-footer"><span>Follow Ministry Perfume</span><div className="sidebar-socials"><a href="#" aria-label="Facebook"><Facebook size={18} /></a><a href="#" aria-label="Instagram"><Instagram size={18} /></a></div></div>
      </div>
      <div className={`overlay ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
    </header>
  );
}

function SearchMegaDropdown() {
  const [searchTerm, setSearchTerm] = useState('');
  const [catalogProducts, setCatalogProducts] = useState(null);

  useEffect(() => {
    let active = true;
    fetchShopifyCatalog()
      .then((catalog) => {
        if (active) setCatalogProducts(catalog.products.map(mapShopifyProduct));
      })
      .catch(() => {
        if (active) setCatalogProducts(null);
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = searchTerm.trim() === ''
    ? []
    : (catalogProducts || products).filter((item) => {
        const query = searchTerm.trim().toLowerCase();
        return [item.name, item.category, item.description, ...(item.tags || [])]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      });

  return (
    <div className="search-mega-dropdown" onMouseLeave={() => setSearchTerm('')}>
      <div className="search-mega-header">
        <span className="eyebrow">Search Fragrances</span>
        <h3>Find Your Signature Scent</h3>
        <div className="search-mega-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Type fragrance name, oud, fresh, floral..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search text"
              title="Clear text"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="search-mega-body">
        {searchTerm.trim() === '' ? (
          <div className="search-empty-prompt">
            <Search size={28} />
            <p>Start typing above to search our luxury fragrance collection...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="search-empty-prompt">
            <p>No fragrances found matching "<strong>{searchTerm}</strong>".</p>
          </div>
        ) : (
          <div className="search-single-row-grid">
            {filteredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <div className="search-mega-footer">
        <Link
          to={searchTerm.trim() ? `/shop?search=${encodeURIComponent(searchTerm.trim())}` : '/shop'}
          className="primary-btn search-explore-btn"
        >
          Explore Now
        </Link>
      </div>
    </div>
  );
}

function UserMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="user-menu">
      <button className="icon-btn" aria-label="User menu" onClick={() => setOpen((value) => !value)}><UserRound size={21} /></button>
      <div className={`user-dropdown ${open ? 'open' : ''}`}><UserPanel /></div>
    </div>
  );
}

function UserPanel({ compact = false }) {
  const [role, setRole] = useState('guest');
  const { customer, isAuthenticated, logout: logoutCustomer } = useCustomerAccount();
  useEffect(() => setRole(localStorage.getItem('ministryPerfumeRole') === 'admin' ? 'admin' : 'guest'), []);
  const logout = () => { localStorage.removeItem('ministryPerfumeRole'); setRole('guest'); };

  if (role === 'admin') {
    return <div className={`user-panel ${compact ? 'compact' : ''}`}><span className="eyebrow">Admin Login</span><div className="user-row"><span className="avatar admin"><ShieldCheck size={20} /></span><div><strong>Ministry Perfume Admin</strong><small>admin@ministryperfume.com</small></div></div><Link to="/admin/dashboard" className="user-link"><LayoutDashboard size={17} /> Dashboard</Link><Link to="/profile" className="user-link"><UserRound size={17} /> Admin User Profile</Link><button className="logout-btn" onClick={logout}><LogOut size={17} /> Logout</button></div>;
  }

  if (isAuthenticated) {
    return <div className={`user-panel ${compact ? 'compact' : ''}`}><span className="eyebrow">My Account</span><div className="user-row"><span className="avatar"><UserRound size={20} /></span><div><strong>{customer.displayName}</strong><small>{customer.email}</small></div></div><Link to="/profile" className="user-link"><UserRound size={17} /> My Account & Orders</Link><button className="logout-btn" onClick={logoutCustomer}><LogOut size={17} /> Sign out</button></div>;
  }

  return <div className={`user-panel ${compact ? 'compact' : ''}`}><span className="eyebrow">My Account</span><h3>Login to your Ministry Perfume account</h3><p>Access orders, saved perfumes, and faster checkout.</p><div className="auth-actions"><Link to="/auth/login" className="primary-btn">Login</Link><Link to="/auth/register" className="light-btn">Register</Link></div></div>;
}

function MegaMenu() {
  const shopCategories = categories.filter((category) => category.filter !== 'Combo');
  return (
    <div className="mega-menu">
      <div><span className="eyebrow">Shop By Mood</span><h3>Signature Ministry Perfumes</h3><p>Premium oud, fresh, floral, and gifting fragrances in one refined collection.</p></div>
      <div className="mega-grid mega-category-grid">
        {shopCategories.map((cat) => {
          const to = cat.filter === 'all' ? '/shop' : `/shop?category=${encodeURIComponent(cat.filter)}`;
          return (
            <Link className="mega-category-card" to={to} key={cat.title}>
              <img src={cat.image} alt={cat.title} />
              <span>{cat.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
