import React from 'react';

export default function ImageBanner({ images, mobileImages, className = '' }) {
  const classes = ['image-banner', images.length > 1 ? 'split' : '', className].filter(Boolean).join(' ');

  return (
    <section className={classes}>
      {images.map((image, index) => {
        const mobileImg = mobileImages && mobileImages[index];
        return (
          <React.Fragment key={index}>
            <img
              src={image}
              alt="Ministry Perfume banner"
              className={mobileImg ? 'desktop-banner-img' : ''}
            />
            {mobileImg && (
              <img
                src={mobileImg}
                alt="Ministry Perfume mobile banner"
                className="mobile-banner-img"
              />
            )}
          </React.Fragment>
        );
      })}
    </section>
  );
}
