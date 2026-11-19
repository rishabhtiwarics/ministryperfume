import React from 'react';
import { useEffect, useState } from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brandAssets, categories } from '../../data/products.js';
import { fetchShopifyMenu, getShopifyMenuHref } from '../../lib/shopify.js';

const BRANDS = [
  { name: 'Amazon.in', img: 'https://krishnaayurved.com/cdn/shop/files/ka-amzin-logo.png?v=1775421770&width=110' },
  { name: 'Flipkart', img: 'https://krishnaayurved.com/cdn/shop/files/ka-flipk-logo.png?v=1775421768&width=110' }
];


export default function Footer() {
  const [footerMenu, setFooterMenu] = useState(null);
  const [menuError, setMenuError] = useState('');

  useEffect(() => {
    let active = true;
    fetchShopifyMenu('footer')
      .then((menu) => {
        if (active) setFooterMenu(menu);
      })
      .catch(() => {
        if (active) setMenuError('Shopify footer menu could not load; showing local links.');
      });

    return () => {
      active = false;
    };
  }, []);

  const footerItems = footerMenu?.items;
  const categoryItems = footerItems
    ? footerItems.filter((item) => item.title.toLowerCase() === 'all fragrances' || item.type === 'COLLECTION')
    : categories;
  const quickLinks = footerItems
    ? footerItems.filter((item) => !categoryItems.includes(item))
    : [
        { title: 'Privacy Policy', url: '/privacy-policy' },
        { title: 'Terms & Conditions', url: '/terms-condition' },
        { title: 'Refund Policy', url: '/refund-policy' }
      ];

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={brandAssets.blackLogo} alt="Ministry Perfume" />
          <p>Ministry Perfume creates premium fragrances with refined bottles, lasting notes, and memorable gifting appeal.</p>
          <div className="socials"><Instagram /><Facebook /><Youtube /></div>
        </div>
        <div className="footer-market">
          <h4>Available On</h4>
          <div className="market-logos">
            {BRANDS.map((brand) => (
              <a className="market-card" href="#" aria-label={brand.name} key={brand.name}>
                <img src={brand.img} alt={brand.name} />
              </a>
            ))}
          </div>
          <h4>Quick Links</h4>
          {quickLinks.map((item) => {
            const href = item.url.startsWith('/') ? item.url : getShopifyMenuHref(item);
            return href.startsWith('/')
              ? <Link to={href} key={item.title}>{item.title}</Link>
              : <a href={href} key={item.title}>{item.title}</a>;
          })}
        </div>
        <div className="footer-categories">
          <h4>Categories</h4>
          <div className="footer-categories-row">
            {categoryItems.map((item) => {
              const title = item.title;
              const category = categories.find((candidate) => (
                candidate.title.toLowerCase() === title.toLowerCase()
                || candidate.filter?.toLowerCase() === title.toLowerCase()
                || (title.toLowerCase() === 'all fragrances' && candidate.filter === 'all')
              ));
              const href = item.url ? getShopifyMenuHref(item) : (item.filter === 'all' ? '/shop' : `/shop?category=${encodeURIComponent(item.filter)}`);
              const image = category?.image;
              const content = <>{image && <img src={image} alt="" />}<span>{title}</span></>;
              return href.startsWith('/')
                ? <Link to={href} key={title}>{content}</Link>
                : <a href={href} key={title}>{content}</a>;
            })}
          </div>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p><MapPin size={17} /> Delhi, India</p>
          <p><Phone size={17} /> +91 98765 43210</p>
          <p><Mail size={17} /> hello@ministryperfume.com</p>
        </div>
      </div>
      {menuError && <p className="shopify-menu-status" role="status">{menuError}</p>}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>Copyright © 2026 Ministry Perfume. All rights reserved.</span>
          <span className="launchveda-credit">Created By <a href="https://www.launchveda.com/" target="_blank" rel="noopener noreferrer">Launchveda</a></span>
        </div>
      </div>
    </footer>
  );
}
