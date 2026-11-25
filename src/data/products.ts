import { inventory } from "./products.inventory";
import { sampleProducts } from "./products.sample";
import type { Product } from "../types";

/** Real inventory wins; samples only show while inventory is empty. */
export const isSampleData = inventory.length === 0;
export const products: Product[] = isSampleData ? sampleProducts : inventory;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const newArrivals = () => products.filter((p) => p.newArrival);
