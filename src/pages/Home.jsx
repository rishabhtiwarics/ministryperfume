import React, { useEffect, useMemo, useState } from 'react';
import HeroSlider from '../components/home/HeroSlider.jsx';
import FeaturedCategories from '../components/home/FeaturedCategories.jsx';
import FavouriteReels from '../components/home/FavouriteReels.jsx';
import ProductSection from '../components/home/ProductSection.jsx';
import ImageBanner from '../components/home/ImageBanner.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import BenefitsStrip from '../components/home/BenefitsStrip.jsx';
import SocialMarquee from '../components/home/SocialMarquee.jsx';
import VideoSection from '../components/home/VideoSection.jsx';
import { brandAssets, products as localProducts } from '../data/products.js';
import { fetchShopifyBanners, fetchShopifyCatalog, mapShopifyProduct } from '../lib/shopify.js';

export default function Home() {
  const [catalog, setCatalog] = useState(null);
  const [catalogError, setCatalogError] = useState('');
  const [banners, setBanners] = useState(null);
  const [bannerError, setBannerError] = useState('');

  useEffect(() => {
    let active = true;
    fetchShopifyCatalog()
      .then((result) => {
        if (active) setCatalog(result);
      })
      .catch((error) => {
        if (active) setCatalogError(error.message);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    fetchShopifyBanners()
      .then((result) => {
        if (active) setBanners(result);
      })
      .catch((error) => {
        if (active) setBannerError(error.message);
      });

    return () => {
      active = false;
    };
  }, []);

  const products = useMemo(() => catalog?.products.map(mapShopifyProduct) || localProducts, [catalog]);
  const featuredProducts = useMemo(() => (
    catalog
      ? products.filter((product) => product.collections.some((collection) => collection.handle === 'frontpage'))
      : products.slice(0, 4)
  ), [catalog, products]);
  const bestSellers = useMemo(() => (
    catalog
      ? products.filter((product) => product.tags.some((tag) => tag.toLowerCase() === 'best seller'))
      : products.filter((product) => product.badge === 'Best Seller')
  ), [catalog, products]);
  const newArrivals = useMemo(() => (
    catalog
      ? products.filter((product) => product.tags.some((tag) => tag.toLowerCase() === 'new launch'))
      : products.filter((product) => product.badge === 'New Launch')
  ), [catalog, products]);
  const heroBanners = banners?.filter((banner) => banner.placement === 'hero');
  const firstPromoBanner = banners?.find((banner) => banner.placement === 'home-promo-1');
  const secondPromoBanner = banners?.find((banner) => banner.placement === 'home-promo-2');

  return (
    <>
      {bannerError && <p className="shop-empty" role="status">Showing saved banners because Shopify could not be reached: {bannerError}</p>}
      <HeroSlider banners={heroBanners} />
      <FeaturedCategories collections={catalog?.collections} />
      <FavouriteReels />
      {catalogError && <p className="shop-empty" role="status">Showing saved homepage products because Shopify could not be reached: {catalogError}</p>}
      {featuredProducts.length > 0 && <ProductSection eyebrow="Featured Collection" title="Featured Fragrances" products={featuredProducts} variant="slider" />}
      <ProductSection eyebrow="Customer Choice" title="Best Seller" products={bestSellers} variant="seller" bottomAction />
      <ImageBanner banner={firstPromoBanner} images={[brandAssets.middleBanner1]} mobileImages={[brandAssets.mobileMiddleBanner1]} className="middle-banner" />
      <ProductSection eyebrow="Just Arrived" title="New Arrivals" products={newArrivals} variant="arrival" />
      <ImageBanner banner={secondPromoBanner} images={[brandAssets.middleBanner2]} mobileImages={[brandAssets.mobileMiddleBanner2]} className="middle-banner" />
      <BenefitsStrip />
      <Testimonials />
      <SocialMarquee />
      <VideoSection />
    </>
  );
}
