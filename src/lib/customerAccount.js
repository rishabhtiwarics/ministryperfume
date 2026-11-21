const OAUTH_TRANSACTION_KEY = 'ministryPerfumeShopifyAccountOAuth';
const CUSTOMER_TOKEN_KEY = 'ministryPerfumeShopifyCustomerToken';
const CUSTOMER_QUERY = `query CustomerAccountProfile {
  customer {
    id
    displayName
    firstName
    lastName
    emailAddress {
      emailAddress
    }
    orders(first: 10, reverse: true) {
      edges {
        node {
          id
          name
          createdAt
          financialStatus
          fulfillmentStatus
        }
      }
    }
  }
}`;

function getClientId() {
  const clientId = import.meta.env.VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID?.trim();
  if (!clientId) {
    throw new Error('Shopify customer accounts are not configured. Set VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID.');
  }
  return clientId;
}

function getShopDomain() {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.trim();
  if (!domain) {
    throw new Error('Set VITE_SHOPIFY_STORE_DOMAIN to connect Shopify customer accounts.');
  }
  return domain.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
}

function getRedirectUri() {
  return new URL('/auth/callback', window.location.origin).toString();
}

function base64UrlEncode(bytes) {
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function createRandomValue() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return base64UrlEncode(bytes);
}

async function createCodeChallenge(verifier) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return base64UrlEncode(new Uint8Array(digest));
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...options.headers
    }
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error_description || payload?.error || `Shopify request failed (HTTP ${response.status}).`);
  }
  return payload;
}

async function discoverOpenIdConfiguration() {
  const config = await fetchJson(`https://${getShopDomain()}/.well-known/openid-configuration`);
  if (!config.authorization_endpoint || !config.token_endpoint || !config.end_session_endpoint) {
    throw new Error('Shopify returned incomplete customer-account authentication settings.');
  }
  return config;
}

async function discoverCustomerApi() {
  const config = await fetchJson(`https://${getShopDomain()}/.well-known/customer-account-api`);
  if (!config.graphql_api) {
    throw new Error('Shopify did not return a Customer Account API endpoint.');
  }
  return config.graphql_api;
}

export async function beginCustomerAccountLogin(returnTo = '/profile') {
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    throw new Error('Shopify customer account login requires an HTTPS storefront.');
  }
  if (window.location.hostname === 'localhost') {
    throw new Error('Shopify does not allow localhost as a customer-account callback. Open the HTTPS storefront on Vercel to sign in.');
  }

  const clientId = getClientId();
  const config = await discoverOpenIdConfiguration();
  const state = createRandomValue();
  const verifier = createRandomValue();
  const callbackUri = getRedirectUri();
  const safeReturnTo = returnTo.startsWith('/') && !returnTo.startsWith('//') ? returnTo : '/profile';

  window.sessionStorage.setItem(OAUTH_TRANSACTION_KEY, JSON.stringify({
    state,
    verifier,
    callbackUri,
    returnTo: safeReturnTo
  }));

  const authorizationUrl = new URL(config.authorization_endpoint);
  authorizationUrl.searchParams.set('scope', 'openid email customer-account-api:full');
  authorizationUrl.searchParams.set('client_id', clientId);
  authorizationUrl.searchParams.set('response_type', 'code');
  authorizationUrl.searchParams.set('redirect_uri', callbackUri);
  authorizationUrl.searchParams.set('state', state);
  authorizationUrl.searchParams.set('code_challenge', await createCodeChallenge(verifier));
  authorizationUrl.searchParams.set('code_challenge_method', 'S256');

  window.location.assign(authorizationUrl.toString());
}

function readStoredToken() {
  const value = window.sessionStorage.getItem(CUSTOMER_TOKEN_KEY);
  return value ? JSON.parse(value) : null;
}

function saveToken(token) {
  const value = {
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    idToken: token.id_token || token.idToken,
    expiresAt: Date.now() + Number(token.expires_in) * 1000
  };
  window.sessionStorage.setItem(CUSTOMER_TOKEN_KEY, JSON.stringify(value));
  return value;
}

function clearStoredToken() {
  window.sessionStorage.removeItem(CUSTOMER_TOKEN_KEY);
}

async function requestToken(config, parameters) {
  const body = new URLSearchParams(parameters);
  return fetchJson(config.token_endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
}

async function refreshAccessToken(token) {
  if (!token.refreshToken) {
    throw new Error('Your Shopify sign-in has expired. Please sign in again.');
  }
  const config = await discoverOpenIdConfiguration();
  const refreshed = await requestToken(config, {
    grant_type: 'refresh_token',
    client_id: getClientId(),
    refresh_token: token.refreshToken
  });
  return saveToken({
    ...refreshed,
    refresh_token: refreshed.refresh_token || token.refreshToken,
    id_token: refreshed.id_token || token.idToken
  });
}

async function getValidAccessToken() {
  const token = readStoredToken();
  if (!token?.accessToken) {
    throw new Error('Please sign in to your Shopify account.');
  }
  return token.expiresAt > Date.now() + 30_000 ? token : refreshAccessToken(token);
}

async function queryCustomerApi(accessToken) {
  const endpoint = await discoverCustomerApi();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ query: CUSTOMER_QUERY })
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const requestError = new Error(payload?.errors?.map((error) => error.message).join('; ') || `Shopify account request failed (HTTP ${response.status}).`);
    requestError.status = response.status;
    throw requestError;
  }
  if (payload?.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join('; '));
  }
  if (!payload?.data?.customer) {
    throw new Error('Shopify did not return the signed-in customer profile.');
  }
  return {
    ...payload.data.customer,
    email: payload.data.customer.emailAddress?.emailAddress || '',
    orders: payload.data.customer.orders.edges.map(({ node }) => node)
  };
}

export async function fetchCustomerAccount() {
  let token = await getValidAccessToken();
  try {
    return await queryCustomerApi(token.accessToken);
  } catch (error) {
    if (error.status !== 401 || !token.refreshToken) throw error;
    token = await refreshAccessToken(token);
    return queryCustomerApi(token.accessToken);
  }
}

export async function completeCustomerAccountLogin(search) {
  const params = new URLSearchParams(search);
  const transactionValue = window.sessionStorage.getItem(OAUTH_TRANSACTION_KEY);
  window.sessionStorage.removeItem(OAUTH_TRANSACTION_KEY);

  if (params.has('error')) {
    if (params.get('error') === 'access_denied') {
      throw new Error('Shopify sign-in was canceled. Please try again when you are ready.');
    }
    throw new Error(params.get('error_description') || params.get('error'));
  }

  const transaction = transactionValue ? JSON.parse(transactionValue) : null;
  if (!transaction || !params.get('state') || params.get('state') !== transaction.state) {
    throw new Error('Shopify sign-in could not be verified. Please try again.');
  }

  const code = params.get('code');
  if (!code) {
    throw new Error('Shopify did not return a sign-in code. Please try again.');
  }

  const config = await discoverOpenIdConfiguration();
  const token = await requestToken(config, {
    grant_type: 'authorization_code',
    client_id: getClientId(),
    redirect_uri: transaction.callbackUri,
    code,
    code_verifier: transaction.verifier
  });
  if (!token.access_token || !token.expires_in) {
    throw new Error('Shopify returned an incomplete customer sign-in response.');
  }

  saveToken(token);
  const customer = await fetchCustomerAccount();
  return { customer, returnTo: transaction.returnTo };
}

export async function endCustomerAccountSession() {
  const token = readStoredToken();
  clearStoredToken();
  if (!token?.idToken) return;

  const config = await discoverOpenIdConfiguration();
  const logoutUrl = new URL(config.end_session_endpoint);
  logoutUrl.searchParams.set('id_token_hint', token.idToken);
  logoutUrl.searchParams.set('post_logout_redirect_uri', new URL('/', window.location.origin).toString());
  window.location.assign(logoutUrl.toString());
}

export function clearCustomerAccountSession() {
  clearStoredToken();
  window.sessionStorage.removeItem(OAUTH_TRANSACTION_KEY);
}

export function hasCustomerAccountSession() {
  return Boolean(window.sessionStorage.getItem(CUSTOMER_TOKEN_KEY));
}
