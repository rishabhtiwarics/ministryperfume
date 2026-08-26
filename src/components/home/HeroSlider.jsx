import React from 'react';
import { useEffect, useState } from 'react';
import { brandAssets } from '../../data/products.js';

const slides = [brandAssets.bottleLine, brandAssets.amberSet, 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1800&q=90'];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive((value) => (value + 1) % slides.length), 4200);
    return () => clearInterval(timer);
  }, []);
  return <section className="hero-slider">{slides.map((slide, index) => <img key={slide} src={slide} alt="Ministry perfume" className={index === active ? 'active' : ''} />)}<div className="hero-dots">{slides.map((_, index) => <button key={index} className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Go to slide ${index + 1}`} />)}</div></section>;
}