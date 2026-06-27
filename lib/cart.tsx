"use client";

// Client-side mock basket for VIS MAJOR. No server, no Stripe — just a
// localStorage-backed cart so the full pre-order flow works end to end. Real
// payment (app/api/checkout, lib/stripe) gets wired in later and is untouched.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartProductSlug = "gy-no" | "sculpt" | "sharp";

export interface CartItem {
  id: string; // `${product}:${tier}`
  product: CartProductSlug;
  productName: string; // e.g. "GY-NO!"
  tier: string; // tier key, e.g. "2"
  tierLabel: string; // human label, e.g. "40ml"
  price: number; // whole £, per unit
  qty: number;
}

type AddInput = Omit<CartItem, "qty"> & { qty?: number };

interface CartContextValue {
  items: CartItem[];
  open: boolean;
  count: number;
  subtotal: number;
  add: (item: AddInput) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
}

const STORAGE_KEY = "vm-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount only — never touch window during render
  // so the server and first client render agree (SSR-safe).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed as CartItem[]);
      }
    } catch {
      // ignore malformed / unavailable storage
    }
    setHydrated(true);
  }, []);

  // Persist after hydration so we never clobber stored items with the initial
  // empty state during the first pass.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota / unavailable storage
    }
  }, [items, hydrated]);

  const add = useCallback((item: AddInput) => {
    const qty = item.qty ?? 1;
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const next = Math.max(1, Math.floor(qty));
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: next } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((n, i) => n + i.price * i.qty, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({ items, open, count, subtotal, add, remove, setQty, clear, setOpen }),
    [items, open, count, subtotal, add, remove, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
