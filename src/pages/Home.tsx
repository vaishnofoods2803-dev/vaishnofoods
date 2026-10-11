import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Flame, Globe, Coffee } from 'lucide-react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowWeWork from '@/components/HowWeWork';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import { products } from '@/data/products';

const STORY_IMG = 'https://images.pexels.com/photos/16379985/pexels-photo-16379985.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000';
const WHY_IMG = 'https://images.pexels.com/photos/35259683/pexels-photo-35259683.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000';
const PROMO_IMG = 'https://images.pexels.com/photos/5472169/pexels-photo-5472169.jpeg?auto=compress&cs=tinysrgb&h=600&w=1600';

export default function Home() {
  const featured = products.filter((p) => p.badge).slice(0, 4);
  const allProducts = products.slice(0, 6);

  return (
    <>
      <Hero />

      {/* Featured Products */}
      <section className="py-20 bg-cream-50">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="Bestsellers"
              title="Our Bestselling Makhana"
              subtitle="Sample products shown for demonstration. The most loved flavours, ready to crunch."
            />
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-forest-600 font-semibold hover:text-forest-800 transition-colors group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      {/* Why Makhana? teaser */}
      <section className="py-20 bg-cream-100">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={WHY_IMG}
                alt="A green lotus seed pod — the source of makhana"
                className="w-full h-[400px] lg:h-[480px] object-cover rounded-3xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-4 bg-forest-600 text-cream-50 rounded-2xl p-5 max-w-[200px] shadow-lg">
                <p className="text-3xl font-bold text-saffron-400">100%</p>
                <p className="text-sm">Naturally sourced, no artificial additives</p>
              </div>
            </div>
            <div className="space-y-5">
              <SectionHeading
                eyebrow="Learn"
                title="The Crunch Behind the Goodness"
                subtitle="Makhana, also known as fox nuts, comes from the seeds of the lotus plant — a tradition deeply rooted in Indian water ecosystems."
              />
              <div className="space-y-4">
                {[
                  {
                    icon: Leaf,
                    title: 'What is makhana?',
                    desc: 'Makhana are the popped seeds of the lotus flower, harvested from ponds and shallow water bodies.',
                  },
                  {
                    icon: Globe,
                    title: 'Where it comes from',
                    desc: 'Traditionally cultivated in regions like Bihar, where lotus ponds have sustained communities for generations.',
                  },
                  {
                    icon: Flame,
                    title: 'How it is made',
                    desc: 'Seeds are sun-dried, roasted, and popped by hand — a skill passed down through families.',
                  },
                  {
                    icon: Coffee,
                    title: 'How to enjoy it',
                    desc: 'As a roasted snack, in curries, kheer, or as a tea-time companion.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-forest-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5.5 h-5.5 text-forest-600" size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-forest-800">{item.title}</h4>
                      <p className="text-sm text-forest-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/why-makhana" className="btn-secondary mt-2">
                Learn More About Makhana
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story / About */}
      <section className="py-20 bg-cream-50">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5 order-2 lg:order-1">
              <SectionHeading
                eyebrow="Our Story"
                title="From Tradition to Your Table"
                subtitle="VaishnoFoods is a modern food brand inspired by the traditional Indian makhana ecosystem."
              />
              <p className="text-forest-500 leading-relaxed">
                We work closely with makhana cultivators to bring you a product that honours
                generations of expertise. Our mission is simple: make premium makhana accessible to
                every household, with quality you can trust.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: 'Our Mission', desc: 'To deliver pure, premium makhana to every home.' },
                  { label: 'Our Vision', desc: 'To be India\u2019s most trusted makhana brand.' },
                  { label: 'Sourcing', desc: 'Directly from traditional lotus pond ecosystems.' },
                  { label: 'Packaging', desc: 'Hygienic, food-grade, freshness-locking packs.' },
                ].map((item) => (
                  <div key={item.label} className="bg-cream-100 rounded-xl p-4">
                    <h4 className="font-semibold text-forest-700 text-sm">{item.label}</h4>
                    <p className="text-xs text-forest-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary mt-2">
                Know Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative order-1 lg:order-2">
              <img
                src={STORY_IMG}
                alt="Traditional makhana cultivation in a rural Indian pond"
                className="w-full h-[400px] lg:h-[480px] object-cover rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <HowWeWork />

      {/* Promo Banner */}
      <section className="py-20 bg-cream-50">
        <div className="container-page">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={PROMO_IMG}
              alt="A variety of mixed nuts and seeds"
              className="w-full h-[320px] lg:h-[380px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-forest-900/60 to-transparent flex items-center">
              <div className="px-8 sm:px-14 max-w-lg">
                <h2 className="text-3xl sm:text-4xl font-bold text-cream-50 leading-tight">
                  Stock Up on Your Favourite Makhana
                </h2>
                <p className="text-cream-200 mt-3 text-lg">
                  Discover premium makhana varieties for every craving.
                </p>
                <Link to="/shop" className="btn-saffron mt-5">
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="py-20 bg-cream-100">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Explore"
            title="Our Makhana Collection"
            subtitle="From classic roasted to bold peri peri — find your perfect crunch."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {allProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
}
