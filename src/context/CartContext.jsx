import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  addShopifyCartLines,
  createShopifyCart,
  fetchShopifyCart,
  removeShopifyCartLines,
  updateShopifyCartDiscountCodes,
  updateShopifyCartLines
} from '../lib/shopify.js';
import { cartHasUnavailableItems, getProductAvailability } from '../lib/productAvailability.js';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'ministryPerfumeShopifyCartId';

function mapShopifyCart(cart) {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    count: cart.totalQuantity,
    subtotal: Number(cart.cost.subtotalAmount.amount),
    total: Number(cart.cost.totalAmount.amount),
    currencyCode: cart.cost.subtotalAmount.currencyCode,
    discountCodes: cart.discountCodes || [],
    items: cart.lines.edges.map(({ node }) => {
      const variant = node.merchandise;
      return {
        id: variant.product.id,
        lineId: node.id,
        productId: variant.product.id,
        variantId: variant.id,
        slug: variant.product.handle,
        name: variant.product.title,
        image: variant.product.featuredImage?.url || '',
        imageAlt: variant.product.featuredImage?.altText || variant.product.title,
        price: Number(node.cost.amountPerQuantity.amount),
        currencyCode: node.cost.amountPerQuantity.currencyCode,
        quantity: node.quantity,
        availableForSale: variant.availableForSale
      };
    })
  };
}

export function formatMoney(amount, currencyCode = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const cartRef = useRef(null);
  const mutationInProgress = useRef(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');

  const saveCart = useCallback((shopifyCart) => {
    const nextCart = mapShopifyCart(shopifyCart);
    cartRef.current = nextCart;
    setCart(nextCart);

    if (nextCart.items.length) {
      window.localStorage.setItem(CART_STORAGE_KEY, nextCart.id);
    } else {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const restoreCart = async () => {
      try {
        const cartId = window.localStorage.getItem(CART_STORAGE_KEY);
        if (!cartId) return;
        const shopifyCart = await fetchShopifyCart(cartId);
        if (!active) return;
        if (shopifyCart) {
          const restoredCart = mapShopifyCart(shopifyCart);
          cartRef.current = restoredCart;
          setCart(restoredCart);
        } else {
          window.localStorage.removeItem(CART_STORAGE_KEY);
        }
      } catch (restoreError) {
        if (active) setError(`Could not restore your Shopify cart: ${restoreError.message}`);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    restoreCart();
    return () => {
      active = false;
    };
  }, []);

  const runMutation = useCallback(async (mutation) => {
    if (isLoading) {
      setError('Your Shopify cart is still loading. Please try again in a moment.');
      return false;
    }
    if (mutationInProgress.current) return false;
    mutationInProgress.current = true;
    setIsBusy(true);
    setError('');

    try {
      const result = await mutation();
      return result === undefined ? true : result;
    } catch (mutationError) {
      setError(mutationError.message);
      setIsCartOpen(true);
      return false;
    } finally {
      mutationInProgress.current = false;
      setIsBusy(false);
    }
  }, [isLoading]);

  const addToCart = useCallback((product, quantity = 1) => runMutation(async () => {
    const availability = getProductAvailability(product);
    if (availability === 'loading') {
      throw new Error('This product is not ready to add to your Shopify cart yet. Please wait for Shopify product data to load.');
    }
    if (availability === 'sold-out') {
      throw new Error(`${product.name} is currently unavailable.`);
    }
    if (availability === 'choose-options') {
      throw new Error(`The selected option for ${product.name} is currently unavailable.`);
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new RangeError('Cart quantity must be a positive integer.');
    }

    const currentCart = cartRef.current;
    const nextCart = currentCart
      ? await addShopifyCartLines(currentCart.id, [{ merchandiseId: product.variantId, quantity }])
      : await createShopifyCart(product.variantId, quantity);
    saveCart(nextCart);
    setIsCartOpen(true);
  }), [runMutation, saveCart]);

  const removeFromCart = useCallback((lineId) => runMutation(async () => {
    const currentCart = cartRef.current;
    if (!currentCart) throw new Error('There is no active Shopify cart.');
    const nextCart = await removeShopifyCartLines(currentCart.id, [lineId]);
    saveCart(nextCart);
  }), [runMutation, saveCart]);

  const updateQuantity = useCallback((lineId, quantity) => runMutation(async () => {
    const currentCart = cartRef.current;
    if (!currentCart) throw new Error('There is no active Shopify cart.');
    const item = currentCart.items.find((cartItem) => cartItem.lineId === lineId);
    if (quantity > (item?.quantity || 0) && item?.availableForSale === false) {
      throw new Error(`${item.name} is sold out and cannot be increased.`);
    }
    const nextCart = quantity < 1
      ? await removeShopifyCartLines(currentCart.id, [lineId])
      : await updateShopifyCartLines(currentCart.id, [{ id: lineId, quantity }]);
    saveCart(nextCart);
  }), [runMutation, saveCart]);

  const applyDiscountCode = useCallback((code) => runMutation(async () => {
    const normalizedCode = code.trim();
    if (!normalizedCode) throw new TypeError('Enter a discount code to apply.');
    const currentCart = cartRef.current;
    if (!currentCart) throw new Error('Add an item to your Shopify cart before applying a discount code.');
    const existingCodes = currentCart.discountCodes.map(({ code: existingCode }) => existingCode);
    const codes = existingCodes.some((existingCode) => existingCode.toLowerCase() === normalizedCode.toLowerCase())
      ? existingCodes
      : [...existingCodes, normalizedCode];
    const nextCart = await updateShopifyCartDiscountCodes(currentCart.id, codes);
    saveCart(nextCart);
    const applicable = nextCart.discountCodes.some((discount) =>
      discount.code.toLowerCase() === normalizedCode.toLowerCase() && discount.applicable
    );
    return applicable ? 'applied' : 'invalid';
  }), [runMutation, saveCart]);

  const removeDiscountCode = useCallback((code) => runMutation(async () => {
    const currentCart = cartRef.current;
    if (!currentCart) throw new Error('There is no active Shopify cart.');
    const remainingCodes = currentCart.discountCodes
      .filter((discount) => discount.code.toLowerCase() !== code.toLowerCase())
      .map((discount) => discount.code);
    const nextCart = await updateShopifyCartDiscountCodes(currentCart.id, remainingCodes);
    saveCart(nextCart);
  }), [runMutation, saveCart]);

  const inCart = useCallback((productId) => Boolean(
    cart?.items.some((item) => item.productId === productId || item.variantId === productId)
  ), [cart]);

  const value = useMemo(() => ({
    items: cart?.items || [],
    count: cart?.count || 0,
    subtotal: cart?.subtotal || 0,
    total: cart?.total || 0,
    currencyCode: cart?.currencyCode || 'INR',
    discountCodes: cart?.discountCodes || [],
    hasUnavailableItems: cartHasUnavailableItems(cart?.items || []),
    checkoutUrl: cart?.checkoutUrl || '',
    isCartOpen,
    setIsCartOpen,
    isLoading,
    isBusy,
    error,
    clearError: () => setError(''),
    addToCart,
    removeFromCart,
    updateQuantity,
    applyDiscountCode,
    removeDiscountCode,
    inCart
  }), [cart, isCartOpen, isLoading, isBusy, error, addToCart, removeFromCart, updateQuantity, applyDiscountCode, removeDiscountCode, inCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
