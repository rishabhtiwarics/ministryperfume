import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Banknote, ChevronDown, ChevronLeft, ChevronRight, MapPinned, Minus, Pause, Play, Plus, ShieldCheck, ShoppingBag, Star, Truck, Volume2, VolumeX } from 'lucide-react';
import { products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import ProductSection from '../components/home/ProductSection.jsx';
import miniGiftImg from '../../../../.gemini/antigravity-ide/brain/5adfa9e1-9947-49b7-a060-c0e8cf8f8de0/gift_mini_parfum_1790316889765.png';
import howToApplyImg from '../img/productdetails.jpeg';
import productDetailSingleImg from '../img/productdetail33.jpeg';
import centerDescNoteImg from '../../../../.gemini/antigravity-ide/brain/5adfa9e1-9947-49b7-a060-c0e8cf8f8de0/amber_perfume_note_center_1790323549699.png';

const THUMBNAIL_LIMIT = 5;

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.slug === slug) || products[0];
  const cart = useCart();
  const detailsRef = useRef(null);
  const images = product.images?.length ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('description');
  const [openFaq, setOpenFaq] = useState(null);
  const selectedImage = images[activeImage] || images[0];
  const relatedProducts = products.filter((item) => item.id !== product.id);
  const tags = product.tags || [product.category, product.badge].filter(Boolean);

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    const onScroll = () => setShowSticky(Boolean(detailsRef.current && detailsRef.current.getBoundingClientRect().bottom < 0));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [product.id]);

  const selectImage = (index) => setActiveImage(index);
  const moveMainImage = (direction) => selectImage(activeImage + direction);
  const addQuantityToCart = () => {
    Array.from({ length: quantity }).forEach(() => cart.addToCart(product));
  };
  const buyNow = () => {
    if (!cart.inCart(product.id)) addQuantityToCart();
    navigate('/cart');
  };

  return (
    <>
      <section className="page-section container product-detail-page" ref={detailsRef}>
        <nav className="shop-inline-breadcrumb breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><strong>{product.name}</strong>
        </nav>
        <div className="product-detail">
          <div className="product-gallery">
            {typeof selectedImage === 'string' && selectedImage.endsWith('.mp4') ? (
              <GalleryVideoItem src={selectedImage} isMain />
            ) : (
              <img className="product-gallery-main" src={selectedImage} alt={product.name} />
            )}

            {images.length > 1 && (
              <div className={`product-gallery-grid images-count-${Math.min(images.length, 5)}`}>
                {images.slice(0, 5).map((media, index) => (
                  <div key={`${media}-${index}`} className={`gallery-grid-item item-${index + 1} ${activeImage === index ? 'active' : ''}`} onClick={() => selectImage(index)}>
                    {typeof media === 'string' && media.endsWith('.mp4') ? (
                      <GalleryVideoItem src={media} isThumb />
                    ) : (
                      <img src={media} alt={`${product.name} view ${index + 1}`} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="product-detail-info">
            {product.badge && <span className="eyebrow">{product.badge}</span>}
            <h1>{product.name}</h1>
            
            <div className="product-spec-tags">
              <span className="spec-tag">UNISEX</span>
              <span className="spec-tag">LEATHER</span>
              <span className="spec-tag">PARFUM</span>
            </div>

            <div className="product-detail-meta">
              <span className="detail-rating">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={15} fill={index < Math.round(product.rating) ? 'currentColor' : 'none'} />)}
                <strong>{product.rating.toFixed(1)}</strong>
              </span>
              <span className="detail-stock"><i />{product.status || 'In Stock'}</span>
            </div>
            <div className="price big">
              <strong>₹{product.price.toLocaleString('en-IN')}</strong>
              {product.oldPrice && <del>₹{product.oldPrice.toLocaleString('en-IN')}</del>}
            </div>

            <p className="shipping-notice">* Ships within 24-36 hours of ordering.</p>

            <p>{product.description}</p>
            {tags.length > 0 && (
              <div className="product-tags">
                {tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            )}

            <div className="product-offers-section">
              <h3 className="offers-title">Offers</h3>
              <div className="offers-slider-container">
                <div className="offers-wrapper">
                  <div className="offer-card">
                    <div className="offer-card-side-badge">
                      <span>GIFT · INCLUDED</span>
                    </div>
                    <div className="offer-card-content">
                      <h4>A mini surprise for you</h4>
                      <p>Get a 7ml Parfum with your order</p>
                      <div className="offer-applied">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>APPLIED AT CHECKOUT</span>
                      </div>
                    </div>
                    <div className="offer-card-img">
                      <img src={images[1] || product.image} alt="Offer Product Mini" />
                    </div>
                  </div>

                  <div className="offer-card">
                    <div className="offer-card-side-badge">
                      <span>BUNDLE · SAVE</span>
                    </div>
                    <div className="offer-card-content">
                      <h4>More for you</h4>
                      <p>Buy 2 or more 100ml Fragrances, save up to 15%</p>
                      <div className="offer-explore-link">
                        <span>EXPLORE BUNDLES</span>
                      </div>
                    </div>
                    <div className="offer-card-img">
                      <img src={images[2] || images[0] || product.image} alt="Offer Product Bundle" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-purchase-row">
              <div className="product-quantity">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))}><Minus size={17} /></button>
                <strong>{quantity}</strong>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)}><Plus size={17} /></button>
              </div>
              <button className="primary-btn" disabled={cart.inCart(product.id)} onClick={addQuantityToCart}>
                <ShoppingBag size={18} />
                {cart.inCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button type="button" className="light-btn product-buy-now" onClick={buyNow}>Buy Now</button>
            </div>
            <div className="product-benefits">
              <ProductBenefit icon={ShieldCheck} text="Secure Transaction" />
              <ProductBenefit icon={Banknote} text="Pay on Delivery" />
              <ProductBenefit icon={MapPinned} text="Easy Order Tracking" />
              <ProductBenefit icon={Truck} text="Free Delivery" />
            </div>
            <div className="prepaid-offer">Get extra 5% off on prepaid orders</div>
          </div>
        </div>
      </section>

      {/* Product Details Accordion Section */}
      <section className="product-info-accordion-section container">
        <div className="product-accordions-group">
          {/* 1. Product Description Accordion */}
          <div className={`main-accordion-item ${openAccordion === 'description' ? 'open' : ''}`}>
            <button type="button" className="main-accordion-header" onClick={() => setOpenAccordion(openAccordion === 'description' ? null : 'description')}>
              <h2>Product Description</h2>
              <ChevronDown size={22} className="main-accordion-icon" />
            </button>
            {openAccordion === 'description' && (
              <div className="main-accordion-body">
                <p>{product.description} Experience luxury notes carefully distilled to create a memorable impression that lasts all day.</p>
                <div className="description-images-grid single-image-grid">
                  <div className="desc-img-item single-desc-img">
                    <img src={productDetailSingleImg} alt="Product Detail Spec" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. How To Apply Accordion */}
          <div className={`main-accordion-item ${openAccordion === 'howToApply' ? 'open' : ''}`}>
            <button type="button" className="main-accordion-header" onClick={() => setOpenAccordion(openAccordion === 'howToApply' ? null : 'howToApply')}>
              <h2>How To Apply</h2>
              <ChevronDown size={22} className="main-accordion-icon" />
            </button>
            {openAccordion === 'howToApply' && (
              <div className="main-accordion-body">
                <p>For optimum longevity and trail, spray onto pulse points such as your wrists, neck, and behind the ears from a distance of 6-8 inches.</p>
                <div className="how-to-apply-banner">
                  <img src={howToApplyImg} alt="How to apply perfume" />
                </div>
              </div>
            )}
          </div>

          {/* 3. FAQs Accordion */}
          <div className={`main-accordion-item ${openAccordion === 'faqs' ? 'open' : ''}`}>
            <button type="button" className="main-accordion-header" onClick={() => setOpenAccordion(openAccordion === 'faqs' ? null : 'faqs')}>
              <h2>FAQs</h2>
              <ChevronDown size={22} className="main-accordion-icon" />
            </button>
            {openAccordion === 'faqs' && (
              <div className="main-accordion-body">
                <div className="faq-accordion">
                  {[
                    { q: 'How long does this fragrance last?', a: 'Our concentrated Eau de Parfum formulation lasts between 8 to 12 hours on pulse points and even longer on garments.' },
                    { q: 'Is this suitable for sensitive skin?', a: 'Yes, all our perfumes are dermatologically tested and crafted with skin-safe ingredient standards.' },
                    { q: 'Can I return or exchange if unopened?', a: 'We accept returns and exchanges on unopened luxury packages within 7 days of delivery.' }
                  ].map((faq, idx) => (
                    <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                      <button type="button" className="faq-question" onClick={(e) => { e.stopPropagation(); setOpenFaq(openFaq === idx ? null : idx); }}>
                        <span>{faq.q}</span>
                        <ChevronDown size={18} className="faq-icon" />
                      </button>
                      {openFaq === idx && <div className="faq-answer"><p>{faq.a}</p></div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Legal Information Accordion */}
          <div className={`main-accordion-item ${openAccordion === 'legal' ? 'open' : ''}`}>
            <button type="button" className="main-accordion-header" onClick={() => setOpenAccordion(openAccordion === 'legal' ? null : 'legal')}>
              <h2>Legal Information</h2>
              <ChevronDown size={22} className="main-accordion-icon" />
            </button>
            {openAccordion === 'legal' && (
              <div className="main-accordion-body">
                <p>Manufactured &amp; Marketed by Ministry Perfume Pvt Ltd. All rights reserved. Country of origin: India. Ingredients: Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citral, Benzyl Alcohol.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ProductSection eyebrow="You may also like" title="Related Fragrances" products={relatedProducts} variant="related" />
      <div className={`product-section__sticky-product ${showSticky ? 'show' : ''}`}>
        <div className="container sticky-product-inner">
          <div className="sticky-product-left">
            <img src={product.image} alt="" />
            <div className="sticky-product-copy">
              <strong>{product.name}</strong>
              <span>₹{product.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="sticky-product-right">
            <div className="sticky-product-quantity">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))}><Minus size={16} /></button>
              <strong>{quantity}</strong>
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)}><Plus size={16} /></button>
            </div>
            <button type="button" className="primary-btn sticky-product-add" disabled={cart.inCart(product.id)} onClick={addQuantityToCart}>
              <ShoppingBag size={17} />
              {cart.inCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductBenefit({ icon: Icon, text }) {
  return <div><Icon size={19} /><span>{text}</span></div>;
}

function GalleryVideoItem({ src, isMain, isThumb }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (isThumb) {
    return (
      <div className="video-thumb-wrap">
        <video src={src} autoPlay loop muted playsInline />
        <span className="video-thumb-badge"><Play size={12} fill="currentColor" /></span>
      </div>
    );
  }

  return (
    <div className="product-gallery-video-wrap">
      <video ref={videoRef} src={src} autoPlay loop muted={isMuted} playsInline />
      <div className="gallery-video-controls">
        <button type="button" className="video-control-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
        </button>
        <button type="button" className="video-control-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}

