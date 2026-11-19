import React from 'react';
import { Instagram } from 'lucide-react';

const images = [
  '/instagram-post-1.png',
  '/instagram-post-2.png',
  '/instagram-post-3.png',
  '/instagram-post-4.png',
  '/instagram-post-5.png',
  '/instagram-post-6.png',
  '/instagram-post-7.png'
];

export default function SocialMarquee() {
  const row = [...images, ...images];
  return (
    <section className="social-section">
      <div className="section-head container center-title">
        <div><span className="eyebrow">Follow Us</span><h2>Instagram Moments</h2></div>
      </div>
      <div className="image-marquee">
        <div>
          {row.map((image, index) => (
            <a className="social-marquee-card" href="https://www.instagram.com/" aria-label="Open Ministry Perfume Instagram" key={index}>
              <img src={image} alt="Instagram perfume post" />
              <span className="social-overlay"><Instagram size={26} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
