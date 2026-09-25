import React from 'react';
import { Link } from 'react-router-dom';
import { brandAssets } from '../../data/products.js';

export default function InnerBanner({ title }) {
  return (
    <section className="inner-banner">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{title}</span>
        </div>
        <h1>{title}</h1>
      </div>
    </section>
  );
}

