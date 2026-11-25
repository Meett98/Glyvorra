import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { categories } from "../data/categories";
import { isSampleData, products } from "../data/products";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";
import Reveal from "../components/Reveal";

const categoryNames = Object.fromEntries(categories.map((c) => [c.slug, c.name]));

const haystack = (p: Product) => `${p.name} ${categoryNames[p.category] ?? p.category}`.toLowerCase();

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "all";
  const sort = params.get("sort") ?? "featured";
  const [q, setQ] = useState(params.get("q") ?? "");
  const onlyNew = params.get("filter") === "new";
  useSeo("Shop", "Shop gold plated, anti-tarnish jewellery online in India – necklaces, earrings, rings, bracelets and bangles from GLYVORRA.");

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (!v || v === "all" || v === "featured") next.delete(k); else next.set(k, v);
    setParams(next, { replace: true });
  };

  const terms = useMemo(() => q.toLowerCase().split(/\s+/).filter(Boolean), [q]);

  const list = useMemo(() => {
    let l = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!onlyNew || p.newArrival) &&
        terms.every((t) => haystack(p).includes(t))
    );
    if (sort === "low") l = [...l].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "high") l = [...l].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    return l;
  }, [category, sort, terms, onlyNew]);

  const chip = (active: boolean) =>
    `whitespace-nowrap border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 ${active ? "border-ink bg-ink text-white" : "border-champagne hover:border-gold"}`;

  return (
    <div className="container-x py-14">
      <Reveal className="text-center">
        <p className="eyebrow mb-3">The catalogue</p>
        <h1 className="text-5xl sm:text-6xl">Shop</h1>
        {isSampleData && <p className="mx-auto mt-3 max-w-md text-xs text-muted">Showing sample products. Add real inventory in src/data/products.inventory.ts.</p>}
      </Reveal>

      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0" role="tablist">
          <button className={chip(category === "all")} onClick={() => set("category", "all")}>All</button>
          {categories.map((c) => (
            <button key={c.slug} className={chip(category === c.slug)} onClick={() => set("category", c.slug)}>{c.name}</button>
          ))}
        </div>
        <div className="flex gap-3">
          <label className="relative flex-1 lg:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              aria-label="Search products"
              className="w-full border border-champagne bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-gold"
            />
          </label>
          <div className="relative">
            <select value={sort} onChange={(e) => set("sort", e.target.value)} aria-label="Sort" className="h-full w-full appearance-none border border-champagne bg-white py-2.5 pl-3 pr-10 text-sm outline-none focus:border-gold">
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="mt-24 text-center text-muted">No pieces found. Try another search or category.</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06} className="h-full"><ProductCard product={p} /></Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
