import React from 'react';
import { RotateCcw, Truck, CheckCircle2, Clock } from 'lucide-react';
import InnerBanner from '../components/common/InnerBanner.jsx';

export default function RefundPolicy() {
  return (
    <>
      <InnerBanner
        eyebrow="RETURNS & CANCELLATIONS"
        title="Refund & Return Policy"
        paragraph="Hassle-free guidelines for order cancellations, damaged package replacements, and refunds."
      />

      <section className="legal-policy-page-section">
        <div className="container">
          <div className="legal-policy-layout">
            {/* Sidebar quick overview card */}
            <aside className="legal-policy-sidebar">
              <div className="legal-quick-card">
                <RotateCcw size={32} className="legal-card-icon" />
                <h3>7-Day Return Window</h3>
                <p>We stand by the quality of our luxury fragrances. Received a damaged bottle? We will replace it promptly.</p>
                
                <div className="legal-highlight-list">
                  <div className="highlight-item">
                    <Clock size={16} />
                    <span>7 Days Replacement Guarantee</span>
                  </div>
                  <div className="highlight-item">
                    <Truck size={16} />
                    <span>Free Return Pickup</span>
                  </div>
                  <div className="highlight-item">
                    <CheckCircle2 size={16} />
                    <span>5-7 Business Days Refund</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Policy Content */}
            <main className="legal-policy-content">
              <div className="policy-block">
                <span className="policy-number">01</span>
                <h2>Cancellation Policy</h2>
                <p>
                  Orders can be cancelled free of charge anytime <strong>before dispatch</strong> from our warehouse. Once your package has been handed over to courier partners, cancellations can no longer be processed, but you may initiate a return upon delivery if eligible.
                </p>
              </div>

              <div className="policy-block">
                <span className="policy-number">02</span>
                <h2>Return & Replacement Eligibility</h2>
                <p>
                  Due to hygiene and safety standards of personal fragrance items, returns are accepted under the following conditions:
                </p>
                <ul className="legal-styled-list">
                  <li>Item arrived physically damaged, leaked, or broken during transit.</li>
                  <li>Incorrect fragrance or size delivered compared to your order invoice.</li>
                  <li>Unopened luxury box with original security seals intact within 7 days of delivery.</li>
                </ul>
              </div>

              <div className="policy-block">
                <span className="policy-number">03</span>
                <h2>How To Initiate A Return</h2>
                <p>
                  To request a return or replacement, email our concierge team at <strong>support@avenlora.com</strong> or WhatsApp us with:
                </p>
                <ul className="legal-styled-list">
                  <li>Your Order ID &amp; Contact Details.</li>
                  <li>Clear photos or unboxing video showing the damaged/incorrect item.</li>
                </ul>
                <p>Our team will verify the details within 24 hours and schedule a doorstep pickup.</p>
              </div>

              <div className="policy-block">
                <span className="policy-number">04</span>
                <h2>Refund Processing</h2>
                <p>
                  Once the returned item is received at our facility and passes basic quality verification, refunds are credited back to your original payment method within <strong>5-7 business days</strong>. For Cash on Delivery orders, refunds will be issued via UPI or Bank Transfer.
                </p>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
