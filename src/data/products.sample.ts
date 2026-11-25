import type { Product } from "../types";

/**
 * SAMPLE DATA – for demonstration only.
 * Prices are null and availability is "made-to-order" so no real price/stock is implied.
 * Delete this file's usage by adding real items to products.inventory.ts.
 */
const base = (
  n: number,
  slug: string,
  name: string,
  category: Product["category"],
  description: string,
  flags: Partial<Pick<Product, "featured" | "newArrival">> = {}
): Product => ({
  id: `sample-${n}`,
  slug,
  name,
  category,
  price: null,
  description,
  images: [`placeholder:${name}`, `placeholder:${name} detail`, `placeholder:${name} worn`],
  availability: "made-to-order",
  featured: false,
  newArrival: false,
  details: [
    { label: "Material", value: "Gold plated stainless steel" },
    { label: "Finish", value: "Anti-tarnish" },
  ],
  ...flags,
});

export const sampleProducts: Product[] = [
  base(1, "sample-solitaire-ring", "Sample Solitaire Ring", "rings", "A sample listing to preview the layout.", { featured: true, newArrival: true }),
  base(2, "sample-band-ring", "Sample Band Ring", "rings", "A sample listing to preview the layout.", { newArrival: true }),
  base(3, "sample-stud-earrings", "Sample Stud Earrings", "earrings", "A sample listing to preview the layout.", { featured: true, newArrival: true }),
  base(4, "sample-hoop-earrings", "Sample Hoop Earrings", "earrings", "A sample listing to preview the layout.", { newArrival: true }),
  base(5, "sample-pendant-necklace", "Sample Pendant Necklace", "necklaces", "A sample listing to preview the layout.", { featured: true, newArrival: true }),
  base(6, "sample-chain-necklace", "Sample Chain Necklace", "necklaces", "A sample listing to preview the layout."),
  base(7, "sample-chain-bracelet", "Sample Chain Bracelet", "bracelets", "A sample listing to preview the layout.", { newArrival: true }),
  base(8, "sample-kada", "Sample Kada", "bangles-kadas", "A sample listing to preview the layout.", { featured: true })
];
