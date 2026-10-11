import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD'; product: Product; weight: string; quantity: number }
  | { type: 'REMOVE'; productId: string; weight: string }
  | { type: 'UPDATE_QTY'; productId: string; weight: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' }
  | { type: 'HYDRATE'; items: CartItem[] };

function priceFor(product: Product, weight: string) {
  return product.prices.find((p) => p.weight === weight) ?? product.prices[0];
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const pr = priceFor(action.product, action.weight);
      const existing = state.items.find(
        (i) => i.productId === action.product.id && i.weight === action.weight
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.product.id && i.weight === action.weight
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
          isOpen: true,
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: action.product.id,
            slug: action.product.slug,
            name: action.product.name,
            image: action.product.images[0],
            weight: action.weight,
            price: pr.price,
            mrp: pr.mrp,
            quantity: action.quantity,
          },
        ],
        isOpen: true,
      };
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((i) => !(i.productId === action.productId && i.weight === action.weight)),
      };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.productId === action.productId && i.weight === action.weight
              ? { ...i, quantity: action.quantity }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen };
    case 'HYDRATE':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  mrpTotal: number;
  discount: number;
  shipping: number;
  total: number;
  add: (product: Product, weight: string, quantity?: number) => void;
  remove: (productId: string, weight: string) => void;
  updateQty: (productId: string, weight: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  useEffect(() => {
    const stored = localStorage.getItem('vf_cart');
    if (stored) {
      try {
        dispatch({ type: 'HYDRATE', items: JSON.parse(stored) });
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vf_cart', JSON.stringify(state.items));
  }, [state.items]);

  const count = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const mrpTotal = state.items.reduce((s, i) => s + i.mrp * i.quantity, 0);
  const discount = mrpTotal - subtotal;
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    count,
    subtotal,
    mrpTotal,
    discount,
    shipping,
    total,
    add: (product, weight, quantity = 1) =>
      dispatch({ type: 'ADD', product, weight, quantity }),
    remove: (productId, weight) => dispatch({ type: 'REMOVE', productId, weight }),
    updateQty: (productId, weight, quantity) =>
      dispatch({ type: 'UPDATE_QTY', productId, weight, quantity }),
    clear: () => dispatch({ type: 'CLEAR' }),
    openCart: () => dispatch({ type: 'OPEN' }),
    closeCart: () => dispatch({ type: 'CLOSE' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
