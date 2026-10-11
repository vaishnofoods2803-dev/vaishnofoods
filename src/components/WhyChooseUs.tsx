import { Link } from 'react-router-dom';
import { ShieldCheck, Package, Cookie, Truck } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    desc: 'Carefully selected makhana for consistent quality.',
  },
  {
    icon: Package,
    title: 'Fresh & Hygienically Packed',
    desc: 'Thoughtfully processed and packed to maintain freshness.',
  },
  {
    icon: Cookie,
    title: 'Delicious Snacking',
    desc: 'A versatile snack for everyday cravings.',
  },
  {
    icon: Truck,
    title: 'Direct to Your Door',
    desc: 'Order your favorite makhana online and receive it at home.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-cream-50">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-saffron-600">
            Why Choose Us
          </span>
          <h2 className="section-title mt-2">Why Choose VaishnoFoods?</h2>
          <p className="section-subtitle">
            We are committed to bringing you the finest makhana, with quality you can taste and
            trust you can rely on.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card p-6 text-center hover:shadow-xl hover:shadow-forest-900/5 hover:-translate-y-1 group animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-forest-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-forest-600 transition-all duration-300">
                <f.icon
                  className="w-8 h-8 text-forest-600 group-hover:text-cream-50 transition-colors duration-300"
                  size={32}
                />
              </div>
              <h3 className="text-lg font-semibold text-forest-800 mb-2">{f.title}</h3>
              <p className="text-sm text-forest-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
