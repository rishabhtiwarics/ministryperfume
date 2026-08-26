import React from 'react';
import InnerBanner from '../components/common/InnerBanner.jsx';
import { brandAssets } from '../data/products.js';

export default function About() {
  return <><InnerBanner eyebrow="About Ministry" title="About" paragraph="Premium perfume crafted around memorable notes, elegant bottles, and modern gifting." /><section className="page-section container two-col"><img src={brandAssets.bottleLine} alt="Ministry perfume bottles" /><div><span className="eyebrow">Smell Like Nothing Else</span><h2>Fragrance with a confident signature</h2><p>Ministry blends warm oud, bright florals, fresh aquatic notes, and refined amber into perfumes that feel premium from bottle to dry down.</p><p>Every bottle is designed for daily wear, celebration, and gifting with a clean luxury look.</p></div></section></>;
}
