import React, { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';

export default function DiscountCodeForm() {
  const { items, discountCodes = [], isBusy, isLoading, applyDiscountCode, removeDiscountCode } = useCart();
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  if (!items.length) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submittedCode = code.trim();
    if (!submittedCode) {
      setFeedback('Enter a discount code.');
      return;
    }

    setIsApplying(true);
    try {
      const result = await applyDiscountCode(submittedCode);
      if (result === 'applied') {
        setFeedback('Discount code applied.');
        setCode('');
      } else if (result === 'invalid') {
        setFeedback(`Shopify says "${submittedCode}" doesn't apply to this cart.`);
      }
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemove = async (discountCode) => {
    const removed = await removeDiscountCode(discountCode);
    if (removed) setFeedback('Discount code removed.');
  };

  return (
    <section className="discount-code-section" aria-label="Discount codes">
      <form className="discount-code-form" onSubmit={handleSubmit}>
        <label htmlFor="cart-discount-code"><Tag size={16} /> Discount code</label>
        <div className="discount-code-entry">
          <input
            id="cart-discount-code"
            type="text"
            autoComplete="off"
            placeholder="Enter code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            disabled={isLoading || isBusy || isApplying}
          />
          <button type="submit" disabled={isLoading || isBusy || isApplying || !code.trim()}>
            {isApplying || isBusy ? 'Applying...' : 'Apply'}
          </button>
        </div>
      </form>

      {feedback && (
        <p className={`discount-code-feedback ${feedback.includes("doesn't apply") ? 'is-error' : ''}`} role="status">
          {feedback}
        </p>
      )}
      {discountCodes.length > 0 && (
        <ul className="discount-code-list">
          {discountCodes.map((discount) => (
            <li className={discount.applicable ? 'applicable' : 'not-applicable'} key={discount.code}>
              <span><strong>{discount.code}</strong> · {discount.applicable ? 'Applied' : 'Not applicable'}</span>
              <button
                type="button"
                aria-label={`Remove discount code ${discount.code}`}
                title={`Remove ${discount.code}`}
                disabled={isBusy || isApplying}
                onClick={() => handleRemove(discount.code)}
              >
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
