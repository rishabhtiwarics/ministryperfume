# Shopify Storefront API setup

The storefront uses Shopify's Storefront GraphQL API from the browser for the product catalog, product details, menus, homepage banners, and shopping cart. Checkout redirects to Shopify. Static product and banner data remains as a display fallback while requests load or if Shopify is unavailable.

## Configure credentials

1. In Shopify, enable Storefront API access and create a **public Storefront API access token** with permission to read products, collections, menus, and carts. Add `unauthenticated_read_metaobjects` to read homepage banner entries.
2. Copy `.env.example` to `.env.local`.
3. Set `VITE_SHOPIFY_STORE_DOMAIN` to the Shopify store hostname, `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` to the public token, and optionally `VITE_SHOPIFY_API_VERSION`.
4. Restart the Vite dev server after changing environment variables.

The `.env.local` file is ignored by Git. `VITE_` variables are included in browser code, so only use a **public Storefront API token** here—never a client secret, Admin API token, or private Storefront token.

## Customer accounts

The storefront uses Shopify's Customer Account API with OAuth 2.0 authorization code flow and PKCE. In Shopify, enable new customer accounts, install the Headless sales channel, add this storefront, and configure a public client. Register these application URLs (and the equivalent URLs for any other deployed environment):

- JavaScript origin: `https://ministry-perfume.vercel.app`
- Callback URL: `https://ministry-perfume.vercel.app/auth/callback`
- Logout URL: `https://ministry-perfume.vercel.app/`

Set `VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID` to the public client ID from the Headless channel. The login request asks Shopify for `openid email customer-account-api:full`; these scopes are requested by the app and aren't separate values to add to `.env.local`. Shopify handles authentication, account creation, and account recovery. The site uses the Customer Account API to show the signed-in customer's profile and recent orders.

The public client ID is safe to include in browser code. Never use a confidential client or expose a client secret in a `VITE_` variable. Customer tokens are kept in `sessionStorage` for the current browser tab. Shopify requires HTTPS callback URLs; localhost can't be used for this login flow. After changing environment variables in Vercel, redeploy the site.

## About Shopify client credentials

The Client ID and Client Secret from a Shopify Dev Dashboard app are **not** Storefront API tokens. Never put a client secret in this Vite app's `VITE_` environment variables because browser code is visible to every site visitor. The separate public Customer Account API client ID from the Headless sales channel is intended for browser use and belongs in `VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID`.

Shopify's client-credentials grant is a server-side flow for an app and store in the same Shopify organization. It exchanges the Client ID and Client Secret for an app access token; that token expires after 24 hours. If using this flow, keep both credentials and the resulting token in a trusted backend (for example, Vercel server functions), and have the frontend call that backend. Do not send the secret to the browser.

For a browser-based headless storefront, use the public Storefront API token. A private Storefront token is also distinct from the Client Secret and must only be used server-side.

## Storefront integration

`src/lib/shopify.js` contains Storefront GraphQL helpers for the catalog, menus, banner metaobjects, and cart mutations. The cart ID is kept in browser local storage so Shopify can restore the cart on a later visit. It is not an Admin API credential; treat it as private to the buyer session.

Checkout uses Shopify's returned `checkoutUrl`. Address, shipping, tax, payment, and order completion are handled by Shopify checkout, not by the website's old mock checkout form.

The cart drawer and cart page let customers apply multiple Shopify discount codes. Shopify validates each code against the current cart, and the cart's updated total and checkout URL are refreshed from Shopify. Invalid or currently inapplicable codes are labeled as such and can be removed; discount rules and code creation remain managed in Shopify Admin.

Shop search and filters use the mapped Shopify catalog. The desktop hover search suggestions, product-name/tag search, category collection filters, status, availability, price, and sorting stay synchronized with Shopify products. Local catalog data remains as a fallback when Shopify is unavailable.

Product detail pages fetch all Shopify variants and option values for the selected product. Customers can choose available option combinations; the selected variant's price, availability, and variant ID are used for cart and checkout. Add product options and variants in Shopify Admin to expose selectors; products with only Shopify's default variant keep the existing single-price layout.

The API version defaults to `2026-10`; Shopify releases API versions quarterly, so update it deliberately when adopting a newer stable version.

Add the same environment variables to the deployment environment (for example, Vercel) before making storefront calls from the deployed site. Environment variable changes require a new build/deployment.

Shopify references: [Storefront API authentication](https://shopify.dev/docs/api/storefront#authentication), [Customer Account API setup](https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/getting-started), [Customer Account API authorization](https://shopify.dev/docs/api/customer#authorization), [client credentials grant](https://shopify.dev/docs/apps/build/authentication-authorization/client-credentials-grant).
