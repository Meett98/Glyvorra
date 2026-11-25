import { ShoppingBag } from "lucide-react";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product, className = "", compact = false }: { product: Product; className?: string; compact?: boolean }) {
  const { addItem } = useCart();
  const disabled = product.availability === "out-of-stock";

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      disabled={disabled}
      className={`btn-line ${compact ? "!px-3 !py-3 !text-[11px]" : ""} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
    >
      <ShoppingBag size={16} strokeWidth={1.6} />
      {disabled ? "Out of stock" : "Add to cart"}
    </button>
  );
}
