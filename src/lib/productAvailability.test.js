// Runtime validation coverage for Shopify product and cart availability.
import { describe, expect, it } from 'vitest';
import { cartHasUnavailableItems, getProductAvailability } from './productAvailability.js';

describe('product availability', () => {
  it('marks a product sold out when Shopify says it cannot be sold', () => {
    expect(getProductAvailability({ availableForSale: false, variantId: 'variant-1' })).toBe('sold-out');
  });

  it('requires option selection when the catalog variant is unavailable but the product is not', () => {
    expect(getProductAvailability({
      availableForSale: true,
      variantAvailableForSale: false,
      variantId: 'variant-1'
    })).toBe('choose-options');
  });

  it('keeps products without a Shopify variant in a loading state', () => {
    expect(getProductAvailability({ availableForSale: true })).toBe('loading');
  });

  it('blocks checkout when any cart line is unavailable', () => {
    expect(cartHasUnavailableItems([
      { availableForSale: true },
      { availableForSale: false }
    ])).toBe(true);
    expect(cartHasUnavailableItems([{ availableForSale: true }])).toBe(false);
  });
});
