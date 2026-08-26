import React from 'react';
import { Instagram } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=500&q=85'
];

export default function SocialMarquee() {
  const row = [...images, ...images, ...images];

  return (
    <section className="section social-section">
      <div className="center-title">
        <span className="eyebrow">Get Inspired</span>
        <h2>Instagram</h2>
      </div>
      <div className="image-marquee">
        <div>
          {row.map((image, index) => (
            <a className="social-marquee-card" href="https://www.instagram.com/" aria-label="Open Ministry Instagram" key={index}>
              <img src={image} alt="Instagram perfume post" />
              <span className="social-overlay"><Instagram size={26} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}