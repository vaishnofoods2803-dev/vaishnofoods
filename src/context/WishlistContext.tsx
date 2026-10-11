import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product } from '@/types';

interface WishlistItemLite {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
}

interface WishlistContextValue {
  items: WishlistItemLite[];
  count: number;
  has: (productId: string) => boolean;
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItemLite[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('vf_wishlist');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vf_wishlist', JSON.stringify(items));
  }, [items]);

  const has = (productId: string) => items.some((i) => i.productId === productId);

  const toggle = (product: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.productId === product.id)) {
        return prev.filter((i) => i.productId !== product.id);
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: product.images[0],
          price: product.prices[0].price,
        },
      ];
    });
  };

  const remove = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  return (
    <WishlistContext.Provider value={{ items, count: items.length, has, toggle, remove }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
