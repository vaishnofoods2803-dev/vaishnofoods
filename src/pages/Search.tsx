import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { searchProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const r = searchProducts(query);
    setResults(r);
    setLoading(false);
  }, [query]);

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 text-forest-500 mb-3">
          <SearchIcon className="w-5 h-5" />
          <span className="text-sm">Search results for</span>
        </div>
        <h1 className="text-3xl font-bold text-forest-800">"{query}"</h1>
        <p className="text-forest-500 mt-2">
          {loading ? 'Searching...' : `${results.length} product(s) found`}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="card p-4 animate-pulse">
              <div className="w-full h-56 bg-cream-200 rounded-xl mb-4" />
              <div className="h-4 bg-cream-200 rounded w-1/3 mb-2" />
              <div className="h-5 bg-cream-200 rounded w-2/3 mb-3" />
              <div className="h-4 bg-cream-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-5">
            <SearchIcon className="w-10 h-10 text-forest-300" size={40} />
          </div>
          <h2 className="text-xl font-bold text-forest-800">No products found.</h2>
          <p className="text-forest-500 mt-2">
            We couldn't find any makhana matching "{query}". Try a different search.
          </p>
          <Link to="/shop" className="btn-primary mt-6 inline-flex">
            Browse All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
