import { MessageCircle } from "lucide-react";
import type { Product } from "../types";
import { whatsappLink } from "../lib/utils";

export default function WhatsAppButton({ product, className = "", compact = false }: { product: Product; className?: string; compact?: boolean }) {
  const disabled = product.availability === "out-of-stock";
  return (
    <a
      href={disabled ? undefined : whatsappLink(product)}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={disabled}
      className={`btn-gold ${compact ? "!px-4 !py-3 !text-[11px]" : ""} ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`}
    >
      <MessageCircle size={16} strokeWidth={1.6} />
      {disabled ? "Out of stock" : compact ? "Order" : "Order on WhatsApp"}
    </a>
  );
}
