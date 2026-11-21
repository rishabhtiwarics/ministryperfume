import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, UserRound } from 'lucide-react';
import InnerBanner from '../components/common/InnerBanner.jsx';
import { useCustomerAccount } from '../context/CustomerAccountContext.jsx';

export default function Profile() {
  const { customer, isAuthenticated, isLoading, error, logout, clearError } = useCustomerAccount();

  return (
    <>
      <InnerBanner eyebrow="My Account" title="My Account" paragraph="View your Ministry Perfume profile and order history." />
      <section className="page-section container customer-account-page">
        {error && <p className="shopify-account-error" role="alert">{error}<button type="button" onClick={clearError}>Dismiss</button></p>}
        {isLoading ? (
          <p role="status">Loading your Shopify account...</p>
        ) : !isAuthenticated ? (
          <div className="customer-account-empty">
            <UserRound size={32} />
            <h2>Sign in to your account</h2>
            <p>Access your profile and Shopify order history.</p>
            <Link className="primary-btn" to="/auth/login">Login or create account</Link>
          </div>
        ) : (
          <>
            <div className="customer-account-heading">
              <div>
                <span className="eyebrow">Customer account</span>
                <h2>Welcome, {customer.displayName}</h2>
                <p>{customer.email}</p>
              </div>
              <button className="light-btn" type="button" onClick={logout}><LogOut size={17} /> Sign out</button>
            </div>
            <section className="customer-orders" aria-labelledby="customer-orders-title">
              <h2 id="customer-orders-title">Your orders</h2>
              {customer.orders.length ? (
                <div className="customer-order-list">
                  {customer.orders.map((order) => (
                    <article className="customer-order" key={order.id}>
                      <div>
                        <strong>{order.name}</strong>
                        <span>Placed {new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="customer-order-status">
                        <span>{order.financialStatus || 'Payment status unavailable'}</span>
                        <span>{order.fulfillmentStatus || 'Unfulfilled'}</span>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p>You don't have any orders yet. <Link to="/shop">Explore fragrances</Link>.</p>
              )}
            </section>
          </>
        )}
      </section>
    </>
  );
}
