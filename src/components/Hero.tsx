import { Link } from 'react-router-dom';
import { ArrowRight, Sprout } from 'lucide-react';

const HERO_IMG = 'https://images.pexels.com/photos/7051132/pexels-photo-7051132.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200';
const HERO_IMG_2 = 'https://images.pexels.com/photos/57042/pexels-photo-57042.jpeg?auto=compress&cs=tinysrgb&h=600&w=600';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-100 via-cream-50 to-forest-50">
      <div className="container-page py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-100 text-forest-700 text-sm font-medium">
              <Sprout className="w-4 h-4" />
              Naturally sourced from Indian ponds
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-800 leading-[1.1]">
              Pure Makhana.
              <br />
              <span className="text-saffron-600">Naturally Better.</span>
            </h1>
            <p className="text-lg text-forest-500 max-w-md leading-relaxed">
              Premium quality fox nuts, carefully selected and packed for your everyday healthy
              snacking.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/shop" className="btn-primary">
                Shop Makhana
                <ArrowRight className="w-4.5 h-4.5" size={18} />
              </Link>
              <Link to="/about" className="btn-secondary">
                Explore Our Story
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-forest-900/10">
              <img
                src={HERO_IMG}
                alt="A rustic bowl filled with premium makhana (fox nuts)"
                className="w-full h-[420px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/20 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-[220px]">
              <img
                src={HERO_IMG_2}
                alt="Close-up of roasted makhana"
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-forest-800">Jumbo Makhana</p>
                <p className="text-xs text-forest-500">Extra-large & crunchy</p>
                <p className="text-sm font-bold text-saffron-600 mt-1">From ₹219</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-cream-200 bg-cream-50/80 backdrop-blur-sm">
        <div className="container-page py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Premium Quality' },
              { label: 'Freshly Packed' },
              { label: 'Hygienically Processed' },
              { label: 'Delivered to Your Door' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-2 text-center">
                <div className="w-2 h-2 rounded-full bg-saffron-500 flex-shrink-0" />
                <span className="text-sm font-medium text-forest-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
