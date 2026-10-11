/**
 * Centralized API service layer.
 *
 * This module is the single entry point for all data access in the app.
 * Currently it returns mock data from the local data layer, but every
 * function maps 1:1 to a future REST endpoint. When the backend is ready,
 * replace the body of each function with a fetch() call — components
 * and contexts do not need to change.
 *
 * Planned endpoints:
 *   /api/auth        → authService
 *   /api/products    → productService
 *   /api/cart        → cartService
 *   /api/orders      → orderService
 *   /api/users       → userService
 *   /api/payments    → paymentService
 *   /api/contact     → contactService
 */

import { products as productData, reviews as reviewData } from '@/data/products';
import type { Product, Review, Order, ContactMessage, User, CartItem } from '@/types';

const MOCK_DELAY = 0;

function delay<T>(value: T, ms = MOCK_DELAY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/* ──────────────────────────────────── Products ─────────────────────────────── */

export const productService = {
  async getAll(): Promise<Product[]> {
    return delay([...productData]);
  },
  async getBySlug(slug: string): Promise<Product | undefined> {
    return delay(productData.find((p) => p.slug === slug));
  },
  async getFeatured(): Promise<Product[]> {
    return delay(productData.filter((p) => p.badge));
  },
  async getRelated(productId: string, count = 4): Promise<Product[]> {
    return delay(productData.filter((p) => p.id !== productId).slice(0, count));
  },
  async search(query: string): Promise<Product[]> {
    const q = query.toLowerCase().trim();
    if (!q) return delay([]);
    return delay(
      productData.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.flavour.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      )
    );
  },
  async getReviews(productId: string): Promise<Review[]> {
    return delay(reviewData.filter((r) => r.productId === productId));
  },
};

/* ──────────────────────────────────── Auth ─────────────────────────────────── */

export const authService = {
  async login(email: string, _password: string): Promise<User> {
    // POST /api/auth/login
    return delay({ id: 'u1', name: 'Guest User', email });
  },
  async register(name: string, email: string, _password: string): Promise<User> {
    // POST /api/auth/register
    return delay({ id: 'u1', name, email });
  },
  async logout(): Promise<void> {
    return delay(undefined);
  },
};

/* ──────────────────────────────────── Cart ─────────────────────────────────── */

export const cartService = {
  async get(userId: string): Promise<CartItem[]> {
    // GET /api/cart?userId=...
    return delay([], 0);
  },
  async sync(_userId: string, _items: CartItem[]): Promise<void> {
    // POST /api/cart/sync
    return delay(undefined, 0);
  },
};

/* ──────────────────────────────────── Orders ───────────────────────────────── */

export const orderService = {
  async create(items: CartItem[], address: Order['address'], paymentMethod: string): Promise<Order> {
    // POST /api/orders
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = subtotal > 499 ? 0 : 49;
    return delay({
      id: 'VF' + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      items,
      total: subtotal + shipping,
      status: 'Placed',
      address,
      paymentMethod,
    });
  },
  async getById(id: string): Promise<Order | undefined> {
    // GET /api/orders/:id
    const stored = localStorage.getItem('vf_orders');
    if (stored) {
      const orders: Order[] = JSON.parse(stored);
      return delay(orders.find((o) => o.id === id));
    }
    return delay(undefined);
  },
  async getByUser(userId: string): Promise<Order[]> {
    // GET /api/orders?userId=...
    const stored = localStorage.getItem('vf_orders');
    if (stored) {
      const orders: Order[] = JSON.parse(stored);
      return delay(orders.filter((o) => o.address.email === userId || true));
    }
    return delay([]);
  },
};

/* ──────────────────────────────────── Payments ─────────────────────────────── */

export const paymentService = {
  async createOrder(amount: number): Promise<{ orderId: string; amount: number; currency: string }> {
    // POST /api/payments/create-order
    return delay({ orderId: 'pay_' + Date.now(), amount, currency: 'INR' });
  },
  async verify(_paymentId: string, _orderId: string, _signature: string): Promise<{ verified: boolean }> {
    // POST /api/payments/verify
    return delay({ verified: true });
  },
};

/* ──────────────────────────────────── Contact ──────────────────────────────── */

export const contactService = {
  async sendMessage(msg: Omit<ContactMessage, 'id' | 'date'>): Promise<ContactMessage> {
    // POST /api/contact
    return delay({
      ...msg,
      id: 'msg_' + Date.now(),
      date: new Date().toISOString(),
    });
  },
};
