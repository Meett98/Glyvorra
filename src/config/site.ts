/**
 * ONE place for all business configuration.
 * Edit this file – no UI component contains business data.
 */
const env = import.meta.env;

export const site = {
  name: "GLYVORRA",
  tagline: "Timeless Elegance",
  description:
    "GLYVORRA – premium gold plated anti-tarnish stainless steel jewellery from India. Rings, earrings, necklaces, bracelets, bangles and more.",
  /** Home page <title> – keyword-rich for search */
  homeTitle: "GLYVORRA – Gold Plated Anti-Tarnish Jewellery Online in India",
  /** Public site URL (used for product links in WhatsApp + SEO). Leave "" to use the current origin. */
  url: env.VITE_SITE_URL ?? "",
  ogImage: "/products/banners/our_story.webp",
  currency: "₹",
};

export const whatsapp = {
  /** Country code + number, digits only. e.g. India: "91XXXXXXXXXX". */
  number: env.VITE_WHATSAPP_NUMBER ?? "",
  greeting: "Hi GLYVORRA! I'm interested in ordering:",
  closing: "Please share the ordering details.",
};

export const contact = {
  email: env.VITE_CONTACT_EMAIL ?? "",
  phone: env.VITE_CONTACT_PHONE ?? "",
  address: "India",
  hours: "Mon – Sat, 10:00 AM – 7:00 PM",
};

export const social = {
  instagramHandle: env.VITE_INSTAGRAM_HANDLE ?? "",
  instagramUrl: env.VITE_INSTAGRAM_URL ?? "",
};

export const announcement = {
  enabled: true,
  messages: ["New arrivals are here", "Gold plated · Anti-tarnish · Stainless steel"],
  mobileMessages: ["New arrivals are here", "Anti-tarnish", "Gold plated", "Stainless steel"],
  /** Set to a string like "Free shipping on orders above ₹999" to show; leave null to hide */
  shippingNote: null as string | null,
};

export const promo = {
  enabled: true,
  eyebrow: "New Collection",
  title: "The Signature Edit",
  text: "Discover our latest pieces, crafted to be worn every day.",
  ctaLabel: "Shop New Arrivals",
  ctaLink: "/shop?filter=new",
  image: "/products/banners/Signature_Edit.webp",
};

/** Cloudinary: set your cloud name to enable optimized (WebP/AVIF, resized) delivery of public ids. */
export const images = {
  cloudinaryCloudName: env.VITE_CLOUDINARY_CLOUD_NAME ?? "",
};

export const instagramGrid = [
  { image: "./products/reels/reel1_banner.webp", url: "https://www.instagram.com/reels/DeL3-9Js2zv/" },
  { image: "./products/reels/reel2_banner.webp", url: "https://www.instagram.com/reel/Dd_Yo2yhex5/" },
  { image: "./products/reels/reel3_banner.webp", url: "https://www.instagram.com/reel/Dd5Rn7DMSId/" },
  { image: "./products/reels/reel4_banner.webp", url: "https://www.instagram.com/reel/Dd0Il19sOXC/" },
  { image: "./products/reels/reel5_banner.webp", url: "https://www.instagram.com/reel/DdDo5RYhUVj/" },
  { image: "./products/reels/reel6_banner.webp", url: "https://www.instagram.com/reel/Dc44optBwkN/" },
];

export const story = {
  heading: "Beauty in Every Little Detail.",
  body: [
    "GLYVORRA was born from a vision to make everyday elegance accessible to every woman.",
    "We believe beautiful jewellery shouldn't come with an extravagant price tag. Every woman deserves to feel confident, stylish and special, whether she's dressing up for a celebration, heading to work, enjoying a casual day out or simply adding a little sparkle to her everyday look.",
    "Our vision is to bring together affordability, quality and distinctive designs, creating jewellery that goes beyond trends. From timeless classics to fresh, unconventional styles, we aspire to introduce designs that feel unique, expressive and unlike anything you've seen before.",
    "At GLYVORRA, we want jewellery to be more than an accessory. We want it to be a part of your everyday expression — something you can effortlessly style, cherish and wear on every occasion.",
    "Our journey has just begun, and our dream is to make timeless, affordable elegance a part of every woman's world.",
  ],
};
