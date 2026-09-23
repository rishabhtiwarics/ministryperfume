import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import banner1 from '../../img/bnner1.jpeg';
import banner2 from '../../img/bnner2.jpeg';
import banner3 from '../../img/bnner3.jpeg';
import mobileBanner1 from '../../img/mobilelbnner1.jpeg';
import mobileBanner2 from '../../img/mobilebnner2.jpeg';
import mobileBanner3 from '../../img/mobilebnner3.jpeg';

const desktopSlides = [banner1, banner2, banner3];
const mobileSlides = [mobileBanner1, mobileBanner2, mobileBanner3];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((value) => (value + 1) % desktopSlides.length), 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-slider">
      <Link to="/shop" className="hero-slider-link" aria-label="Shop Now">
        {desktopSlides.map((slide, index) => (
          <img
            key={`desktop-${index}`}
            src={slide}
            alt="Ministry Perfume"
            className={`desktop-slide-img ${index === active ? 'active' : ''}`}
          />
        ))}
        {mobileSlides.map((slide, index) => (
          <img
            key={`mobile-${index}`}
            src={slide}
            alt="Ministry Perfume Mobile"
            className={`mobile-slide-img ${index === active ? 'active' : ''}`}
          />
        ))}
      </Link>
      <div className="hero-dots">
        {desktopSlides.map((_, index) => (
          <button
            key={index}
            className={index === active ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
