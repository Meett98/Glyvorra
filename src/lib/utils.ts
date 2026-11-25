import { images, site, whatsapp } from "../config/site";
import type { Availability, Product } from "../types";

export const formatPrice = (price: number | null) =>
  price == null ? "Price on request" : `${site.currency}${price.toLocaleString("en-IN")}`;

export const availabilityLabel: Record<Availability, string> = {
  "in-stock": "In stock",
  "low-stock": "Few left",
  "out-of-stock": "Out of stock",
  "made-to-order": "Made to order",
};

/** Prefix a site-relative path with the deploy base path (e.g. "/repo/" on github.io project sites). */
export const withBase = (src: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${src.replace(/^\.?\//, "")}`;

/** Resolve placeholder / Cloudinary id / URL to a usable image src. */
export function imageUrl(src: string, width = 900): string {
  if (src.startsWith("placeholder:")) {
    const label = src.slice(12).replace(/&/g, "and").replace(/[<>"]/g, "");
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#F2ECE5'/><stop offset='1' stop-color='#E5D5B8'/></linearGradient></defs><rect width='800' height='1000' fill='url(#g)'/><circle cx='400' cy='430' r='110' fill='none' stroke='#C5A46D' stroke-width='3'/><circle cx='400' cy='430' r='70' fill='none' stroke='#C5A46D' stroke-width='1.5'/><text x='400' y='650' text-anchor='middle' font-family='Georgia,serif' font-size='34' fill='#817568'>${label}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
  if (/^https?:\/\//.test(src)) return src;
  if (src.startsWith("/") || src.startsWith("./")) return withBase(src);
  if (images.cloudinaryCloudName) {
    return `https://res.cloudinary.com/${images.cloudinaryCloudName}/image/upload/f_auto,q_auto,w_${width}/${src}`;
  }
  return src;
}

export const siteOrigin = () => site.url || (typeof window !== "undefined" ? window.location.origin : "");

const productUrl = (p: Product) => `${siteOrigin()}${withBase("/product/" + p.slug)}`;

/** Short plain-text meta description from a product description. */
export function productDescription(description: string, name: string): string {
  const text = description.replace(/[\u{1F000}-\u{1FFFF}\u2600-\u27BF\uFE0F•]/gu, "").replace(/\s+/g, " ").trim();
  const summary = text.length > 100 ? `${text.slice(0, 97).replace(/\s+\S*$/, "")}…` : text;
  return `${name} – ${summary} Shop at ${site.name}.`.slice(0, 200);
}

export function productJsonLd(p: Product) {
  const absolute = (src: string) => (/^https?:/.test(src) ? src : `${siteOrigin()}${encodeURI(withBase(src))}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.id,
    description: p.description.replace(/\s+/g, " ").trim(),
    image: p.images.map(absolute),
    brand: { "@type": "Brand", name: site.name },
    category: p.category,
    url: productUrl(p),
    ...(p.price != null && {
      offers: {
        "@type": "Offer",
        url: productUrl(p),
        priceCurrency: "INR",
        price: p.price,
        itemCondition: "https://schema.org/NewCondition",
        availability: p.availability === "out-of-stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      },
    }),
  };
}

export function whatsappLink(p: Product): string {
  const price = p.price == null ? "On request" : `${site.currency}${p.price.toLocaleString("en-IN")}`;
  const text = `${whatsapp.greeting}\n\nProduct: ${p.name}\nPrice: ${price}\nProduct Link: ${productUrl(p)}\n\n${whatsapp.closing}`;
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(text)}`;
}

export function whatsappCartLink(items: { product: Product; quantity: number }[]): string {
  const lines = items.map(({ product, quantity }) => {
    const price = formatPrice(product.price);
    return `${product.name} × ${quantity} — ${price} each\n${productUrl(product)}`;
  });
  const total = items.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0);
  const hasPriceOnRequest = items.some((item) => item.product.price == null);
  const totalLabel = hasPriceOnRequest
    ? `Subtotal for priced items: ${formatPrice(total)} (other prices on request)`
    : `Total: ${formatPrice(total)}`;
  const text = `${whatsapp.greeting}\n\n${lines.join("\n\n")}\n\n${totalLabel}\n\n${whatsapp.closing}`;
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(text)}`;
}

export const whatsappGeneral = (msg = "Hi GLYVORRA! I'd like to know more about your jewellery.") =>
  `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(msg)}`;
