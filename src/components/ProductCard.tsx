import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Rating from './Rating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const lowest = product.prices[0];

  return (
    <div className="card group overflow-hidden hover:shadow-xl hover:shadow-forest-900/5 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-forest-600 text-cream-50 shadow-md">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => toggle(product)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
            wished ? 'bg-saffron-500 text-forest-900' : 'bg-white/90 text-forest-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4.5 h-4.5 ${wished ? 'fill-current' : ''}`} size={18} />
        </button>
      </div>

      <div className="p-4 space-y-2.5">
        <div>
          <span className="text-xs font-medium text-saffron-600 uppercase tracking-wide">
            {product.flavour}
          </span>
          <Link to={`/product/${product.slug}`}>
            <h3 className="text-lg font-semibold text-forest-800 leading-snug mt-0.5 hover:text-forest-600 transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        <p className="text-sm text-forest-500 line-clamp-2">{product.shortDescription}</p>

        <Rating value={product.rating} count={product.reviewCount} showCount />

        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-xl font-bold text-forest-800">₹{lowest.price}</span>
          <span className="text-sm text-forest-400 line-through">₹{lowest.mrp}</span>
          <span className="text-xs font-semibold text-saffron-600">
            {Math.round(((lowest.mrp - lowest.price) / lowest.mrp) * 100)}% off
          </span>
        </div>

        <div className="flex items-center gap-1.5 pt-1">
          {product.prices.map((p) => (
            <span
              key={p.weight}
              className="px-2 py-0.5 rounded-md text-xs font-medium bg-cream-100 text-forest-600"
            >
              {p.weight}
            </span>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => add(product, lowest.weight, 1)}
            className="flex-1 px-3 py-2.5 rounded-lg bg-forest-600 text-cream-50 text-sm font-semibold transition-all hover:bg-forest-700 active:scale-95"
          >
            Add to Cart
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="flex-1 px-3 py-2.5 rounded-lg bg-cream-100 text-forest-700 text-sm font-semibold text-center transition-all hover:bg-cream-200 active:scale-95"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
