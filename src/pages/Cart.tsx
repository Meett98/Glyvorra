import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice, whatsappCartLink } from "../lib/utils";
import Img from "../components/Img";
import Reveal from "../components/Reveal";
import { useSeo } from "../hooks/useSeo";

export default function Cart() {
  useSeo("Your Cart", undefined, undefined, { noindex: true });
  const { items, setQuantity, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0);
  const hasPriceOnRequest = items.some((item) => item.product.price == null);
  const hasOutOfStockItem = items.some((item) => item.product.availability === "out-of-stock");

  return (
    <div className="container-x py-14">
      <Reveal>
        <p className="eyebrow mb-3">Your selection</p>
        <h1 className="text-5xl leading-tight sm:text-6xl">Shopping Cart</h1>
      </Reveal>

      {items.length === 0 ? (
        <div className="mt-12 border-y border-champagne py-12 text-center">
          <p className="text-muted">Your cart is empty.</p>
          <Link to="/shop" className="btn-gold mt-6">Explore the collection</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-champagne border-y border-champagne">
            {items.map(({ product, quantity }) => (
              <article key={product.id} className="grid grid-cols-[88px_1fr] gap-4 py-5 sm:grid-cols-[120px_1fr] sm:gap-6">
                <Link to={`/product/${product.slug}`} className="block aspect-square overflow-hidden bg-sand">
                  <Img src={product.images[0]} alt={product.name} width={240} />
                </Link>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <Link to={`/product/${product.slug}`} className="font-serif text-xl hover:text-gold">{product.name}</Link>
                    <p className="mt-1 text-sm text-muted">{formatPrice(product.price)} each</p>
                    {product.availability === "out-of-stock" && <p className="mt-1 text-xs text-red-700">Currently out of stock</p>}
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <div className="inline-flex items-center border border-ink/20">
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="p-2 hover:text-gold"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-8 text-center text-sm" aria-live="polite">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="p-2 hover:text-gold"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="p-2 text-muted hover:text-ink"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit bg-sand p-6 sm:p-8">
            <h2 className="font-serif text-2xl">Order summary</h2>
            <div className="mt-5 flex justify-between border-t border-champagne pt-5">
              <span className="text-sm text-muted">{hasPriceOnRequest ? "Subtotal (priced items)" : "Subtotal"}</span>
              <span className="font-medium">{formatPrice(total)}</span>
            </div>
            {hasPriceOnRequest && <p className="mt-3 text-xs leading-relaxed text-muted">Some prices are confirmed on WhatsApp. Shipping, if applicable, will also be confirmed there.</p>}
            <a
              href={hasOutOfStockItem ? undefined : whatsappCartLink(items)}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={hasOutOfStockItem}
              className={`btn-gold mt-7 w-full ${hasOutOfStockItem ? "pointer-events-none opacity-50" : ""}`}
            >
              Order on WhatsApp
            </a>
            {hasOutOfStockItem && <p className="mt-3 text-xs text-muted">Remove out-of-stock items to continue.</p>}
            <Link to="/shop" className="btn-line mt-3 w-full">Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
