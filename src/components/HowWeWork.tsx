import { Search, Hand, Flame, Package, Truck } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Carefully Selected',
    desc: 'We source quality makhana from trusted pond ecosystems, grading each batch for size and consistency.',
  },
  {
    num: '02',
    icon: Flame,
    title: 'Processed',
    desc: 'The makhana is carefully roasted and seasoned using traditional methods and clean, modern equipment.',
  },
  {
    num: '03',
    icon: Package,
    title: 'Packed',
    desc: 'Each batch is hygienically packed in food-grade packaging to lock in freshness and crunch.',
  },
  {
    num: '04',
    icon: Truck,
    title: 'Delivered',
    desc: 'Your order is dispatched quickly and delivered directly to your doorstep, ready to enjoy.',
  },
];

export default function HowWeWork() {
  return (
    <section className="py-20 bg-forest-800 text-cream-100">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-saffron-400">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 mt-2">
            How We Work
          </h2>
          <p className="text-cream-300 mt-3">
            From pond to package, every step is handled with care.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:grid grid-cols-4 gap-0 relative">
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-forest-600" />
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative flex flex-col items-center text-center px-4 animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="w-20 h-20 rounded-full bg-saffron-500 text-forest-900 flex items-center justify-center z-10 shadow-lg">
                <step.icon size={32} />
              </div>
              <span className="text-saffron-400 text-sm font-bold mt-4">{step.num}</span>
              <h3 className="text-lg font-semibold text-cream-50 mt-1">{step.title}</h3>
              <p className="text-sm text-cream-300 mt-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden space-y-8 relative">
          <div className="absolute left-10 top-4 bottom-4 w-0.5 bg-forest-600" />
          {steps.map((step) => (
            <div key={step.num} className="flex gap-4 items-start">
              <div className="w-20 h-20 rounded-full bg-saffron-500 text-forest-900 flex items-center justify-center flex-shrink-0 z-10 shadow-lg">
                <step.icon size={28} />
              </div>
              <div className="pt-3">
                <span className="text-saffron-400 text-sm font-bold">{step.num}</span>
                <h3 className="text-lg font-semibold text-cream-50">{step.title}</h3>
                <p className="text-sm text-cream-300 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
