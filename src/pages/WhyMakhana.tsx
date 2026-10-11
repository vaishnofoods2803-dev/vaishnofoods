import { Link } from 'react-router-dom';
import { Leaf, Globe, Flame, Coffee, Soup, Sprout, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

const HERO_IMG = 'https://images.pexels.com/photos/35259683/pexels-photo-35259683.jpeg?auto=compress&cs=tinysrgb&h=600&w=1600';
const SECTION_IMG = 'https://images.pexels.com/photos/16379985/pexels-photo-16379985.jpeg?auto=compress&cs=tinysrgb&h=500&w=600';
const WAYS_IMG = 'https://images.pexels.com/photos/5472169/pexels-photo-5472169.jpeg?auto=compress&cs=tinysrgb&h=500&w=600';

export default function WhyMakhana() {
  const sections = [
    {
      icon: Leaf,
      title: 'What is Makhana?',
      desc: 'Makhana, also known as fox nuts, comes from the seeds of the lotus flower (Nelumbo nucifera). The seeds are harvested, dried, roasted, and popped to produce the light, puffy, crunchy snack that is enjoyed across India. Unlike many snacks, makhana is naturally light and airy.',
    },
    {
      icon: Globe,
      title: 'Where It Comes From',
      desc: 'Makhana is traditionally cultivated in the shallow ponds and wetlands of Bihar, particularly in the Mithila region. The lotus plants grow in these ponds, and skilled cultivators harvest the seeds by hand. This ecosystem has supported local communities for generations.',
    },
    {
      icon: Sprout,
      title: 'How It Is Traditionally Produced',
      desc: 'The process is labour-intensive and requires great skill. Seeds are collected from the pond, sun-dried, sorted by size, and then roasted in hot sand or iron pans at precise temperatures. Each seed is then popped by hand — a technique that takes years to master.',
    },
    {
      icon: Coffee,
      title: 'Why It Has Become Popular',
      desc: 'Makhana is naturally light, crunchy, and versatile. As more people look for alternatives to fried snacks, makhana has found its way into modern kitchens as a tea-time companion, a topping for salads and curries, and a standalone roasted snack in dozens of flavours.',
    },
  ];

  const ways = [
    { icon: Soup, label: 'As a roasted snack', desc: 'With salt, spices, or your favourite seasoning.' },
    { icon: Flame, label: 'In curries & gravies', desc: 'Makhana kofta and makhana curry are classics.' },
    { icon: Coffee, label: 'In kheer & desserts', desc: 'A traditional ingredient in festive sweets.' },
    { icon: Leaf, label: 'As a salad topping', desc: 'Adds crunch without the oil of croutons.' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <img
          src={HERO_IMG}
          alt="A green lotus seed pod — the natural source of makhana"
          className="w-full h-[320px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 to-forest-900/30 flex items-center">
          <div className="container-page">
            <div className="max-w-xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-saffron-400">
                Learn
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 mt-2">
                The Crunch Behind the Goodness
              </h1>
              <p className="text-cream-200 mt-3 text-lg">
                Discover what makhana is, where it comes from, and why it has become one of India's
                most loved snacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational sections */}
      <section className="py-16 bg-cream-50">
        <div className="container-page space-y-16">
          {sections.map((section, i) => (
            <div
              key={section.title}
              className={`grid lg:grid-cols-2 gap-10 items-center ${
                i % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-14 h-14 rounded-2xl bg-forest-100 flex items-center justify-center mb-4">
                  <section.icon className="w-7 h-7 text-forest-600" size={28} />
                </div>
                <h2 className="text-2xl font-bold text-forest-800 mb-3">{section.title}</h2>
                <p className="text-forest-500 leading-relaxed">{section.desc}</p>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <img
                  src={i % 2 === 0 ? SECTION_IMG : WAYS_IMG}
                  alt={section.title}
                  className="w-full h-[320px] object-cover rounded-3xl shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ways to enjoy */}
      <section className="py-16 bg-cream-100">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Versatility"
            title="Different Ways to Enjoy Makhana"
            subtitle="Makhana is incredibly versatile — here are some popular ways people enjoy it."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {ways.map((way, i) => (
              <div
                key={way.label}
                className="card p-6 text-center hover:shadow-lg transition-shadow animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-saffron-400/20 flex items-center justify-center mx-auto mb-4">
                  <way.icon className="w-7 h-7 text-saffron-600" size={28} />
                </div>
                <h3 className="font-semibold text-forest-800 mb-2">{way.label}</h3>
                <p className="text-sm text-forest-500">{way.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream-50 text-center">
        <div className="container-page max-w-xl">
          <h2 className="section-title">Ready to Try Premium Makhana?</h2>
          <p className="section-subtitle">
            Explore our range of flavours and find your perfect crunch.
          </p>
          <Link to="/shop" className="btn-primary mt-6">
            Shop Makhana
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
