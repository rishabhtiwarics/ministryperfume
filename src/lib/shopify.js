import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { products as localProducts } from '../data/products.js';

const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2026-10';
const CATALOG_QUERY = `query Catalog($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        handle
        title
        description
        createdAt
        availableForSale
        productType
        tags
        collections(first: 10) {
          edges {
            node {
              handle
              title
            }
          }
        }
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
  collections(first: 50) {
    edges {
      node {
        id
        handle
        title
        image {
          url
          altText
        }
      }
    }
  }
}`;
const MENU_QUERY = `query Menu($handle: String!) {
  menu(handle: $handle) {
    id
    handle
    title
    items {
      id
      title
      type
      url
      resourceId
      items {
        id
        title
        type
        url
        resourceId
      }
    }
  }
}`;
const BANNERS_QUERY = `query StorefrontBanners($first: Int!) {
  metaobjects(type: "storefront_banner", first: $first) {
    nodes {
      id
      handle
      fields {
        key
        value
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
}`;
const CART_FIELDS = `fragment CartFields on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        cost {
          amountPerQuantity {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            product {
              id
              handle
              title
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}`;
const CART_QUERY = `query Cart($id: ID!) {
  cart(id: $id) {
    ...CartFields
  }
}
${CART_FIELDS}`;
const CART_CREATE_MUTATION = `mutation CartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      ...CartFields
    }
    userErrors {
      field
      message
    }
  }
}
${CART_FIELDS}`;
const CART_LINES_ADD_MUTATION = `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFields
    }
    userErrors {
      field
      message
    }
  }
}
${CART_FIELDS}`;
const CART_LINES_UPDATE_MUTATION = `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFields
    }
    userErrors {
      field
      message
    }
  }
}
${CART_FIELDS}`;
const CART_LINES_REMOVE_MUTATION = `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      ...CartFields
    }
    userErrors {
      field
      message
    }
  }
}
${CART_FIELDS}`;

function createShopifyClient() {
  const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.trim();
  const publicAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

  if (!storeDomain || !publicAccessToken) {
    throw new Error(
      'Shopify is not configured. Set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN.'
    );
  }

  const normalizedDomain = storeDomain
    .replace(/^https?:\/\//i, '')
    .replace(/\/+$/, '');

  if (normalizedDomain.includes('/')) {
    throw new Error('VITE_SHOPIFY_STORE_DOMAIN must be a hostname without a path.');
  }

  return createStorefrontApiClient({
    storeDomain: `https://${normalizedDomain}`,
    apiVersion: API_VERSION,
    publicAccessToken,
    clientName: 'ministry-perfume'
  });
}

export async function shopifyGraphql(query, variables = {}) {
  const client = createShopifyClient();
  const { data, errors } = await client.request(query, { variables });

  if (errors) {
    const graphQLErrors = errors.graphQLErrors?.map((error) => error.message).filter(Boolean);
    const details = graphQLErrors?.length
      ? graphQLErrors.join('; ')
      : errors.message || `HTTP ${errors.networkStatusCode || 'unknown'}`;
    throw new Error(`Shopify Storefront API request failed: ${details}`);
  }

  if (!data) {
    throw new Error('Shopify Storefront API returned no data.');
  }

  return data;
}

export async function fetchShopifyCatalog(first = 50) {
  if (!Number.isInteger(first) || first < 1 || first > 250) {
    throw new RangeError('Shopify catalog page size must be an integer from 1 to 250.');
  }

  const data = await shopifyGraphql(CATALOG_QUERY, { first });
  return {
    products: data.products.edges.map(({ node }) => node),
    collections: data.collections.edges.map(({ node }) => node)
  };
}

export function mapShopifyProduct(product) {
  const localProduct = localProducts.find((item) => item.slug === product.handle);
  const variant = product.variants.edges[0]?.node;
  const collections = product.collections?.edges || [];
  const categoryCollection = collections.find(({ node }) => ['men', 'women'].includes(node.handle))?.node;
  const image = product.featuredImage?.url || localProduct?.image || '';
  const tags = product.tags || [];
  const badge = tags.find((tag) => ['New Launch', 'Best Seller', 'Fresh', 'Arrival', 'Loved', 'Luxury'].includes(tag)) || localProduct?.badge || '';

  return {
    id: product.id,
    variantId: variant?.id,
    slug: product.handle,
    name: product.title,
    category: categoryCollection?.title || tags.find((tag) => ['Men', 'Women'].includes(tag)) || product.productType || '',
    price: Number(product.priceRange?.minVariantPrice?.amount ?? variant?.price?.amount ?? localProduct?.price ?? 0),
    currencyCode: product.priceRange?.minVariantPrice?.currencyCode || variant?.price?.currencyCode || 'INR',
    oldPrice: Number(variant?.compareAtPrice?.amount || 0),
    rating: localProduct?.rating ?? 4,
    image,
    images: image ? [image] : [],
    tone: localProduct?.tone || '#bb7736',
    badge,
    description: product.description,
    tags,
    collections: collections.map(({ node }) => node),
    createdAt: product.createdAt,
    availableForSale: product.availableForSale
  };
}

export async function fetchShopifyMenu(handle) {
  if (!handle?.trim()) {
    throw new TypeError('A Shopify menu handle is required.');
  }

  const data = await shopifyGraphql(MENU_QUERY, { handle: handle.trim() });
  if (!data.menu) {
    throw new Error(`Shopify menu "${handle}" was not found.`);
  }
  return data.menu;
}

export async function fetchShopifyBanners(first = 50) {
  if (!Number.isInteger(first) || first < 1 || first > 250) {
    throw new RangeError('Shopify banner page size must be an integer from 1 to 250.');
  }

  const data = await shopifyGraphql(BANNERS_QUERY, { first });
  return data.metaobjects.nodes
    .map(({ id, handle, fields }) => {
      const values = Object.fromEntries(fields.map((field) => [field.key, field]));
      const url = values.link_url?.value?.trim() || '';
      return {
        id,
        handle,
        placement: values.placement?.value?.trim().toLowerCase() || '',
        desktopImage: values.desktop_image?.reference?.image?.url || '',
        mobileImage: values.mobile_image?.reference?.image?.url || '',
        altText: values.alt_text?.value?.trim() || 'Ministry Perfume banner',
        href: url.startsWith('/') ? url : url ? getShopifyMenuHref({ title: '', url }) : '',
        active: values.active?.value?.toLowerCase() !== 'false',
        sortOrder: Number(values.sort_order?.value) || 0
      };
    })
    .filter((banner) => banner.active && banner.placement && banner.desktopImage)
    .sort((firstBanner, secondBanner) => firstBanner.sortOrder - secondBanner.sortOrder);
}

function getCartOrThrow(payload, operation) {
  const errors = payload?.userErrors || [];
  if (errors.length) {
    throw new Error(`Shopify cart ${operation} failed: ${errors.map((error) => error.message).join('; ')}`);
  }
  if (!payload?.cart) {
    throw new Error(`Shopify cart ${operation} returned no cart.`);
  }
  return payload.cart;
}

export async function fetchShopifyCart(id) {
  if (!id?.trim()) throw new TypeError('A Shopify cart ID is required.');
  const data = await shopifyGraphql(CART_QUERY, { id });
  return data.cart;
}

export async function createShopifyCart(variantId, quantity = 1) {
  if (!variantId) throw new TypeError('A Shopify product variant ID is required to create a cart.');
  if (!Number.isInteger(quantity) || quantity < 1) throw new RangeError('Cart quantity must be a positive integer.');
  const data = await shopifyGraphql(CART_CREATE_MUTATION, {
    input: { lines: [{ merchandiseId: variantId, quantity }] }
  });
  return getCartOrThrow(data.cartCreate, 'creation');
}

export async function addShopifyCartLines(cartId, lines) {
  const data = await shopifyGraphql(CART_LINES_ADD_MUTATION, { cartId, lines });
  return getCartOrThrow(data.cartLinesAdd, 'update');
}

export async function updateShopifyCartLines(cartId, lines) {
  const data = await shopifyGraphql(CART_LINES_UPDATE_MUTATION, { cartId, lines });
  return getCartOrThrow(data.cartLinesUpdate, 'update');
}

export async function removeShopifyCartLines(cartId, lineIds) {
  const data = await shopifyGraphql(CART_LINES_REMOVE_MUTATION, { cartId, lineIds });
  return getCartOrThrow(data.cartLinesRemove, 'update');
}

export function getShopifyMenuHref(item) {
  const title = item.title.trim().toLowerCase();
  if (title === 'home') return '/';
  if (title === 'shop' || title === 'all fragrances') return '/shop';
  if (title === 'men') return '/shop?category=Men';
  if (title === 'women') return '/shop?category=Women';

  let pathname;
  try {
    pathname = new URL(item.url).pathname.toLowerCase();
  } catch {
    return item.url;
  }

  const routeByPath = {
    '/about': '/about',
    '/pages/about': '/about',
    '/contact': '/contact',
    '/pages/contact': '/contact',
    '/privacy-policy': '/privacy-policy',
    '/policies/privacy-policy': '/privacy-policy',
    '/terms-condition': '/terms-condition',
    '/policies/terms-of-service': '/terms-condition',
    '/refund-policy': '/refund-policy',
    '/policies/refund-policy': '/refund-policy'
  };

  if (routeByPath[pathname]) return routeByPath[pathname];

  const collectionHandle = pathname.match(/^\/collections\/([^/]+)/)?.[1];
  if (collectionHandle === 'all') return '/shop';
  if (collectionHandle) {
    return `/shop?category=${encodeURIComponent(collectionHandle)}`;
  }

  const productHandle = pathname.match(/^\/products\/([^/]+)/)?.[1];
  if (productHandle) return `/shop/${productHandle}`;

  return item.url;
}
