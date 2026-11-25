import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../data/products";
import type { Product } from "../types";

const STORAGE_KEY = "glyvorra-cart";

interface StoredCartItem {
  productId: string;
  quantity: number;
}

interface CartItem extends StoredCartItem {
  product: Product;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  addItem: (product: Product) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function isStoredCartItem(value: unknown): value is StoredCartItem {
  if (typeof value !== "object" || value === null) return false;
  return "productId" in value
    && typeof value.productId === "string"
    && "quantity" in value
    && typeof value.quantity === "number"
    && Number.isInteger(value.quantity)
    && value.quantity > 0;
}

function readStoredCart(): StoredCartItem[] {
  if (typeof window === "undefined") return [];
  let stored: string | null;
  try {
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error("Unable to read the saved cart.", error);
    return [];
  }
  if (!stored) return [];

  try {
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) throw new Error("Saved cart data is not an array.");
    const validItems = parsed.filter(isStoredCartItem);
    if (validItems.length !== parsed.length) console.error("Some invalid items in the saved cart were ignored.");
    return validItems;
  } catch (error) {
    console.error("Unable to parse the saved cart.", error);
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [storedItems, setStoredItems] = useState<StoredCartItem[]>(readStoredCart);
  const items = useMemo(
    () => storedItems.flatMap((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      return product ? [{ ...item, product }] : [];
    }),
    [storedItems],
  );
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItems));
    } catch (error) {
      console.error("Unable to save the cart.", error);
    }
  }, [storedItems]);

  const addItem = (product: Product) => {
    if (product.availability === "out-of-stock") return;
    setStoredItems((current) => {
      const existing = current.find((item) => item.productId === product.id);
      return existing
        ? current.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { productId: product.id, quantity: 1 }];
    });
  };

  const setQuantity = (productId: string, quantity: number) => {
    const nextQuantity = Math.floor(quantity);
    if (nextQuantity < 1) {
      setStoredItems((current) => current.filter((item) => item.productId !== productId));
      return;
    }
    setStoredItems((current) => current.map((item) => item.productId === productId ? { ...item, quantity: nextQuantity } : item));
  };

  const removeItem = (productId: string) => {
    setStoredItems((current) => current.filter((item) => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{ items, itemCount, addItem, setQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider.");
  return context;
}
