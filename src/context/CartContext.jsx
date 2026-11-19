import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  addShopifyCartLines,
  createShopifyCart,
  fetchShopifyCart,
  removeShopifyCartLines,
  updateShopifyCartLines
} from '../lib/shopify.js';

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
      await mutation();
      return true;
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
    if (!product.variantId) {
      throw new Error('This product is not ready to add to your Shopify cart yet. Please wait for Shopify product data to load.');
    }
    if (product.availableForSale === false) {
      throw new Error(`${product.name} is currently unavailable.`);
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
    const nextCart = quantity < 1
      ? await removeShopifyCartLines(currentCart.id, [lineId])
      : await updateShopifyCartLines(currentCart.id, [{ id: lineId, quantity }]);
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
    inCart
  }), [cart, isCartOpen, isLoading, isBusy, error, addToCart, removeFromCart, updateQuantity, inCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
