import React, { useState } from 'react';
import { KeyRound, UserPlus, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCustomerAccount } from '../../context/CustomerAccountContext.jsx';
import { brandAssets } from '../../data/products.js';

const accessCopy = {
  login: {
    title: 'Login',
    icon: UserRound,
    description: 'Sign in securely with Shopify to view your account and orders.',
    action: 'Continue to Shopify',
    footer: <>New here? <Link to="/auth/register">Create account</Link></>
  },
  register: {
    title: 'Create account',
    icon: UserPlus,
    description: "Create your Ministry Perfume account through Shopify's secure sign-in.",
    action: 'Continue to Shopify',
    footer: <>Already have an account? <Link to="/auth/login">Login</Link></>
  },
  recovery: {
    title: 'Account recovery',
    icon: KeyRound,
    description: 'Shopify will help you securely access your customer account.',
    action: 'Continue to Shopify',
    footer: <>Remembered your details? <Link to="/auth/login">Back to login</Link></>
  }
};

export default function AccountAccess({ mode = 'login' }) {
  const { login } = useCustomerAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const copy = accessCopy[mode];
  const Icon = copy.icon;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await login('/profile');
    } catch (loginError) {
      setError(loginError.message);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mp-stage">
      <section className="mp-card">
        <aside className="mp-showcase" aria-label="Ministry Perfume">
          <img className="mp-showcase-logo" src={brandAssets.blackLogo} alt="Ministry Perfume Logo" />
        </aside>
        <div className="mp-form-side">
          <div className="mp-hello">
            <div className="mp-hello-icon"><Icon size={30} strokeWidth={1.8} /></div>
            <h1>{copy.title}</h1>
          </div>
          <p>{copy.description}</p>
          {error && <p className="shopify-account-error" role="alert">{error}</p>}
          <form onSubmit={handleSubmit}>
            {mode === 'login' && <Link className="mp-forgot" to="/auth/forgot-password">Forgot password?</Link>}
            <button className="mp-login-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Connecting...' : copy.action}
            </button>
            <Link className="mp-back-home" to="/">Back to Home</Link>
          </form>
          <p className="mp-signup">{copy.footer}</p>
        </div>
      </section>
    </main>
  );
}
