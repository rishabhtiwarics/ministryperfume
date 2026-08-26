import React from 'react';
import { Pause, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { products, reels } from '../../data/products.js';

const reelSlides = reels.slice(0, 8).map((reel, index) => ({ ...reel, key: `${reel.productId}-${index}` }));

export default function FavouriteReels() {
  return (
    <section className="section favourite-reels-section">
      <div className="center-title"><span className="eyebrow">Inspired By People</span><h2>Everyone's Favourite</h2></div>
      <div className="reels-swiper-wrap">
        <Swiper
          modules={[Autoplay]}
          loop
          speed={900}
          autoplay={{ delay: 2200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          spaceBetween={14}
          slidesPerView={2}
          watchOverflow
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 16 },
            992: { slidesPerView: 5, spaceBetween: 18 },
            1200: { slidesPerView: 6, spaceBetween: 18 }
          }}
        >
          {reelSlides.map((reel) => <SwiperSlide key={reel.key}><ReelCard reel={reel} product={products.find((item) => item.id === reel.productId)} /></SwiperSlide>)}
        </Swiper>
      </div>
    </section>
  );
}

function ReelCard({ reel, product }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <article className="reel-card">
      <video ref={videoRef} src={reel.video} poster={product.image} autoPlay loop muted playsInline />
      <button className="icon-btn reel-control" onClick={toggle}>{playing ? <Pause size={17} /> : <Play size={17} />}</button>
      <img src={product.image} alt="" className="reel-product" />
      <h3>{product.name}</h3>
      <p>₹{product.price.toLocaleString('en-IN')} <del>₹{product.oldPrice.toLocaleString('en-IN')}</del></p>
      <button className="light-btn">Shop Now</button>
    </article>
  );
}