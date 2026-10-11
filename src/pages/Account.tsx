import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ShoppingBag,
  Trash2,
  Eye,
  CheckCircle,
  Box,
  Truck,
  Home as HomeIcon,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';
import type { Order } from '@/types';

type Tab = 'profile' | 'orders' | 'wishlist' | 'addresses' | 'settings';

const orderStatuses = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];

export default function Account() {
  const { user, logout } = useAuth();
  const { items: wishlistItems, remove: removeWish } = useWishlist();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('vf_orders');
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch { /* ignore */ }
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="container-page py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-5">
            <UserIcon className="w-10 h-10 text-forest-300" size={40} />
          </div>
          <h1 className="text-2xl font-bold text-forest-800">Please Log In</h1>
          <p className="text-forest-500 mt-2">Log in to view your account, orders, and wishlist.</p>
          <div className="flex gap-3 justify-center mt-6">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: typeof UserIcon }[] = [
    { key: 'profile', label: 'Profile', icon: UserIcon },
    { key: 'orders', label: 'My Orders', icon: Package },
    { key: 'wishlist', label: 'Wishlist', icon: Heart },
    { key: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { key: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="container-page py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-forest-600 text-cream-50 flex items-center justify-center text-xl font-bold">
          {user.name[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-forest-800">{user.name}</h1>
          <p className="text-sm text-forest-500">{user.email}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card p-3 space-y-1 sticky top-24">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-forest-600 text-cream-50'
                    : 'text-forest-600 hover:bg-cream-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {tab.key === 'wishlist' && wishlistItems.length > 0 && (
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.key ? 'bg-cream-50/20' : 'bg-saffron-400/20 text-saffron-600'
                  }`}>
                    {wishlistItems.length}
                  </span>
                )}
                {tab.key === 'orders' && orders.length > 0 && (
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.key ? 'bg-cream-50/20' : 'bg-forest-100 text-forest-600'
                  }`}>
                    {orders.length}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-semibold text-forest-800 mb-5">Profile Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-1.5">Full Name</label>
                  <input type="text" value={user.name} readOnly className="input-field bg-cream-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-1.5">Email</label>
                  <input type="email" value={user.email} readOnly className="input-field bg-cream-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-1.5">Phone</label>
                  <input type="tel" placeholder="Not set" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-1.5">Date of Birth</label>
                  <input type="date" className="input-field" />
                </div>
              </div>
              <button className="btn-primary mt-5">Save Changes</button>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-forest-800 mb-2">My Orders</h2>
              {orders.length === 0 ? (
                <div className="card p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-forest-300" size={32} />
                  </div>
                  <h3 className="font-semibold text-forest-700">No orders yet</h3>
                  <p className="text-sm text-forest-500 mt-1">Your orders will appear here.</p>
                  <Link to="/shop" className="btn-secondary mt-4">Start Shopping</Link>
                </div>
              ) : (
                orders.map((order) => {
                  const statusIndex = orderStatuses.indexOf(order.status);
                  return (
                    <div key={order.id} className="card p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div>
                          <p className="text-sm font-bold text-forest-800">Order #{order.id}</p>
                          <p className="text-xs text-forest-500">
                            {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'Delivered' ? 'bg-forest-100 text-forest-700' : 'bg-saffron-400/20 text-saffron-600'
                          }`}>
                            {order.status}
                          </span>
                          <span className="text-lg font-bold text-forest-800">₹{order.total}</span>
                        </div>
                      </div>

                      {/* Status tracker */}
                      <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
                        {orderStatuses.map((status, i) => (
                          <div key={status} className="flex items-center gap-1 flex-shrink-0">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                              i <= statusIndex ? 'bg-forest-600 text-cream-50' : 'bg-cream-200 text-forest-400'
                            }`}>
                              {i <= statusIndex ? <CheckCircle className="w-4 h-4" /> : i + 1}
                            </div>
                            {i < orderStatuses.length - 1 && (
                              <div className={`w-6 h-0.5 ${i < statusIndex ? 'bg-forest-600' : 'bg-cream-200'}`} />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 overflow-x-auto">
                        {order.items.map((item) => (
                          <img
                            key={`${item.productId}-${item.weight}`}
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-forest-800 mb-4">My Wishlist</h2>
              {wishlistItems.length === 0 ? (
                <div className="card p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-forest-300" size={32} />
                  </div>
                  <h3 className="font-semibold text-forest-700">Your wishlist is empty</h3>
                  <p className="text-sm text-forest-500 mt-1">Save your favourite makhana here.</p>
                  <Link to="/shop" className="btn-secondary mt-4">Browse Products</Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => {
                    const product = products.find((p) => p.id === item.productId);
                    return (
                      <div key={item.productId} className="card p-4 flex gap-3">
                        <Link to={`/product/${item.slug}`}>
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.slug}`}>
                            <h3 className="font-semibold text-forest-800 text-sm hover:text-forest-600 transition-colors">{item.name}</h3>
                          </Link>
                          <p className="text-sm font-bold text-forest-700 mt-1">₹{item.price}</p>
                          <div className="flex gap-2 mt-2">
                            {product && (
                              <Link
                                to={`/product/${item.slug}`}
                                className="text-xs font-medium text-forest-600 hover:text-forest-800 flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" /> View
                              </Link>
                            )}
                            <button
                              onClick={() => removeWish(item.productId)}
                              className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-semibold text-forest-800 mb-5">Saved Addresses</h2>
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-3">
                  <HomeIcon className="w-8 h-8 text-forest-300" size={32} />
                </div>
                <p className="text-sm text-forest-500">No saved addresses yet.</p>
                <p className="text-xs text-forest-400 mt-1">Addresses from your orders will be saved here.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-semibold text-forest-800 mb-5">Account Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-cream-100 rounded-xl">
                  <div>
                    <p className="font-medium text-forest-800 text-sm">Email Notifications</p>
                    <p className="text-xs text-forest-500">Receive updates about orders and offers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-cream-300 peer-focus:ring-2 peer-focus:ring-forest-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-cream-100 rounded-xl">
                  <div>
                    <p className="font-medium text-forest-800 text-sm">SMS Notifications</p>
                    <p className="text-xs text-forest-500">Order updates via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-cream-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-600"></div>
                  </label>
                </div>
                <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
