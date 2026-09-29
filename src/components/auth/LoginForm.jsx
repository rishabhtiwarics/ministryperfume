import React from 'react';
import { Link } from 'react-router-dom';
import { brandAssets } from '../../data/products.js';
import { UserRound } from 'lucide-react';

export default function LoginForm() {
  return (
    <main className="mp-stage">
      <section className="mp-card">
        <aside className="mp-showcase" aria-label="Selected works">
          <img className="mp-showcase-logo" src={brandAssets.blackLogo} alt="Ministry Perfume Logo" />
        </aside>
        <div className="mp-form-side">
          <div className="mp-hello">
            <div className="mp-hello-icon">
              <UserRound size={30} strokeWidth={1.8} />
            </div>
            <h1>Login</h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mp-field">
              <label htmlFor="email">Email</label>
              <div className="mp-input-icon-wrapper">
                <input id="email" type="email" placeholder="Enter your email" autoComplete="email" />
              </div>
            </div>
            <div className="mp-field">
              <label htmlFor="password">Password</label>
              <div className="mp-input-icon-wrapper">
                <input id="password" type="password" placeholder="Enter your password" autoComplete="current-password" />
              </div>
            </div>
            <Link className="mp-forgot" to="/auth/forgot-password">Forgot password?</Link>
            <div className="mp-or">or</div>
            <button className="mp-google" type="button">Login with Google</button>
            <button className="mp-login-btn" type="submit">Login</button>
            <Link className="mp-back-home" to="/">Back to Home</Link>
          </form>
          <p className="mp-signup">New here? <Link to="/auth/register">Create account</Link></p>
        </div>
      </section>
    </main>
  );
}
