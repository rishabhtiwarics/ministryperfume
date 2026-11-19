export const brandAssets = {
  blackLogo: '/ministry-logo-black.png',
  whiteLogo: '/ministry-logo-white.png',
  mainLogo: '/ministry-logo-black.png',
  bottleLine: '/perfume-bottle-lineup.jpeg',
  amberSet: '/amber-perfume-set.jpeg',
  middleBanner1: '/home-promo-banner-desktop-1.jpeg',
  middleBanner2: '/home-promo-banner-desktop-2.png',
  mobileMiddleBanner1: '/home-promo-banner-mobile-1.jpeg',
  mobileMiddleBanner2: '/home-promo-banner-mobile-2.jpg',
  sidebarBannerImg: '/header-sidebar-promo.jpeg',
  shopPageSideBanner: '/shop-sidebar-banner.jpeg',
  shopProductBanner: '/shop-product-banner.jpg',
  videoSectionVideo: '/brand-video.mp4',
  aboutMiddle: '/about-craft-banner.jpeg',
  innerBannerImg: '/inner-banner-desktop.jpeg',
  mobileInnerBannerImg: '/inner-banner-mobile.jpeg',
  whyImg: '/craftsmanship-feature.jpeg',
  founderImg: '/founder-portrait.jpeg'
};

export const categories = [
  { title: 'For Man', image: '/category-men.jpeg', filter: 'Men' },
  { title: 'For Woman', image: '/category-women.jpeg', filter: 'Women' },
  { title: 'Combo Offer', image: '/category-combo.jpeg', filter: 'Combo' },
  { title: 'All Fragrances', image: '/category-all-fragrances.jpeg', filter: 'all' }
];

export const products = [
  { id: 1, slug: 'golden-oud', name: 'Golden Oud Premium', category: 'Oud', price: 549, oldPrice: 3999, rating: 5, image: '/product-golden-oud.jpeg', images: ['/product-golden-oud.jpeg', '/brand-video.mp4', '/product-ocean-veil.jpeg', '/product-velvet-rouge.jpeg', '/perfume-bottle-lineup.jpeg'], tone: '#ed6c06', badge: 'New Launch', description: 'Warm oud, saffron heat, polished woods, and a deep amber trail made for festive evenings.' },
  { id: 2, slug: 'shadow-mist', name: 'Shadow Mist', category: 'Men', price: 899, oldPrice: 1299, rating: 4, image: '/product-shadow-mist.jpeg', images: ['/product-shadow-mist.jpeg', '/brand-video.mp4', '/product-velvet-rouge.jpeg', '/amber-perfume-set.jpeg'], tone: '#bb7736', badge: 'Best Seller', description: 'Smoky spice, dark vanilla, and refined woods with a clean premium finish.' },
  { id: 3, slug: 'ocean-veil', name: 'Ocean Veil', category: 'Fresh', price: 799, oldPrice: 1299, rating: 3.5, image: '/product-ocean-veil.jpeg', images: ['/product-ocean-veil.jpeg', '/brand-video.mp4', '/perfume-bottle-lineup.jpeg'], tone: '#1d375c', badge: 'Fresh', description: 'Citrus lift, aquatic freshness, blue woods, and soft musk for daily wear.' },
  { id: 4, slug: 'velvet-rouge', name: 'Velvet Rouge', category: 'Women', price: 999, oldPrice: 1499, rating: 4.5, image: '/product-velvet-rouge.jpeg', images: ['/product-velvet-rouge.jpeg', '/brand-video.mp4'], tone: '#8e1c12', badge: 'Arrival', description: 'Velvet rose, red fruit, creamy amber, and sandalwood for a graceful signature.' },
  { id: 5, slug: 'jasmine-bliss', name: 'Jasmine Bliss Premium', category: 'Floral', price: 999, oldPrice: 1299, rating: 4, image: '/product-golden-oud.jpeg', images: ['/product-golden-oud.jpeg', '/brand-video.mp4', '/product-shadow-mist.jpeg', '/amber-perfume-set.jpeg', '/header-sidebar-promo.jpeg'], tone: '#bb7736', badge: 'Loved', description: 'Soft jasmine, white musk, and creamy woods with a delicate long lasting trail.' },
  { id: 6, slug: 'luxe-oud', name: 'Luxe Oud Premium', category: 'Luxury', price: 1599, oldPrice: 2999, rating: 5, image: '/product-shadow-mist.jpeg', images: ['/product-shadow-mist.jpeg', '/brand-video.mp4'], tone: '#1d375c', badge: 'Luxury', description: 'Deep resin, rare woods, glowing amber, and a rich gift-ready character.' }
];

export const reels = [
  { productId: 1, video: '/product-reel-1.mp4' },
  { productId: 2, video: '/product-reel-2.mp4' },
  { productId: 3, video: '/product-reel-3.mp4' },
  { productId: 4, video: '/product-reel-1.mp4' },
  { productId: 5, video: '/product-reel-2.mp4' },
  { productId: 6, video: '/product-reel-3.mp4' },
  { productId: 1, video: '/product-reel-1.mp4' },
  { productId: 2, video: '/product-reel-2.mp4' }
];

export const testimonials = [
  { name: 'Ayesha Khan', text: 'Golden Oud feels premium from the first spray. Projection is strong and the bottle looks elegant.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=85' },
  { name: 'Rahul Mehta', text: 'Ocean Veil became my daily office fragrance. Clean, fresh, and never too loud.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85' },
  { name: 'Sana Ali', text: 'The combo pack made a beautiful gift. Packaging and fragrance both felt luxurious.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=85' }
];
