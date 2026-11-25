import type { Category } from "../types";

export const categories: Category[] = [
  { slug: "rings", name: "Rings", tagline: "", image: "placeholder:Rings", showOnHome: true, banner: "/products/banners/ring_banner.webp" },
  { slug: "earrings", name: "Earrings", tagline: "", image: "placeholder:Earrings", showOnHome: true, banner: "/products/banners/earring_banner.webp" },
  { slug: "necklaces", name: "Necklaces", tagline: "", image: "placeholder:Necklaces", showOnHome: true, banner: "/products/banners/necklace_banner.webp" },
  { slug: "bracelets", name: "Bracelets", tagline: "", image: "placeholder:Bracelets", showOnHome: true, banner: "/products/banners/bracelet_banner.webp" },
  { slug: "bangles-kadas", name: "Bangles & Kadas", tagline: "", image: "placeholder:Bangles", showOnHome: true, banner: "/products/banners/bangles_banner.webp" }
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
