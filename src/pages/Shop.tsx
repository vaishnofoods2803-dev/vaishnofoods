import { useMemo, useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const flavours = ['Classic', 'Himalayan Salt', 'Peri Peri', 'Pudina', 'Masala', 'Plain'];
const categories = ['Roasted', 'Flavoured', 'Premium'];
const weights = ['100g', '250g', '500g'];

type SortKey = 'featured' | 'price-low' | 'price-high' | 'popularity' | 'newest';

export default function Shop() {
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState(800);
  const [sort, setSort] = useState<SortKey>('featured');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(6);

  const toggle = (
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedFlavours.length) {
      result = result.filter((p) => selectedFlavours.includes(p.flavour));
    }
    if (selectedCategories.length) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedWeights.length) {
      result = result.filter((p) =>
        p.prices.some((pr) => selectedWeights.includes(pr.weight))
      );
    }
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    result = result.filter((p) => p.prices[0].price <= priceRange);

    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.prices[0].price - b.prices[0].price);
        break;
      case 'price-high':
        result.sort((a, b) => b.prices[0].price - a.prices[0].price);
        break;
      case 'popularity':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      default:
        result.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
    }

    return result;
  }, [selectedFlavours, selectedCategories, selectedWeights, minRating, inStockOnly, priceRange, sort]);

  const clearAll = () => {
    setSelectedFlavours([]);
    setSelectedCategories([]);
    setSelectedWeights([]);
    setMinRating(0);
    setInStockOnly(false);
    setPriceRange(800);
  };

  const activeCount =
    selectedFlavours.length + selectedCategories.length + selectedWeights.length +
    (minRating > 0 ? 1 : 0) + (inStockOnly ? 1 : 0) + (priceRange < 800 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-semibold text-forest-800 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c)}
                onChange={() => toggle(c, selectedCategories, setSelectedCategories)}
                className="w-4 h-4 rounded border-cream-300 text-forest-600 focus:ring-forest-500"
              />
              <span className="text-sm text-forest-600 group-hover:text-forest-800 transition-colors">
                {c}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Flavours */}
      <div>
        <h4 className="font-semibold text-forest-800 mb-3">Flavour</h4>
        <div className="space-y-2">
          {flavours.map((f) => (
            <label key={f} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedFlavours.includes(f)}
                onChange={() => toggle(f, selectedFlavours, setSelectedFlavours)}
                className="w-4 h-4 rounded border-cream-300 text-forest-600 focus:ring-forest-500"
              />
              <span className="text-sm text-forest-600 group-hover:text-forest-800 transition-colors">
                {f}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Weight */}
      <div>
        <h4 className="font-semibold text-forest-800 mb-3">Weight</h4>
        <div className="flex flex-wrap gap-2">
          {weights.map((w) => (
            <button
              key={w}
              onClick={() => toggle(w, selectedWeights, setSelectedWeights)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedWeights.includes(w)
                  ? 'bg-forest-600 text-cream-50'
                  : 'bg-cream-100 text-forest-600 hover:bg-cream-200'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-semibold text-forest-800 mb-3">
          Max Price: <span className="text-saffron-600">₹{priceRange}</span>
        </h4>
        <input
          type="range"
          min="149"
          max="800"
          step="50"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-forest-600"
        />
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-semibold text-forest-800 mb-3">Rating</h4>
        <div className="space-y-2">
          {[4, 4.5, 0].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="w-4 h-4 border-cream-300 text-forest-600 focus:ring-forest-500"
              />
              <span className="text-sm text-forest-600 flex items-center gap-1">
                {r === 0 ? (
                  'All ratings'
                ) : (
                  <>
                    {r}+ <Star className="w-3.5 h-3.5 fill-saffron-400 text-saffron-400" />
                  </>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="font-semibold text-forest-800 mb-3">Availability</h4>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-cream-300 text-forest-600 focus:ring-forest-500"
          />
          <span className="text-sm text-forest-600">In stock only</span>
        </label>
      </div>

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="w-full py-2.5 rounded-lg border border-cream-300 text-sm font-medium text-forest-600 hover:bg-cream-100 transition-colors"
        >
          Clear All Filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="bg-forest-50 py-14">
        <div className="container-page text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-saffron-600">
            Shop
          </span>
          <h1 className="section-title mt-2">Shop Premium Makhana</h1>
          <p className="section-subtitle mx-auto max-w-xl">
            Find your favourite flavour and bring home the perfect crunch.
          </p>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-cream-200/60 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="w-5 h-5 text-forest-600" />
                <h3 className="font-semibold text-forest-800">Filters</h3>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-forest-500">
                Showing <span className="font-semibold text-forest-800">{filtered.length}</span> products
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-cream-300 text-sm font-medium text-forest-700"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-forest-600 text-cream-50 text-xs flex items-center justify-center">
                      {activeCount}
                    </span>
                  )}
                </button>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-lg bg-white border border-cream-300 text-sm font-medium text-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-500 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popularity">Popularity</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-semibold text-forest-700">No products found.</p>
                <p className="text-sm text-forest-400 mt-2">Try adjusting your filters.</p>
                <button onClick={clearAll} className="btn-secondary mt-4">
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.slice(0, visible).map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
                {visible < filtered.length && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setVisible(visible + 3)}
                      className="btn-secondary"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-forest-900/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
        <div
          className={`absolute left-0 top-0 h-full w-80 bg-cream-50 shadow-2xl transition-transform duration-300 overflow-y-auto ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200 sticky top-0 bg-cream-50 z-10">
            <h3 className="font-semibold text-forest-800">Filters</h3>
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
              className="w-8 h-8 rounded-full flex items-center justify-center text-forest-500 hover:bg-cream-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-5">
            <FilterContent />
            <button
              onClick={() => setDrawerOpen(false)}
              className="btn-primary w-full mt-6"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
