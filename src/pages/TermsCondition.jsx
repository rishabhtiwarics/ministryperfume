import React from 'react';
import { Scale, CheckCircle2, AlertCircle } from 'lucide-react';
import InnerBanner from '../components/common/InnerBanner.jsx';

export default function TermsCondition() {
  return (
    <>
      <InnerBanner
        eyebrow="LEGAL & AGREEMENT"
        title="Terms & Conditions"
        paragraph="Understanding our store guidelines, order terms, and purchasing agreement at Avenlora."
      />

      <section className="legal-policy-page-section">
        <div className="container">
          <div className="legal-policy-layout">
            {/* Sidebar quick overview card */}
            <aside className="legal-policy-sidebar">
              <div className="legal-quick-card">
                <Scale size={32} className="legal-card-icon" />
                <h3>Store Agreement</h3>
                <p>By placing an order on Avenlora, you agree to these transparent shopping terms and conditions.</p>
                
                <div className="legal-highlight-list">
                  <div className="highlight-item">
                    <CheckCircle2 size={16} />
                    <span>Authentic Formulations</span>
                  </div>
                  <div className="highlight-item">
                    <CheckCircle2 size={16} />
                    <span>Transparent Pricing</span>
                  </div>
                  <div className="highlight-item">
                    <CheckCircle2 size={16} />
                    <span>Secure Transactions</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Policy Content */}
            <main className="legal-policy-content">
              <div className="policy-block">
                <span className="policy-number">01</span>
                <h2>General Usage</h2>
                <p>
                  Welcome to Avenlora. By browsing or purchasing from our website, you confirm that you are at least 18 years old or accessing the site under parental supervision, and agree to abide by these Terms &amp; Conditions.
                </p>
              </div>

              <div className="policy-block">
                <span className="policy-number">02</span>
                <h2>Product Accuracy & Availability</h2>
                <p>
                  We strive to present exact notes, descriptions, and high-definition imagery of our perfumes. However, minor batch variations in natural botanicals may occur. Products are subject to stock availability, and we reserve the right to cap order quantities when necessary.
                </p>
              </div>

              <div className="policy-block">
                <span className="policy-number">03</span>
                <h2>Pricing & Payment</h2>
                <p>
                  All prices listed are in INR (Indian Rupees) inclusive of applicable taxes. Avenlora reserves the right to revise prices or discontinue discounts without prior notification. Full payment or valid Cash on Delivery confirmation is required before dispatch.
                </p>
              </div>

              <div className="policy-block">
                <span className="policy-number">04</span>
                <h2>Intellectual Property</h2>
                <p>
                  All trademarks, luxury bottle designs, logos, text, imagery, and video content featured on this site are the exclusive property of Ministry Perfume / Avenlora. Unauthorized duplication or reproduction is strictly prohibited.
                </p>
              </div>

              <div className="policy-block">
                <span className="policy-number">05</span>
                <h2>Limitation of Liability</h2>
                <p>
                  Avenlora will not be held liable for any indirect or consequential damages arising from improper fragrance storage, allergies to natural essences (always conduct a patch test), or courier transit delays beyond our control.
                </p>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}