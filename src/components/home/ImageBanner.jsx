import React from 'react';
import { Link } from 'react-router-dom';

export default function ImageBanner({ images = [], mobileImages, banner, className = '' }) {
  const items = banner?.desktopImage
    ? [{ image: banner.desktopImage, mobileImage: banner.mobileImage, altText: banner.altText, href: banner.href }]
    : images.map((image, index) => ({
        image,
        mobileImage: mobileImages?.[index],
        altText: 'Ministry Perfume banner'
      }));
  const classes = ['image-banner', images.length > 1 ? 'split' : '', className].filter(Boolean).join(' ');

  return (
    <section className={classes}>
      {items.map(({ image, mobileImage, altText, href }, index) => {
        const content = (
          <>
            <img src={image} alt={altText} className={mobileImage ? 'desktop-banner-img' : ''} />
            {mobileImage && <img src={mobileImage} alt={altText} className="mobile-banner-img" />}
          </>
        );
        if (!href) return <React.Fragment key={index}>{content}</React.Fragment>;
        if (href.startsWith('/')) return <Link className="image-banner-link" to={href} key={index}>{content}</Link>;
        return <a className="image-banner-link" href={href} key={index}>{content}</a>;
      })}
    </section>
  );
}
