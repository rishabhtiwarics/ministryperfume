import React from 'react';
import { Instagram } from 'lucide-react';

const images = [
  '/img/instgramimg/inst1.png',
  '/img/instgramimg/inst2.png',
  '/img/instgramimg/inst3.png',
  '/img/instgramimg/inst4.png',
  '/img/instgramimg/inst5.png',
  '/img/instgramimg/inst6.png',
  '/img/instgramimg/inst7.png'
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