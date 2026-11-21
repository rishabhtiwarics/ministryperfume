export function getProductAvailability(product) {
  if (product.availableForSale === false) return 'sold-out';
  if (product.variantAvailableForSale === false) return 'choose-options';
  if (!product.variantId) return 'loading';
  return 'available';
}

export function cartHasUnavailableItems(items) {
  return items.some((item) => item.availableForSale === false);
}
