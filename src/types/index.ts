export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  flavour: string;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  prices: { weight: string; mrp: number; price: number }[];
  ingredients: string;
  nutrition: {
    servingSize: string;
    rows: { label: string; value: string }[];
  };
  storage: string;
  shipping: string;
  returns: string;
  badge?: string;
  inStock: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  sample?: boolean;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  weight: string;
  price: number;
  mrp: number;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered';
  address: OrderAddress;
  paymentMethod: string;
}

export interface OrderAddress {
  fullName: string;
  email: string;
  phone: string;
  house: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
}
