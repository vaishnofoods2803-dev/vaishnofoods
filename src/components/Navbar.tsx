import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Leaf,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About Us', path: '/about' },
  { label: 'Why Makhana?', path: '/why-makhana' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { count, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-cream-50/95 backdrop-blur-md shadow-sm py-2'
            : 'bg-cream-50 py-4'
        }`}
      >
        <nav className="container-page flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-forest-600 flex items-center justify-center">
              <Leaf className="w-5.5 h-5.5 text-cream-50" size={22} />
            </div>
            <div className="leading-none">
              <span className="block text-xl font-serif font-bold text-forest-700">
                Vaishno<span className="text-saffron-600">Foods</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-forest-400">
                Premium Makhana
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-forest-700 bg-cream-200'
                        : 'text-forest-600 hover:text-forest-800 hover:bg-cream-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="w-10 h-10 rounded-full flex items-center justify-center text-forest-600 hover:bg-cream-200 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to={user ? '/account' : '/login'}
              aria-label="Account"
              className="w-10 h-10 rounded-full flex items-center justify-center text-forest-600 hover:bg-cream-200 transition-colors relative"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              to="/account"
              aria-label="Wishlist"
              className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center text-forest-600 hover:bg-cream-200 transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-saffron-500 text-forest-900 text-[10px] font-bold flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              aria-label="Cart"
              className="w-10 h-10 rounded-full flex items-center justify-center text-forest-600 hover:bg-cream-200 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-saffron-500 text-forest-900 text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-forest-600 hover:bg-cream-200 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>

        {/* Search bar */}
        {searchOpen && (
          <div className="container-page mt-2 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for makhana flavours..."
                autoFocus
                className="w-full pl-12 pr-4 py-3 rounded-full border border-cream-300 bg-white text-forest-800 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-400" />
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-forest-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-cream-50 shadow-2xl transition-transform duration-300 flex flex-col ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
            <span className="font-serif font-bold text-lg text-forest-700">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 rounded-full flex items-center justify-center text-forest-500 hover:bg-cream-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <ul className="flex-1 px-3 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-forest-700 bg-cream-200'
                        : 'text-forest-600 hover:bg-cream-100'
                    }`
                  }
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4" />
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-forest-600 hover:bg-cream-100 transition-all"
              >
                Wishlist & Account
                <ChevronRight className="w-4 h-4" />
              </Link>
            </li>
          </ul>
          <div className="px-5 py-4 border-t border-cream-200">
            <Link
              to={user ? '/account' : '/login'}
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full"
            >
              {user ? 'My Account' : 'Login / Register'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
