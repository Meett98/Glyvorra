import type { Product } from "../types";
import { categories } from "./categories";
import rawProducts from "./products.json";

interface RawProduct {
  id: string;
  name: string;
  category: string;
  price: number | null;
  originalPrice?: number | null;
  description: string;
  images: string[];
  available: boolean;
}

const toSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const toProduct = (raw: RawProduct): Product => {
  const category = categories.find((c) => c.name.toLowerCase() === raw.category.toLowerCase());
  if (!category) throw new Error(`products.json: unknown category "${raw.category}" on ${raw.id}`);
  return {
    id: raw.id,
    slug: toSlug(raw.name),
    name: raw.name,
    category: category.slug,
    price: raw.price,
    originalPrice: raw.originalPrice,
    description: raw.description,
    images: raw.images,
    availability: raw.available ? "in-stock" : "out-of-stock",
    featured: false,
    newArrival: true,
  };
};

/**
 * ACTUAL INVENTORY – edit src/data/products.json.
 * Leave that file as [] to show sample products (see products.sample.ts).
 */
export const inventory: Product[] = (rawProducts as RawProduct[]).map(toProduct);
