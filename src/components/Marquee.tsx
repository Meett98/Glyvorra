import { motion } from "framer-motion";

/** Endless horizontal ticker. The track holds two identical copies so the -50% loop is seamless. */
export default function Marquee({ items, duration = 30 }: { items: string[]; duration?: number }) {
  const group = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-champagne/60 bg-ivory py-5" aria-hidden="true">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {[...group, ...group].map((item, i) => (
          <span key={i} className="flex shrink-0 items-center font-serif text-2xl uppercase tracking-[0.3em] text-ink">
            {item}
            <span className="mx-10 text-gold">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
