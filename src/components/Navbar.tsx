import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../config/site";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const cls = ({ isActive }: { isActive: boolean }) =>
    `text-[12px] uppercase tracking-[0.22em] transition-colors duration-500 hover:text-gold ${isActive ? "text-gold" : "text-ink"}`;

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-champagne/60 bg-ivory/90 backdrop-blur">
      <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center sm:h-20">
        <div className="flex items-center justify-start">
        <button className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu size={22} strokeWidth={1.3} />
        </button>
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {links.slice(0, 3).map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={cls}>{l.label}</NavLink>
          ))}
        </nav>
        </div>
        <Link to="/" className="pl-[0.35em] text-center font-serif text-2xl tracking-[0.35em] sm:text-3xl" aria-label={`${site.name} home`}>
          {site.name}
        </Link>
        <div className="flex items-center justify-end gap-6 lg:gap-9">
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Secondary">
            {links.slice(3).map((l) => (
              <NavLink key={l.to} to={l.to} className={cls}>{l.label}</NavLink>
            ))}
          </nav>
          <Link to="/cart" aria-label={`Shopping cart, ${itemCount} items`} className="relative transition-colors hover:text-gold">
            <ShoppingBag size={22} strokeWidth={1.3} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] text-white" aria-live="polite">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-ivory"
          >
            <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center">
              <button className="justify-self-start" aria-label="Close menu" onClick={() => setOpen(false)}><X size={24} strokeWidth={1.3} /></button>
              <span className="pl-[0.35em] font-serif text-2xl tracking-[0.35em]">{site.name}</span>
              <span />
            </div>
            <nav className="container-x mt-10 flex flex-col gap-7" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}>
                  <NavLink to={l.to} end={l.to === "/"} onClick={() => setOpen(false)} className="font-serif text-4xl">
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
