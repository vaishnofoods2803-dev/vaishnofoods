import type { Product, Review } from '@/types';

const IMG_BOWL_DARK = 'https://images.pexels.com/photos/7051132/pexels-photo-7051132.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const IMG_BOWL_WHITE = 'https://images.pexels.com/photos/57042/pexels-photo-57042.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const IMG_LOTUS_POD = 'https://images.pexels.com/photos/35259683/pexels-photo-35259683.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const IMG_CHICKPEAS = 'https://images.pexels.com/photos/20556455/pexels-photo-20556455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const IMG_SPICES = 'https://images.pexels.com/photos/7829483/pexels-photo-7829483.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const IMG_NUTS_SPOONS = 'https://images.pexels.com/photos/971080/pexels-photo-971080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const IMG_POTPOURRI = 'https://images.pexels.com/photos/31032831/pexels-photo-31032831.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const IMG_MACADAMIA = 'https://images.pexels.com/photos/36097108/pexels-photo-36097108.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const IMG_CRISPBREAD = 'https://images.pexels.com/photos/36040665/pexels-photo-36040665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'classic-roasted-makhana',
    name: 'Classic Roasted Makhana',
    shortDescription: 'Lightly roasted fox nuts with a touch of salt — the everyday classic.',
    description:
      'Our Classic Roasted Makhana is made from handpicked fox nuts, slow-roasted to achieve that signature light, airy crunch. With just a whisper of salt, it is the perfect anytime snack — at your desk, with your tea, or on the go. No artificial flavours, no added oil, just pure roasted goodness.',
    flavour: 'Classic',
    category: 'Roasted',
    images: [IMG_BOWL_DARK, IMG_BOWL_WHITE, IMG_NUTS_SPOONS],
    rating: 4.7,
    reviewCount: 128,
    prices: [
      { weight: '100g', mrp: 180, price: 149 },
      { weight: '250g', mrp: 320, price: 279 },
      { weight: '500g', mrp: 580, price: 499 },
    ],
    ingredients: 'Fox nuts (makhana), rock salt, black pepper.',
    nutrition: {
      servingSize: '30g (approx. 1 cup)',
      rows: [
        { label: 'Energy', value: '106 kcal' },
        { label: 'Protein', value: '3.6 g' },
        { label: 'Carbohydrates', value: '21 g' },
        { label: 'of which sugars', value: '0.5 g' },
        { label: 'Fat', value: '0.1 g' },
        { label: 'Sodium', value: '120 mg' },
      ],
    },
    storage: 'Store in a cool, dry place. Once opened, keep in an airtight container to retain crunch.',
    shipping: 'Dispatched within 24–48 hours. Free delivery on orders above ₹499.',
    returns: 'Eligible for replacement within 7 days if the product arrives damaged or stale.',
    badge: 'Bestseller',
    inStock: true,
    createdAt: '2025-08-01',
  },
  {
    id: 'p2',
    slug: 'himalayan-salt-makhana',
    name: 'Himalayan Salt Makhana',
    shortDescription: 'Roasted makhana seasoned with pure pink Himalayan rock salt.',
    description:
      'A clean, mineral-rich seasoning of pink Himalayan salt gives these roasted fox nuts a distinctive savoury character. Light, crunchy, and satisfying — a guilt-free snack that pairs beautifully with your evening cup of chai.',
    flavour: 'Himalayan Salt',
    category: 'Roasted',
    images: [IMG_BOWL_WHITE, IMG_BOWL_DARK, IMG_NUTS_SPOONS],
    rating: 4.6,
    reviewCount: 94,
    prices: [
      { weight: '100g', mrp: 200, price: 169 },
      { weight: '250g', mrp: 360, price: 309 },
      { weight: '500g', mrp: 640, price: 549 },
    ],
    ingredients: 'Fox nuts (makhana), pink Himalayan rock salt.',
    nutrition: {
      servingSize: '30g (approx. 1 cup)',
      rows: [
        { label: 'Energy', value: '104 kcal' },
        { label: 'Protein', value: '3.5 g' },
        { label: 'Carbohydrates', value: '20.8 g' },
        { label: 'of which sugars', value: '0.4 g' },
        { label: 'Fat', value: '0.1 g' },
        { label: 'Sodium', value: '95 mg' },
      ],
    },
    storage: 'Store in a cool, dry place. Once opened, keep in an airtight container to retain crunch.',
    shipping: 'Dispatched within 24–48 hours. Free delivery on orders above ₹499.',
    returns: 'Eligible for replacement within 7 days if the product arrives damaged or stale.',
    inStock: true,
    createdAt: '2025-08-05',
  },
  {
    id: 'p3',
    slug: 'peri-peri-makhana',
    name: 'Peri Peri Makhana',
    shortDescription: 'Fiery peri peri spice meets the light crunch of roasted makhana.',
    description:
      'For those who love a kick of heat, our Peri Peri Makhana brings a bold blend of red chilli, paprika, and tangy spices to the airy crunch of fox nuts. It is the snack you reach for when you want flavour with a punch — without the guilt of fried alternatives.',
    flavour: 'Peri Peri',
    category: 'Flavoured',
    images: [IMG_CHICKPEAS, IMG_BOWL_DARK, IMG_SPICES],
    rating: 4.8,
    reviewCount: 156,
    prices: [
      { weight: '100g', mrp: 220, price: 189 },
      { weight: '250g', mrp: 400, price: 349 },
      { weight: '500g', mrp: 720, price: 599 },
    ],
    ingredients: 'Fox nuts (makhana), red chilli powder, paprika, oregano, salt, citric acid.',
    nutrition: {
      servingSize: '30g (approx. 1 cup)',
      rows: [
        { label: 'Energy', value: '110 kcal' },
        { label: 'Protein', value: '3.8 g' },
        { label: 'Carbohydrates', value: '21.5 g' },
        { label: 'of which sugars', value: '0.8 g' },
        { label: 'Fat', value: '0.2 g' },
        { label: 'Sodium', value: '210 mg' },
      ],
    },
    storage: 'Store in a cool, dry place. Once opened, keep in an airtight container to retain crunch.',
    shipping: 'Dispatched within 24–48 hours. Free delivery on orders above ₹499.',
    returns: 'Eligible for replacement within 7 days if the product arrives damaged or stale.',
    badge: 'Bestseller',
    inStock: true,
    createdAt: '2025-08-10',
  },
  {
    id: 'p4',
    slug: 'pudina-makhana',
    name: 'Pudina Makhana',
    shortDescription: 'Refreshing mint and mild spices on crunchy roasted fox nuts.',
    description:
      'Our Pudina Makhana captures the cooling freshness of mint with a hint of cumin and black salt. It is a refreshing twist on classic roasted fox nuts — perfect for warm afternoons, light snacking, or a flavourful companion to your chai break.',
    flavour: 'Pudina',
    category: 'Flavoured',
    images: [IMG_MACADAMIA, IMG_BOWL_WHITE, IMG_SPICES],
    rating: 4.5,
    reviewCount: 72,
    prices: [
      { weight: '100g', mrp: 210, price: 179 },
      { weight: '250g', mrp: 380, price: 329 },
      { weight: '500g', mrp: 680, price: 569 },
    ],
    ingredients: 'Fox nuts (makhana), dried mint, cumin, black salt, coriander powder.',
    nutrition: {
      servingSize: '30g (approx. 1 cup)',
      rows: [
        { label: 'Energy', value: '108 kcal' },
        { label: 'Protein', value: '3.6 g' },
        { label: 'Carbohydrates', value: '21.2 g' },
        { label: 'of which sugars', value: '0.6 g' },
        { label: 'Fat', value: '0.1 g' },
        { label: 'Sodium', value: '180 mg' },
      ],
    },
    storage: 'Store in a cool, dry place. Once opened, keep in an airtight container to retain crunch.',
    shipping: 'Dispatched within 24–48 hours. Free delivery on orders above ₹499.',
    returns: 'Eligible for replacement within 7 days if the product arrives damaged or stale.',
    inStock: true,
    createdAt: '2025-08-15',
  },
  {
    id: 'p5',
    slug: 'masala-makhana',
    name: 'Masala Makhana',
    shortDescription: 'A classic Indian masala blend on light, roasted fox nuts.',
    description:
      'Our Masala Makhana is a celebration of Indian spice — a balanced blend of chaat masala, mango powder, and roasted cumin coats every fox nut for a tangy, savoury bite. It tastes like the snacks from your local chaat stall, but with the clean crunch of roasted makhana.',
    flavour: 'Masala',
    category: 'Flavoured',
    images: [IMG_POTPOURRI, IMG_BOWL_DARK, IMG_NUTS_SPOONS],
    rating: 4.7,
    reviewCount: 113,
    prices: [
      { weight: '100g', mrp: 210, price: 179 },
      { weight: '250g', mrp: 380, price: 329 },
      { weight: '500g', mrp: 680, price: 569 },
    ],
    ingredients: 'Fox nuts (makhana), chaat masala, dried mango powder, cumin, black salt.',
    nutrition: {
      servingSize: '30g (approx. 1 cup)',
      rows: [
        { label: 'Energy', value: '112 kcal' },
        { label: 'Protein', value: '3.7 g' },
        { label: 'Carbohydrates', value: '22 g' },
        { label: 'of which sugars', value: '1.0 g' },
        { label: 'Fat', value: '0.2 g' },
        { label: 'Sodium', value: '220 mg' },
      ],
    },
    storage: 'Store in a cool, dry place. Once opened, keep in an airtight container to retain crunch.',
    shipping: 'Dispatched within 24–48 hours. Free delivery on orders above ₹499.',
    returns: 'Eligible for replacement within 7 days if the product arrives damaged or stale.',
    inStock: true,
    createdAt: '2025-08-20',
  },
  {
    id: 'p6',
    slug: 'premium-jumbo-makhana',
    name: 'Premium Jumbo Makhana',
    shortDescription: 'Extra-large fox nuts — the biggest, fluffiest crunch we offer.',
    description:
      'Our Premium Jumbo Makhana is made from the largest, most carefully graded fox nuts available. Each piece is nearly double the size of standard makhana, giving you an extraordinary fluffy, melt-in-the-mouth crunch. Roasted plain with minimal salt — the size speaks for itself.',
    flavour: 'Plain',
    category: 'Premium',
    images: [IMG_BOWL_DARK, IMG_LOTUS_POD, IMG_CRISPBREAD],
    rating: 4.9,
    reviewCount: 87,
    prices: [
      { weight: '100g', mrp: 260, price: 219 },
      { weight: '250g', mrp: 480, price: 399 },
      { weight: '500g', mrp: 860, price: 729 },
    ],
    ingredients: 'Fox nuts (makhana), rock salt.',
    nutrition: {
      servingSize: '30g (approx. ¾ cup)',
      rows: [
        { label: 'Energy', value: '102 kcal' },
        { label: 'Protein', value: '3.4 g' },
        { label: 'Carbohydrates', value: '20.5 g' },
        { label: 'of which sugars', value: '0.3 g' },
        { label: 'Fat', value: '0.1 g' },
        { label: 'Sodium', value: '110 mg' },
      ],
    },
    storage: 'Store in a cool, dry place. Once opened, keep in an airtight container to retain crunch.',
    shipping: 'Dispatched within 24–48 hours. Free delivery on orders above ₹499.',
    returns: 'Eligible for replacement within 7 days if the product arrives damaged or stale.',
    badge: 'Premium',
    inStock: true,
    createdAt: '2025-08-25',
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    name: 'Ananya S.',
    avatar: 'https://images.pexels.com/photos/7717254/pexels-photo-7717254.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
    rating: 5,
    date: '2025-09-01',
    title: 'Perfect tea-time snack',
    body: 'The classic roasted makhana is exactly what I was looking for — light, crunchy, and not too salty. It has replaced my evening biscuits!',
    sample: true,
  },
  {
    id: 'r2',
    productId: 'p3',
    name: 'Rohan M.',
    avatar: 'https://images.pexels.com/photos/9271168/pexels-photo-9271168.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
    rating: 5,
    date: '2025-09-03',
    title: 'Peri peri is addictive',
    body: 'I ordered the peri peri flavour on a whim and now I cannot stop. Great spice level, not overpowering, and the crunch is unmatched.',
    sample: true,
  },
  {
    id: 'r3',
    productId: 'p6',
    name: 'Priya K.',
    avatar: 'https://images.pexels.com/photos/13214672/pexels-photo-13214672.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
    rating: 5,
    date: '2025-09-05',
    title: 'Jumbo is worth it',
    body: 'The jumbo makhana pieces are genuinely huge. You can tell the quality difference. Packing was neat and delivery was quick.',
    sample: true,
  },
  {
    id: 'r4',
    productId: 'p2',
    name: 'Vikram T.',
    avatar: 'https://images.pexels.com/photos/7397453/pexels-photo-7397453.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
    rating: 4,
    date: '2025-09-08',
    title: 'Good, clean flavour',
    body: 'The Himalayan salt version has a nice mineral taste. Would have preferred a slightly bigger pack option, but the 250g is good value.',
    sample: true,
  },
  {
    id: 'r5',
    productId: 'p4',
    name: 'Meera J.',
    avatar: 'https://images.pexels.com/photos/39462471/pexels-photo-39462471.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
    rating: 4,
    date: '2025-09-10',
    title: 'Refreshing pudina',
    body: 'The mint flavour is subtle and refreshing. My kids love it as an after-school snack. Will reorder.',
    sample: true,
  },
  {
    id: 'r6',
    productId: 'p5',
    name: 'Arjun R.',
    avatar: 'https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
    rating: 5,
    date: '2025-09-12',
    title: 'Tastes like home',
    body: 'The masala makhana reminds me of the snacks my grandmother used to make. Tangy, spicy, and perfectly roasted.',
    sample: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getRelatedProducts(productId: string, count = 4): Product[] {
  return products.filter((p) => p.id !== productId).slice(0, count);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.flavour.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
  );
}
