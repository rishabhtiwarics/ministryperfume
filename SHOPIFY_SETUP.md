# Shopify Storefront API setup

The storefront uses Shopify's Storefront GraphQL API from the browser for the product catalog, product details, menus, homepage banners, and shopping cart. Checkout redirects to Shopify. Static product and banner data remains as a display fallback while requests load or if Shopify is unavailable.

## Configure credentials

1. In Shopify, enable Storefront API access and create a **public Storefront API access token** with permission to read products, collections, menus, and carts. Add `unauthenticated_read_metaobjects` to read homepage banner entries.
2. Copy `.env.example` to `.env.local`.
3. Set `VITE_SHOPIFY_STORE_DOMAIN` to the Shopify store hostname, `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` to the public token, and optionally `VITE_SHOPIFY_API_VERSION`.
4. Restart the Vite dev server after changing environment variables.

The `.env.local` file is ignored by Git. `VITE_` variables are included in browser code, so only use a **public Storefront API token** here—never a client secret, Admin API token, or private Storefront token.

## About Shopify client credentials

The Client ID and Client Secret from a Shopify Dev Dashboard app are **not** Storefront API tokens and must not be added to this Vite app's `VITE_` environment variables. A client secret in browser code would be visible to every site visitor.

Shopify's client-credentials grant is a server-side flow for an app and store in the same Shopify organization. It exchanges the Client ID and Client Secret for an app access token; that token expires after 24 hours. If using this flow, keep both credentials and the resulting token in a trusted backend (for example, Vercel server functions), and have the frontend call that backend. Do not send the secret to the browser.

For a browser-based headless storefront, use the public Storefront API token. A private Storefront token is also distinct from the Client Secret and must only be used server-side.

## Storefront integration

`src/lib/shopify.js` contains Storefront GraphQL helpers for the catalog, menus, banner metaobjects, and cart mutations. The cart ID is kept in browser local storage so Shopify can restore the cart on a later visit. It is not an Admin API credential; treat it as private to the buyer session.

Checkout uses Shopify's returned `checkoutUrl`. Address, shipping, tax, payment, and order completion are handled by Shopify checkout, not by the website's old mock checkout form.

The API version defaults to `2026-10`; Shopify releases API versions quarterly, so update it deliberately when adopting a newer stable version.

Add the same environment variables to the deployment environment (for example, Vercel) before making storefront calls from the deployed site. Environment variable changes require a new build/deployment.

Shopify references: [Storefront API authentication](https://shopify.dev/docs/api/storefront#authentication), [client credentials grant](https://shopify.dev/docs/apps/build/authentication-authorization/client-credentials-grant).
