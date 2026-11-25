import { announcement } from "../config/site";
import { useEffect, useState } from "react";

export default function AnnouncementBar() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileItems = [...announcement.mobileMessages, ...(announcement.shippingNote ? [announcement.shippingNote] : [])];

  useEffect(() => {
    if (!announcement.enabled || mobileItems.length < 2) return;
    const intervalId = window.setInterval(() => {
      setMobileIndex((index) => (index + 1) % mobileItems.length);
    }, 3000);
    return () => window.clearInterval(intervalId);
  }, [mobileItems.length]);

  if (!announcement.enabled) return null;
  const items = [...announcement.messages, ...(announcement.shippingNote ? [announcement.shippingNote] : [])];
  return (
    <div className="bg-champagne/70 text-ink">
      <div className="container-x flex items-center justify-center gap-6 py-2 text-[10px] uppercase tracking-[0.22em] sm:text-[11px]">
        <span className="sm:hidden">{mobileItems[mobileIndex]}</span>
        {items.map((m, i) => (
          <span key={m} className="hidden sm:inline">
            {i > 0 && <span className="mr-6 text-gold">◆</span>}
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
