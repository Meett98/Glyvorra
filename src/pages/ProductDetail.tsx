import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { getProduct, products } from "../data/products";
import { getCategory } from "../data/categories";
import { availabilityLabel, formatPrice, imageUrl, productDescription, productJsonLd } from "../lib/utils";
import Img from "../components/Img";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import AddToCartButton from "../components/AddToCartButton";
import WhatsAppButton from "../components/WhatsAppButton";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  useSeo(
    product ? `${product.name} – Gold Plated Anti-Tarnish Jewellery` : "Not found",
    product ? productDescription(product.description, product.name) : undefined,
    product?.images[0],
    product ? { jsonLd: productJsonLd(product) } : { noindex: true },
  );
  if (!product) return <NotFound />;

  const cat = getCategory(product.category);
  const soldOut = product.availability === "out-of-stock";
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="container-x py-10">
      <Link to="/shop" className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted hover:text-gold">
        <ChevronLeft size={14} /> Back to shop
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div
            className="relative flex items-center justify-center overflow-hidden bg-sand shadow-soft"
            onPointerMove={onMove}
            onPointerLeave={() => setZoom(null)}
          >
            <Img
              src={product.images[active]}
              alt={product.name}
              width={1400}
              eager
              className={`!h-auto !w-auto max-h-[calc(100svh-18rem)] max-w-full !object-contain transition-transform duration-500 ease-out ${soldOut ? "opacity-60 grayscale-[40%]" : ""}`}
            />
            {soldOut && <span className="absolute left-3 top-3 bg-ink/85 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white">Out of stock</span>}
            {zoom && (
              <div
                className="pointer-events-none absolute inset-0 hidden bg-no-repeat sm:block"
                style={{
                  backgroundImage: `url("${imageUrl(product.images[active], 1600)}")`,
                  backgroundSize: "220%",
                  backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                }}
              />
            )}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                className={`aspect-square overflow-hidden border transition-colors duration-500 ${i === active ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <Img src={src} alt="" width={200} />
              </button>
            ))}
          </div>
        </div>

        <Reveal>
          <p className="eyebrow">{cat?.name}</p>
          <h1 className="mt-2 text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-4 flex flex-wrap items-baseline gap-3 font-sans">
            <span className="text-3xl font-medium tracking-tight text-ink">{formatPrice(product.price)}</span>
            {product.originalPrice != null && (
              <del className="text-lg text-muted/70">{formatPrice(product.originalPrice)}</del>
            )}
          </p>
          <p className={`mt-1 text-sm ${soldOut ? "font-normal uppercase tracking-[0.15em] text-ink" : "text-muted"}`}>{availabilityLabel[product.availability]}</p>
          <p className="mt-8 whitespace-pre-line leading-relaxed text-muted">{product.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AddToCartButton product={product} className="w-full sm:w-auto" />
            <WhatsAppButton product={product} className="w-full sm:w-auto" />
          </div>

          {product.details && (
            <dl className="mt-10 divide-y divide-champagne border-y border-champagne text-sm">
              {product.details.map((d) => (
                <div key={d.label} className="flex justify-between py-3">
                  <dt className="text-muted">{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
              <div className="flex justify-between py-3"><dt className="text-muted">Category</dt><dd>{cat?.name}</dd></div>
            </dl>
          )}
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-center text-4xl">You May Also Love</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-7">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
