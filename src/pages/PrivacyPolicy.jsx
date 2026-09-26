import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import InnerBanner from '../components/common/InnerBanner.jsx';

export default function PrivacyPolicy() {
  return (
    <>
      <InnerBanner
        eyebrow="TRUST & SECURITY"
        title="Privacy Policy"
        paragraph="How Avenlora protects your personal details and safeguards your shopping privacy."
      />

      <section className="legal-policy-page-section">
        <div className="container">
          <div className="legal-policy-layout">
            {/* Sidebar quick overview card */}
            <aside className="legal-policy-sidebar">
              <div className="legal-quick-card">
                <Shield size={32} className="legal-card-icon" />
                <h3>Your Privacy Guaranteed</h3>
                <p>We prioritize your confidentiality. Your data is encrypted and used strictly for fulfilling your orders.</p>
                
                <div className="legal-highlight-list">
                  <div className="highlight-item">
                    <CheckCircle2 size={16} />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                  <div className="highlight-item">
                    <CheckCircle2 size={16} />
                    <span>No Third-Party Selling</span>
                  </div>
                  <div className="highlight-item">
                    <CheckCircle2 size={16} />
                    <span>Hassle-Free Data Erasure</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Policy Content */}
            <main className="legal-policy-content">
              <div className="policy-block">
                <span className="policy-number">01</span>
                <h2>Information We Collect</h2>
                <p>
                  When you visit Avenlora or make a purchase, we collect necessary personal details to process your luxury fragrance order smoothly. This includes your name, shipping address, contact phone number, and email address.
                </p>
                <p>
                  We also collect basic technical data like IP address and browsing activity to improve website speed, recommendations, and user experience.
                </p>
              </div>

              <div className="policy-block">
                <span className="policy-number">02</span>
                <h2>How We Use Your Data</h2>
                <p>Your information is exclusively used for the following operational purposes:</p>
                <ul className="legal-styled-list">
                  <li>Processing, confirming, and dispatching your perfume orders.</li>
                  <li>Sending real-time shipping updates and order status alerts.</li>
                  <li>Responding to concierge inquiries and customer support requests.</li>
                  <li>Delivering optional promotional offers (only if you subscribe).</li>
                </ul>
              </div>

              <div className="policy-block">
                <span className="policy-number">03</span>
                <h2>Data Protection & Security</h2>
                <p>
                  We implement industry-standard encryption standards (SSL/TLS) for all data transfers. Payment details are handled securely by PCI-DSS compliant payment gateways like Razorpay; Avenlora never stores raw debit/credit card credentials.
                </p>
              </div>

              <div className="policy-block">
                <span className="policy-number">04</span>
                <h2>Third-Party Sharing</h2>
                <p>
                  We never sell, rent, or trade your personal data to external advertisers. Data is shared only with trusted logistical partners (e.g., courier partners) strictly for delivering packages to your doorstep.
                </p>
              </div>

              <div className="policy-block">
                <span className="policy-number">05</span>
                <h2>Your Rights & Contact</h2>
                <p>
                  You have full right to request access, updates, or deletion of your personal records stored in our database. For privacy inquiries, reach us anytime at <strong>privacy@avenlora.com</strong>.
                </p>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}