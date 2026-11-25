import { Link } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";
import { categories } from "../data/categories";
import { products } from "../data/products";
import Img from "../components/Img";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";

export default function Collections() {
  useSeo("Collections", "Explore GLYVORRA collections – gold plated, anti-tarnish rings, earrings, necklaces, bracelets and bangles & kadas.");
  return (
    <div className="container-x py-14">
      <Reveal className="text-center">
        <p className="eyebrow mb-3">Curated for you</p>
        <h1 className="text-5xl sm:text-6xl">Collections</h1>
      </Reveal>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <TiltCard max={4}>
                <Link to={`/shop?category=${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-sand shadow-soft">
                  <Img src={c.banner ?? c.image} alt={c.name} width={800} className="transition-transform duration-[1600ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h2 className="text-3xl">{c.name}</h2>
                    <p className="text-sm opacity-90">{c.tagline && `${c.tagline} · `}{count} {count === 1 ? "piece" : "pieces"}</p>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
