import React from 'react';
import { Link } from 'react-router-dom';
import { brandAssets } from '../../data/products.js';
import { UserPlus } from 'lucide-react';

export default function RegisterForm() {
  return (
    <main className="mp-stage">
      <section className="mp-card">
        <aside className="mp-showcase" aria-label="Selected works">
          <img className="mp-showcase-logo" src={brandAssets.blackLogo} alt="Ministry Perfume Logo" />
        </aside>
        <div className="mp-form-side">
          <div className="mp-hello">
            <div className="mp-hello-icon">
              <UserPlus size={30} strokeWidth={1.8} />
            </div>
            <h1>Register</h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mp-field">
              <label htmlFor="fullname">Full Name</label>
              <div className="mp-input-icon-wrapper">
                <input id="fullname" type="text" placeholder="Enter your full name" />
              </div>
            </div>
            <div className="mp-field">
              <label htmlFor="email">Email</label>
              <div className="mp-input-icon-wrapper">
                <input id="email" type="email" placeholder="Enter your email" autoComplete="email" />
              </div>
            </div>
            <div className="mp-field">
              <label htmlFor="password">Password</label>
              <div className="mp-input-icon-wrapper">
                <input id="password" type="password" placeholder="Create a password" />
              </div>
            </div>
            <button className="mp-login-btn" type="submit" style={{ marginTop: '24px' }}>Create Account</button>
            <Link className="mp-back-home" to="/">Back to Home</Link>
          </form>
          <p className="mp-signup">Already have an account? <Link to="/auth/login">Login</Link></p>
        </div>
      </section>
    </main>
  );
}
