import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCustomerAccount } from '../../context/CustomerAccountContext.jsx';

export default function CustomerAccountCallback() {
  const { completeLogin } = useCustomerAccount();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const search = location.search;
    window.history.replaceState(window.history.state, '', location.pathname);

    completeLogin(search)
      .then((returnTo) => navigate(returnTo, { replace: true }))
      .catch((callbackError) => setError(callbackError.message));
  }, [completeLogin, location.pathname, location.search, navigate]);

  return (
    <main className="mp-stage">
      <section className="mp-card account-callback">
        <div className="mp-form-side">
          <h1>{error ? 'Sign-in failed' : 'Signing you in…'}</h1>
          {error
            ? <><p className="shopify-account-error" role="alert">{error}</p><Link className="mp-login-btn" to="/auth/login">Try again</Link></>
            : <p role="status">Connecting to your Shopify account.</p>}
        </div>
      </section>
    </main>
  );
}
