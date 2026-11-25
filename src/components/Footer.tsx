import { Link } from "react-router-dom";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { contact, site, social } from "../config/site";
import { categories } from "../data/categories";
import { whatsappGeneral } from "../lib/utils";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-champagne bg-sand">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div>
          <p className="font-serif text-3xl tracking-[0.35em]">{site.name}</p>
          <p className="mt-3 text-sm italic text-muted font-serif">{site.tagline}</p>
          <div className="mt-6 flex gap-4">
            <a href={social.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold"><Instagram size={20} strokeWidth={1.3} /></a>
            <a href={whatsappGeneral()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-gold"><MessageCircle size={20} strokeWidth={1.3} /></a>
          </div>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-muted">
            {[["/", "Home"], ["/shop", "Shop"], ["/collections", "Collections"], ["/about", "About Us"], ["/contact", "Contact"]].map(([to, l]) => (
              <li key={to}><Link to={to} className="hover:text-gold">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-muted">
            {categories.map((c) => (
              <li key={c.slug}><Link to={`/shop?category=${c.slug}`} className="hover:text-gold">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2"><Mail size={15} /> {contact.email}</li>
            <li className="flex items-center gap-2"><Phone size={15} /> {contact.phone}</li>
            <li className="flex items-center gap-2"><Instagram size={15} /> {social.instagramHandle}</li>
            <li>{contact.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-champagne">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold">Terms &amp; Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
