import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "../types";
import { getCategory } from "../data/categories";
import { availabilityLabel, formatPrice } from "../lib/utils";
import Img from "./Img";
import TiltCard from "./TiltCard";
import AddToCartButton from "./AddToCartButton";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({ product }: { product: Product }) {
  const [main, hover] = product.images;
  const cat = getCategory(product.category);
  const soldOut = product.availability === "out-of-stock";
  return (
    <TiltCard className="h-full">
      <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="group flex h-full flex-col bg-white shadow-soft transition-shadow duration-700 hover:shadow-lift">
        <Link to={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-sand" aria-label={`View ${product.name}`}>
          <Img src={main} alt={product.name} width={700} className={`transition-all duration-[1400ms] ease-out group-hover:scale-105 ${soldOut ? "opacity-60 grayscale-[40%]" : ""}`} />
          {hover && (
            <Img src={hover} alt="" width={700} className={`absolute inset-0 opacity-0 transition-opacity duration-1000 ${soldOut ? "group-hover:opacity-60" : "group-hover:opacity-100"}`} />
          )}
          {product.newArrival && !soldOut && <span className="absolute left-3 top-3 bg-ivory/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">New</span>}
          {soldOut && <span className="absolute left-3 top-3 bg-ink/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white">Out of stock</span>}
          <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ivory/90 py-2.5 text-center text-[11px] uppercase tracking-[0.22em] transition-transform duration-700 group-hover:translate-y-0">
            Quick view
          </span>
        </Link>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="eyebrow">{cat?.name}</p>
          <h3 className="mt-1 font-serif text-xl leading-snug">{product.name}</h3>
          <p className="mt-1 text-sm text-muted">
            <span className="text-ink">{formatPrice(product.price)}</span>
            {product.originalPrice != null && (
              <del className="ml-2 text-muted/70">{formatPrice(product.originalPrice)}</del>
            )}
            {" · "}<span className={soldOut ? "text-ink" : ""}>{availabilityLabel[product.availability]}</span>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link to={`/product/${product.slug}`} className="btn-line !px-3 !py-3 !text-[11px]">Details</Link>
            <WhatsAppButton product={product} compact />
            <AddToCartButton product={product} compact className="col-span-2" />
          </div>
        </div>
      </motion.article>
    </TiltCard>
  );
}
