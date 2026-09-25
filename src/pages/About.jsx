import React from 'react';
import { Link } from 'react-router-dom';
import { Check, MapPin } from 'lucide-react';
import InnerBanner from '../components/common/InnerBanner.jsx';
import { brandAssets, products } from '../data/products.js';

export default function About() {
  const features = [
    'Artisanal Formulations',
    'Long-Lasting Projection',
    'Certified Perfumers',
    'Unbeatable Pricing'
  ];

  return (
    <>
      <InnerBanner title="About Us" />

      {/* WHO WE ARE SECTION */}
      <section className="about-who-we-are-section">
        <div className="about-who-we-are-wrap">
          {/* LEFT: Stacked photos with stems & tags */}
          <div className="about-who-photos">
            <div className="about-who-photo-stack">
              <div className="about-who-photo back">
                <img src={products[0]?.image || brandAssets.bottleLine} alt={products[0]?.name || 'Golden Oud Premium'} />
              </div>
              <div className="about-who-photo front">
                <img src={products[1]?.image || brandAssets.amberSet} alt={products[1]?.name || 'Shadow Mist'} />
              </div>

              <div className="about-who-tag tag-top">
                <span className="stem"></span>
                <span className="text">
                  <h4>{products[0]?.name || 'Golden Oud Premium'}</h4>
                  <p>Eau de Parfum</p>
                </span>
              </div>

              <div className="about-who-tag tag-bottom">
                <span className="stem"></span>
                <span className="text">
                  <h4>{products[1]?.name || 'Shadow Mist'}</h4>
                  <p>Eau de Parfum</p>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Content side */}
          <div className="about-who-content">
            <h2>Who We Are</h2>
            <p className="lead">
              Since 2014, we've been hand-blending fragrances in small batches from a single atelier. Every bottle carries real ingredients, sourced responsibly, and a scent story built to last on skin, not just in the bottle.
            </p>

            <div className="about-who-feature">
              <MapPin className="pin" />
              <div className="body">
                <h3>Founded in Grasse, 2014</h3>
                <p>Started in a studio in the perfume capital of the world, working with local growers and distillers.</p>
              </div>
            </div>

            <div className="about-who-feature">
              <MapPin className="pin" />
              <div className="body">
                <h3>60+ fragrances crafted since</h3>
                <p>Every formula is tested for months before release, worn on real skin across every season.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL WIDTH MIDDLE BANNER */}
      <section className="about-middle-banner-section">
        <img src={brandAssets.aboutMiddle} alt="Ministry Perfume Craft Banner" />
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="about-why-choose-section">
        <div className="container">
          <div className="about-why-choose-row">

            {/* LEFT: main image */}
            <div className="about-media-col">
              <figure>
                <img src={brandAssets.whyImg} alt="Ministry Perfume Craftsmanship" />
              </figure>
            </div>

            {/* RIGHT: content column */}
            <div className="about-content-col">
              <div className="eyebrow">Why Choose Us</div>
              <h2>Our Professional Fragrance Craft</h2>
              <p className="intro">
                At Ministry Perfume, we blend rare botanicals, exotic resins, and fine oils to create luxury scents that captivate every scene.
              </p>

              <div className="about-feature-grid">
                {features.map((feat, idx) => (
                  <div className="about-feature-item" key={idx}>
                    <span className="icon">
                      <Check />
                    </span>
                    <span className="text">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="about-bottom-row">
                <div className="about-bottom-text">
                  <p className="body-text">
                    Each bottle is designed with utmost precision, delivering rich olfactory depth and signature elegance for any occasion.
                  </p>
                  <Link to="/shop" className="primary-btn about-explore-btn">
                    EXPLORE NOW
                  </Link>
                </div>
                <div className="about-bottom-img">
                  <img src={brandAssets.amberSet} alt="Fragrance Collection Display" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

