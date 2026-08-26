import React from 'react';
export default function ImageBanner({ images }) {
  return <section className={`image-banner ${images.length > 1 ? 'split' : ''}`}>{images.map((image, index) => <img src={image} alt="Ministry perfume banner" key={index} />)}</section>;
}