// Runs after `vite build`: writes sitemap.xml and a static HTML entry per route with
// its own <title>, description, canonical, Open Graph tags and JSON-LD, so crawlers
// and social previews get correct metadata without running JavaScript.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const siteSource = await readFile(path.join(root, "src/config/site.ts"), "utf8");
const origin = loadEnv("production", root, "VITE_").VITE_SITE_URL?.replace(/\/$/, "");
if (!origin) throw new Error("VITE_SITE_URL must be set (.env or host environment) for SEO output.");

const base = (loadEnv("production", root, "VITE_").VITE_BASE_PATH || "/").replace(/\/$/, "");
const siteName = "GLYVORRA";
const homeTitle = siteSource.match(/homeTitle:\s*"([^"]+)"/)?.[1] ?? siteName;
const products = JSON.parse(await readFile(path.join(root, "src/data/products.json"), "utf8"));

const esc = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const toSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const absolute = (src) => (/^https?:/.test(src) ? src : `${origin}${encodeURI(`${base}${src}`)}`);

function productDescription(description, name) {
  const text = description.replace(/[\u{1F000}-\u{1FFFF}\u2600-\u27BF\uFE0F•]/gu, "").replace(/\s+/g, " ").trim();
  const summary = text.length > 100 ? `${text.slice(0, 97).replace(/\s+\S*$/, "")}…` : text;
  return `${name} – ${summary} Shop at ${siteName}.`.slice(0, 200);
}

const defaultImage = "/products/banners/our_story.webp";
const staticRoutes = [
  { path: "/", title: homeTitle, description: "Shop GLYVORRA's gold plated, anti-tarnish stainless steel jewellery online in India – rings, earrings, necklaces, bracelets and bangles. Affordable everyday elegance.", priority: "1.0" },
  { path: "/shop", title: `Shop | ${siteName}`, description: "Shop gold plated, anti-tarnish jewellery online in India – necklaces, earrings, rings, bracelets and bangles from GLYVORRA.", priority: "0.9" },
  { path: "/collections", title: `Collections | ${siteName}`, description: "Explore GLYVORRA collections – gold plated, anti-tarnish rings, earrings, necklaces, bracelets and bangles & kadas.", priority: "0.8" },
  { path: "/about", title: `About Us | ${siteName}`, description: "The story behind GLYVORRA – elegant, timeless and accessible jewellery from India.", priority: "0.6" },
  { path: "/contact", title: `Contact | ${siteName}`, description: "Get in touch with GLYVORRA on WhatsApp, Instagram or email.", priority: "0.5" },
  { path: "/privacy-policy", title: `Privacy Policy | ${siteName}`, description: "GLYVORRA privacy policy.", priority: "0.2" },
  { path: "/terms", title: `Terms & Conditions | ${siteName}`, description: "GLYVORRA terms and conditions.", priority: "0.2" },
];

const productRoutes = products.map((p) => {
  const url = `${origin}${base}/product/${toSlug(p.name)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.id,
    description: p.description.replace(/\s+/g, " ").trim(),
    image: p.images.map(absolute),
    brand: { "@type": "Brand", name: siteName },
    category: p.category,
    url,
    ...(p.price != null && {
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "INR",
        price: p.price,
        itemCondition: "https://schema.org/NewCondition",
        availability: p.available === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      },
    }),
  };
  return {
    path: `/product/${toSlug(p.name)}`,
    title: `${p.name} – Gold Plated Anti-Tarnish Jewellery | ${siteName}`,
    description: productDescription(p.description, p.name),
    image: p.images[0] ?? defaultImage,
    jsonLd,
    priority: "0.8",
  };
});

const template = await readFile(path.join(dist, "index.html"), "utf8");

function render(route) {
  const url = `${origin}${base}${route.path === "/" ? "/" : route.path}`;
  const image = absolute(route.image ?? defaultImage);
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(route.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, () => `<meta name="description" content="${esc(route.description)}" />`)
    .replace(/<link rel="canonical"[^>]*>/, () => `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:url"[^>]*>/, () => `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title"[^>]*>/, () => `<meta property="og:title" content="${esc(route.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, () => `<meta property="og:description" content="${esc(route.description)}" />`)
    .replace(/<meta property="og:image"[^>]*>/, () => `<meta property="og:image" content="${esc(image)}" />`);
  const extra = [
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    route.jsonLd ? `<script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(route.jsonLd).replace(/</g, "\\u003c")}</script>` : "",
  ].filter(Boolean).join("\n    ");
  return html.replace("</head>", () => `    ${extra}\n  </head>`);
}

const all = [...staticRoutes, ...productRoutes];
for (const route of all) {
  const dir = path.join(dist, route.path === "/" ? "" : route.path);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), render(route));
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map((r) => `  <url><loc>${origin}${base}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
// GitHub Pages serves 404.html for unknown URLs; reuse the app shell so client-side routing still works.
await writeFile(path.join(dist, "404.html"), template);
console.log(`SEO: wrote ${all.length} pages and sitemap.xml for ${origin}`);
