import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { useSeo } from "../hooks/useSeo";
import { instagramGrid, promo, site, social, story } from "../config/site";
import { categories } from "../data/categories";
import { isSampleData, newArrivals } from "../data/products";
import Img from "../components/Img";
import DriftImage from "../components/DriftImage";
import Marquee from "../components/Marquee";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

const MARQUEE_ITEMS = ["Gold Plated", "Anti-Tarnish", "Timeless Elegance", "Made To Order"];
const STORY_IMAGE = "/products/banners/our_story.webp";
const HERO_IMAGES = [
  "/products/banners/Elegant Gold Clover Pendant on Satin.webp",
  "/products/banners/Gold Heart Charm Earrings on Satin.webp",
  "/products/banners/Gold and Green Pendant Bracelet.webp",
];

export default function Home() {
  useSeo(site.homeTitle, "Shop GLYVORRA's gold plated, anti-tarnish stainless steel jewellery online in India – rings, earrings, necklaces, bracelets and bangles. Affordable everyday elegance.");
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const arrivals = newArrivals().slice(0, 4);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100svh-7rem)] flex-col overflow-hidden bg-ivory sm:items-center sm:justify-center sm:bg-sand">
        <AnimatePresence initial={false}>
          <motion.div
            key={HERO_IMAGES[activeHeroImage]}
            aria-hidden="true"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 h-[40svh] bg-cover bg-[position:72%_center] sm:inset-0 sm:h-auto sm:bg-center"
            style={{ backgroundImage: `url("${HERO_IMAGES[activeHeroImage]}")` }}
          />
        </AnimatePresence>
        <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-ivory/90 via-ivory/45 to-transparent sm:block" />
        <div className="container-x relative z-10 mt-[40svh] w-full pb-14 pt-5 sm:my-0 sm:mt-0 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="eyebrow mb-5 flex items-center gap-3">
              Timeless Elegance <span aria-hidden="true" className="h-px w-24 bg-gold/40" />
            </p>
            <h1 className="text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
              Elegance That
              <br />
              Speaks <em className="text-gold">Without</em>
              <br />
              <em className="text-gold">Words.</em>
            </h1>
            <p className="mt-6 max-w-md text-muted">
              Discover timeless jewellery designed to make every moment a little more beautiful.
            </p>
            <Link to="/shop" className="btn-gold mt-9">
              Explore Collection <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Marquee items={MARQUEE_ITEMS} />

      {/* Categories */}
      <section className="container-x pt-24">
        <SectionHeading eyebrow="Shop by category" title="Find Your Signature Piece" />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.filter((c) => c.showOnHome).map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <Link to={`/shop?category=${c.slug}`} className={`group relative flex aspect-[3/4] flex-col items-center overflow-hidden bg-gradient-to-br from-[#F2ECE5] to-[#E5D5B8] px-3 text-center ${c.banner ? "justify-start pt-[12%]" : "justify-center"}`}>
                {c.banner && <img src={c.banner} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />}
                {c.banner && <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#2A1E0E]/60 via-[#2A1E0E]/25 via-45% to-transparent" />}
                <h3 className={`relative font-serif text-lg font-medium uppercase leading-snug tracking-[0.18em] transition-transform duration-700 group-hover:scale-105 sm:text-xl ${c.banner ? "text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]" : "text-[#8A6A2F]"}`}>{c.name}</h3>
                <span className={`relative mt-3 h-px w-8 transition-all duration-700 group-hover:w-14 ${c.banner ? "bg-white/70" : "bg-gold/70"}`} />
                <p className={`relative mt-2 font-serif text-sm italic ${c.banner ? "text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]" : "text-muted"}`}>{c.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="container-x pt-28">
        <SectionHeading eyebrow="Just in" title="New Arrivals">
          {isSampleData ? "Sample pieces shown for preview – add your real inventory in src/data/products.inventory.ts." : "Fresh from the GLYVORRA studio."}
        </SectionHeading>
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-7">
          {arrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}><ProductCard product={p} /></Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center"><Link to="/shop" className="btn-line">View All</Link></Reveal>
      </section>

      {/* Brand story */}
      <section className="mt-28 bg-sand py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <DriftImage className="aspect-video shadow-soft"><Img src={STORY_IMAGE} alt="GLYVORRA – Our Story" width={1200} /></DriftImage>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow mb-4">Our story</p>
            <h2 className="text-4xl leading-tight sm:text-5xl">{story.heading}</h2>
            {story.body.slice(0, 1).map((t) => <p key={t} className="mt-5 max-w-lg text-muted">{t}</p>)}
            <Link to="/about" className="btn-line mt-8">Read More</Link>
          </Reveal>
        </div>
      </section>

      {/* Promo */}
      {promo.enabled && (
        <section className="container-x pt-24">
          <Reveal>
            <div className="grid overflow-hidden bg-champagne/50 md:grid-cols-2">
              <div className="flex flex-col justify-center p-10 sm:p-14">
                <p className="eyebrow mb-3">{promo.eyebrow}</p>
                <h2 className="text-4xl sm:text-5xl">{promo.title}</h2>
                <p className="mt-4 max-w-sm text-muted">{promo.text}</p>
                <Link to={promo.ctaLink} className="btn-gold mt-8 self-start">{promo.ctaLabel}</Link>
              </div>
              <DriftImage className="aspect-[4/3] md:aspect-auto"><Img src={promo.image} alt={promo.title} width={1000} /></DriftImage>
            </div>
          </Reveal>
        </section>
      )}

      {/* Instagram */}
      <section className="container-x pt-28">
        <SectionHeading eyebrow={social.instagramHandle} title="Follow the World of GLYVORRA" />
        <div className="mt-12 grid grid-cols-3 gap-2 lg:grid-cols-6">
          {instagramGrid.map(({ image, url }, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden bg-sand" aria-label={`Watch GLYVORRA Reel ${i + 1}`}>
                <Img src={image} alt={`GLYVORRA Instagram post ${i + 1}`} width={400} className="transition-transform duration-[1400ms] group-hover:scale-110" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/45 text-white transition-transform duration-500 group-hover:scale-110 sm:h-12 sm:w-12">
                    <Instagram size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <a href={social.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-line">Follow {social.instagramHandle}</a>
        </Reveal>
      </section>
    </>
  );
}
