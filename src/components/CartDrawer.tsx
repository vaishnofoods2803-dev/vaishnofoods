import { X, ShoppingBag, Plus, Minus, Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, remove, subtotal, shipping, total, count } = useCart();
  const { toggle } = useWishlist();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-forest-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-cream-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-forest-600" />
            <h3 className="text-lg font-semibold text-forest-800">
              Your Cart {count > 0 && `(${count})`}
            </h3>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full flex items-center justify-center text-forest-500 hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-forest-300" />
            </div>
            <p className="text-forest-500 font-medium">Your cart is empty</p>
            <p className="text-sm text-forest-400">Add some delicious makhana to get started!</p>
            <Link to="/shop" onClick={closeCart} className="btn-primary mt-2">
              Shop Makhana
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.weight}`}
                  className="flex gap-3 bg-white rounded-xl p-3 border border-cream-200/60 animate-scale-in"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-forest-800 truncate">{item.name}</h4>
                    <p className="text-xs text-forest-500 mt-0.5">{item.weight}</p>
                    <p className="text-sm font-bold text-forest-700 mt-1">₹{item.price}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQty(item.productId, item.weight, item.quantity - 1)}
                          className="w-7 h-7 rounded-md bg-cream-100 flex items-center justify-center text-forest-600 hover:bg-cream-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-forest-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, item.weight, item.quantity + 1)}
                          className="w-7 h-7 rounded-md bg-cream-100 flex items-center justify-center text-forest-600 hover:bg-cream-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const p = products.find((pr) => pr.id === item.productId);
                            if (p) toggle(p);
                            remove(item.productId, item.weight);
                          }}
                          aria-label="Move to wishlist"
                          className="text-forest-400 hover:text-saffron-500 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => remove(item.productId, item.weight)}
                          aria-label="Remove item"
                          className="text-forest-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-cream-200 px-5 py-4 space-y-2 bg-white">
              <div className="flex justify-between text-sm text-forest-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-forest-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              {subtotal > 0 && subtotal < 499 && (
                <p className="text-xs text-saffron-600">
                  Add ₹{499 - subtotal} more for free shipping!
                </p>
              )}
              <div className="flex justify-between text-base font-bold text-forest-800 pt-2 border-t border-cream-200">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="btn-primary w-full mt-3"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/cart"
                onClick={closeCart}
                className="block text-center text-sm text-forest-600 hover:text-forest-800 mt-2 transition-colors"
              >
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
