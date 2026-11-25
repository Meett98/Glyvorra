export type CategorySlug = "rings" | "earrings" | "necklaces" | "bracelets" | "bangles-kadas";

export type Availability = "in-stock" | "low-stock" | "out-of-stock" | "made-to-order";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  /** Cloudinary public id, full URL, or "placeholder:<label>" */
  image: string;
  showOnHome: boolean;
  /** Optional background for the Home category tile */
  banner?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  /** Price in INR. Use null to show "Price on request" */
  price: number | null;
  originalPrice?: number | null;
  description: string;
  /** Cloudinary public ids, full URLs, or "placeholder:<label>" */
  images: string[];
  availability: Availability;
  featured: boolean;
  newArrival: boolean;
  details?: { label: string; value: string }[];
}
