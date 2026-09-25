import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import ProductCard from '../shop/ProductCard.jsx';

export default function ProductSection({ eyebrow, title, paragraph, products, variant = 'grid', bottomAction = false }) {
  const isSlider = variant === 'related' || variant === 'slider';

  return (
    <section className="section product-section-wrap">
      <div className="section-head container">
        <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{paragraph && <p>{paragraph}</p>}</div>
        <Link className="text-btn" to="/shop">Shop Now <ArrowRight size={17} /></Link>
      </div>

      {isSlider ? (
        <div className="container product-swiper-wrap">
          <Swiper
            modules={[Autoplay]}
            loop
            speed={800}
            autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            spaceBetween={14}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 18 },
              1024: { slidesPerView: 4, spaceBetween: 20 }
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} variant="shop" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className={`container product-grid ${variant}`}>
          {products.map((product) => <ProductCard key={product.id} product={product} variant={variant} />)}
        </div>
      )}

      {bottomAction && <div className="container product-mobile-action"><Link className="primary-btn" to="/shop">Shop Now <ArrowRight size={17} /></Link></div>}
    </section>
  );
}