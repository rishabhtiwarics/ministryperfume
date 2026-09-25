import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import InnerBanner from '../components/common/InnerBanner.jsx';
import { brandAssets } from '../data/products.js';

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

      {/* FULL WIDTH MIDDLE BANNER */}
      <section className="about-middle-banner-section">
        <img src={brandAssets.aboutMiddle} alt="Ministry Perfume Craft Banner" />
      </section>
    </>
  );
}

