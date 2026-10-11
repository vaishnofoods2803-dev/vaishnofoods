import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Heart, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';

export default function Cart() {
  const { items, updateQty, remove, subtotal, mrpTotal, discount, shipping, total } = useCart();
  const { toggle } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container-page py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-forest-300" />
          </div>
          <h1 className="text-2xl font-bold text-forest-800">Your cart is empty</h1>
          <p className="text-forest-500 mt-2">
            Looks like you haven't added any makhana yet. Let's fix that!
          </p>
          <Link to="/shop" className="btn-primary mt-6 inline-flex">
            Shop Makhana
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold text-forest-800 mb-2">Shopping Cart</h1>
      <p className="text-forest-500 mb-8">{items.length} item(s) in your cart</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.weight}`}
              className="card p-4 flex gap-4 animate-fade-up"
            >
              <Link to={`/product/${item.slug}`} className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 rounded-xl object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.slug}`}>
                  <h3 className="font-semibold text-forest-800 hover:text-forest-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm text-forest-500 mt-0.5">Weight: {item.weight}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-lg font-bold text-forest-800">₹{item.price}</span>
                  <span className="text-sm text-forest-400 line-through">₹{item.mrp}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-cream-100 rounded-xl p-1">
                    <button
                      onClick={() => updateQty(item.productId, item.weight, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-forest-600 hover:bg-cream-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-forest-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.productId, item.weight, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-forest-600 hover:bg-cream-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const p = products.find((pr) => pr.id === item.productId);
                        if (p) toggle(p);
                      }}
                      aria-label="Move to wishlist"
                      className="text-forest-400 hover:text-saffron-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => remove(item.productId, item.weight)}
                      aria-label="Remove item"
                      className="text-forest-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm text-forest-400">Subtotal</p>
                <p className="text-lg font-bold text-forest-800">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-forest-600 font-medium hover:text-forest-800 transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-forest-800 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-forest-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-forest-600">
                <span>Discount</span>
                <span className="text-saffron-600">−₹{discount}</span>
              </div>
              <div className="flex justify-between text-forest-600">
                <span>Delivery</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              {subtotal > 0 && subtotal < 499 && (
                <p className="text-xs text-saffron-600 bg-saffron-400/10 rounded-lg p-2">
                  Add ₹{499 - subtotal} more for free shipping!
                </p>
              )}
              <div className="border-t border-cream-200 pt-3 flex justify-between text-base font-bold text-forest-800">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <p className="text-xs text-forest-400">Inclusive of all taxes</p>
            </div>
            <Link to="/checkout" className="btn-primary w-full mt-5">
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-forest-400 text-center mt-3">
              Saved MRP: ₹{mrpTotal - subtotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
