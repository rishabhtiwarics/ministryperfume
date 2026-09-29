import React from 'react';
import { Link } from 'react-router-dom';
import { brandAssets } from '../../data/products.js';
import { KeyRound } from 'lucide-react';

export default function ForgotPasswordForm() {
  return (
    <main className="mp-stage">
      <section className="mp-card">
        <aside className="mp-showcase" aria-label="Selected works">
          <img className="mp-showcase-logo" src={brandAssets.blackLogo} alt="Ministry Perfume Logo" />
        </aside>
        <div className="mp-form-side">
          <div className="mp-hello">
            <div className="mp-hello-icon">
              <KeyRound size={30} strokeWidth={1.8} />
            </div>
            <h1>Forgot Password</h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mp-field">
              <label htmlFor="email">Email</label>
              <div className="mp-input-icon-wrapper">
                <input id="email" type="email" placeholder="Enter your email" autoComplete="email" />
              </div>
            </div>
            <button className="mp-login-btn" type="submit" style={{ marginTop: '24px' }}>Send Reset Link</button>
            <Link className="mp-back-home" to="/auth/login">Back to Login</Link>
          </form>
          <p className="mp-signup">Don't have an account? <Link to="/auth/register">Sign up</Link></p>
        </div>
      </section>
    </main>
  );
}
