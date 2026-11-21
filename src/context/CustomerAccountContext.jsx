import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  beginCustomerAccountLogin,
  clearCustomerAccountSession,
  completeCustomerAccountLogin,
  endCustomerAccountSession,
  fetchCustomerAccount,
  hasCustomerAccountSession
} from '../lib/customerAccount.js';

const CustomerAccountContext = createContext(null);

export function CustomerAccountProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshAccount = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      if (!hasCustomerAccountSession()) {
        setCustomer(null);
        return;
      }
      setCustomer(await fetchCustomerAccount());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAccount();
  }, [refreshAccount]);

  const login = useCallback(async (returnTo = '/profile') => {
    setError('');
    await beginCustomerAccountLogin(returnTo);
  }, []);

  const completeLogin = useCallback(async (search) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await completeCustomerAccountLogin(search);
      setCustomer(result.customer);
      return result.returnTo;
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setCustomer(null);
    setError('');
    try {
      await endCustomerAccountSession();
    } catch (requestError) {
      setError(`You are signed out of this storefront, but Shopify logout failed: ${requestError.message}`);
    }
  }, []);

  const value = useMemo(() => ({
    customer,
    isAuthenticated: Boolean(customer),
    isLoading,
    error,
    login,
    logout,
    completeLogin,
    refreshAccount,
    clearError: () => setError(''),
    clearSession: clearCustomerAccountSession
  }), [customer, isLoading, error, login, logout, completeLogin, refreshAccount]);

  return <CustomerAccountContext.Provider value={value}>{children}</CustomerAccountContext.Provider>;
}

export function useCustomerAccount() {
  const context = useContext(CustomerAccountContext);
  if (!context) {
    throw new Error('useCustomerAccount must be used within a CustomerAccountProvider.');
  }
  return context;
}
