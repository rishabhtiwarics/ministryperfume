import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const fallbackSlides = [
  { desktopImage: '/hero-banner-desktop-1.jpeg', mobileImage: '/hero-banner-mobile-1.jpeg' },
  { desktopImage: '/hero-banner-desktop-2.jpeg', mobileImage: '/hero-banner-mobile-2.jpeg' },
  { desktopImage: '/hero-banner-desktop-3.jpeg', mobileImage: '/hero-banner-mobile-3.jpeg' }
];

export default function HeroSlider({ banners }) {
  const [active, setActive] = useState(0);
  const slides = banners?.length ? banners : fallbackSlides;
  const activeSlide = slides[active] || slides[0];

  useEffect(() => {
    if (active >= slides.length) setActive(0);
  }, [active, slides.length]);

  useEffect(() => {
    const timer = setInterval(() => setActive((value) => (value + 1) % slides.length), 4200);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero-slider">
      {activeSlide.href && !activeSlide.href.startsWith('/') ? (
        <a href={activeSlide.href} className="hero-slider-link" aria-label={activeSlide.altText || 'Shop Now'}>
          {slides.map((slide, index) => (
            <React.Fragment key={`slide-${index}`}>
              <img src={slide.desktopImage} alt={slide.altText || 'Ministry Perfume'} className={`desktop-slide-img ${index === active ? 'active' : ''}`} />
              <img src={slide.mobileImage || slide.desktopImage} alt={slide.altText || 'Ministry Perfume'} className={`mobile-slide-img ${index === active ? 'active' : ''}`} />
            </React.Fragment>
          ))}
        </a>
      ) : (
        <Link to={activeSlide.href || '/shop'} className="hero-slider-link" aria-label={activeSlide.altText || 'Shop Now'}>
          {slides.map((slide, index) => (
            <React.Fragment key={`slide-${index}`}>
              <img src={slide.desktopImage} alt={slide.altText || 'Ministry Perfume'} className={`desktop-slide-img ${index === active ? 'active' : ''}`} />
              <img src={slide.mobileImage || slide.desktopImage} alt={slide.altText || 'Ministry Perfume'} className={`mobile-slide-img ${index === active ? 'active' : ''}`} />
            </React.Fragment>
          ))}
        </Link>
      )}
      <div className="hero-dots">
        {slides.map((_, index) => (
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
