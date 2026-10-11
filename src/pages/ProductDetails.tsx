import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { getProductBySlug, getReviewsByProductId, getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Rating from '@/components/Rating';
import ProductCard from '@/components/ProductCard';

type Tab = 'description' | 'ingredients' | 'nutrition' | 'shipping';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { add, openCart } = useCart();
  const { has, toggle } = useWishlist();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('description');

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold text-forest-800">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">
          Back to Shop
        </Link>
      </div>
    );
  }

  const wished = has(product.id);
  const weightOpt = product.prices[selectedWeight];
  const reviews = getReviewsByProductId(product.id);
  const related = getRelatedProducts(product.id, 4);

  const handleAddToCart = () => {
    add(product, weightOpt.weight, quantity);
  };

  const handleBuyNow = () => {
    add(product, weightOpt.weight, quantity);
    navigate('/checkout');
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'description', label: 'Description' },
    { key: 'ingredients', label: 'Ingredients' },
    { key: 'nutrition', label: 'Nutrition' },
    { key: 'shipping', label: 'Shipping' },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream-100 py-4">
        <div className="container-page flex items-center gap-2 text-sm text-forest-500">
          <Link to="/" className="hover:text-forest-700 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-forest-700 transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-forest-700 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden bg-cream-100 border border-cream-200/60 shadow-sm">
              <img
                src={product.images[activeImage]}
                alt={`${product.name} — view ${activeImage + 1}`}
                className="w-full h-[420px] lg:h-[500px] object-cover animate-fade-in"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-forest-600 ring-2 ring-forest-200' : 'border-cream-200'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-saffron-600">
                {product.flavour}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-forest-800 mt-1">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <Rating value={product.rating} size="md" showCount count={product.reviewCount} />
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-forest-800">₹{weightOpt.price}</span>
              <span className="text-lg text-forest-400 line-through">₹{weightOpt.mrp}</span>
              <span className="text-sm font-semibold text-saffron-600 bg-saffron-400/10 px-2 py-0.5 rounded-md">
                {Math.round(((weightOpt.mrp - weightOpt.price) / weightOpt.mrp) * 100)}% off
              </span>
            </div>

            <p className="text-forest-500 leading-relaxed">{product.shortDescription}</p>

            {/* Weight selector */}
            <div>
              <h4 className="text-sm font-semibold text-forest-700 mb-2">Select Weight</h4>
              <div className="flex flex-wrap gap-2">
                {product.prices.map((p, i) => (
                  <button
                    key={p.weight}
                    onClick={() => setSelectedWeight(i)}
                    className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                      selectedWeight === i
                        ? 'border-forest-600 bg-forest-600 text-cream-50'
                        : 'border-cream-300 text-forest-600 hover:border-forest-400'
                    }`}
                  >
                    {p.weight} — ₹{p.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h4 className="text-sm font-semibold text-forest-700 mb-2">Quantity</h4>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-cream-100 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-forest-600 hover:bg-cream-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-semibold text-forest-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-forest-600 hover:bg-cream-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-forest-500">
                  Total: <span className="font-bold text-forest-800">₹{weightOpt.price * quantity}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={handleAddToCart} className="btn-primary flex-1">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="btn-saffron flex-1">
                Buy Now
              </button>
              <button
                onClick={() => toggle(product)}
                aria-label="Toggle wishlist"
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0 ${
                  wished
                    ? 'bg-saffron-500 border-saffron-500 text-forest-900'
                    : 'border-cream-300 text-forest-600 hover:border-saffron-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${wished ? 'fill-current' : ''}`} />
              </button>
            </div>

            {wished && (
              <button
                onClick={openCart}
                className="text-sm text-forest-600 hover:text-forest-800 transition-colors flex items-center gap-1"
              >
                <Check className="w-4 h-4" /> Added to cart — view cart
              </button>
            )}

            {/* Trust icons */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-cream-200">
              {[
                { icon: Truck, label: 'Free delivery above ₹499' },
                { icon: RotateCcw, label: '7-day replacement' },
                { icon: ShieldCheck, label: 'Hygienically packed' },
              ].map((t) => (
                <div key={t.label} className="text-center">
                  <t.icon className="w-6 h-6 text-forest-500 mx-auto mb-1.5" />
                  <p className="text-xs text-forest-500 leading-tight">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-14">
          <div className="flex flex-wrap gap-2 border-b border-cream-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? 'border-forest-600 text-forest-700'
                    : 'border-transparent text-forest-400 hover:text-forest-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6 animate-fade-in" key={activeTab}>
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none">
                <p className="text-forest-500 leading-relaxed">{product.description}</p>
              </div>
            )}
            {activeTab === 'ingredients' && (
              <div>
                <p className="text-forest-500 leading-relaxed">{product.ingredients}</p>
              </div>
            )}
            {activeTab === 'nutrition' && (
              <div className="max-w-md">
                <p className="text-sm text-forest-500 mb-3">
                  Serving size: {product.nutrition.servingSize}
                </p>
                <table className="w-full text-sm">
                  <tbody>
                    {product.nutrition.rows.map((row, i) => (
                      <tr
                        key={row.label}
                        className={i % 2 === 0 ? 'bg-cream-100' : ''}
                      >
                        <td className="py-2.5 px-4 font-medium text-forest-700">{row.label}</td>
                        <td className="py-2.5 px-4 text-forest-600 text-right">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h4 className="font-semibold text-forest-700 text-sm mb-1">Shipping</h4>
                  <p className="text-sm text-forest-500">{product.shipping}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-forest-700 text-sm mb-1">Storage</h4>
                  <p className="text-sm text-forest-500">{product.storage}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-forest-700 text-sm mb-1">Returns & Refunds</h4>
                  <p className="text-sm text-forest-500">{product.returns}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-forest-800 mb-6">Customer Reviews</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-forest-600 font-semibold">
                        {review.name[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-forest-800">{review.name}</p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={`w-3.5 h-3.5 ${
                              n <= review.rating
                                ? 'fill-saffron-400 text-saffron-400'
                                : 'fill-cream-200 text-cream-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.sample && (
                      <span className="ml-auto text-xs text-forest-400">Sample</span>
                    )}
                  </div>
                  <h4 className="font-semibold text-forest-700 text-sm">{review.title}</h4>
                  <p className="text-sm text-forest-500 mt-1 leading-relaxed">{review.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-forest-800 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
