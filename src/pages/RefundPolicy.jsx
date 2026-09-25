import React from 'react';
import InnerBanner from '../components/common/InnerBanner.jsx';

export default function RefundPolicy() {
  return (
    <>
      <InnerBanner eyebrow="Policy" title="Refund & Cancellation Policy" paragraph="Information regarding returns, refunds, and order cancellations at Ministry Perfume." />
      <section className="page-section container legal-policy-section">
        <h2>Refund Policy</h2>
        <p>At Ministry Perfume, we ensure all our luxury fragrances are carefully inspected and packed before dispatch. If you receive a damaged, defective, or incorrect product, you may request a replacement or refund within 7 days of delivery.</p>
        
        <h3>Cancellation Policy</h3>
        <p>Orders can be cancelled before they are dispatched from our warehouse. Once an order has been shipped, it cannot be cancelled, but eligible returns will be accepted upon delivery.</p>

        <h3>Refund Process</h3>
        <p>Approved refunds will be processed back to your original payment method within 5-7 business days after the returned item passes quality inspection.</p>
      </section>
    </>
  );
}
