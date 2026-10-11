import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, ShieldCheck, Sprout, Package, Heart } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

const STORY_IMG = 'https://images.pexels.com/photos/16379985/pexels-photo-16379985.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000';
const STORY_IMG_2 = 'https://images.pexels.com/photos/34086126/pexels-photo-34086126.jpeg?auto=compress&cs=tinysrgb&h=600&w=800';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      desc: 'To deliver pure, premium makhana to every home — making healthy snacking simple, accessible, and genuinely delicious.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      desc: 'To be India\u2019s most trusted makhana brand, known for quality, transparency, and respect for the communities that cultivate it.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Philosophy',
      desc: 'Every batch is graded for size, roasted with care, and tested for freshness before it reaches you. No shortcuts.',
    },
    {
      icon: Sprout,
      title: 'Sourcing Philosophy',
      desc: 'We work directly with traditional lotus pond cultivators, honouring a craft that has sustained communities for generations.',
    },
    {
      icon: Package,
      title: 'Packaging Philosophy',
      desc: 'Food-grade, hygienic packaging designed to lock in crunch and freshness from our facility to your door.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      desc: 'Every decision we make starts with a simple question: would we be happy receiving this ourselves?',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-50 to-cream-100 py-16">
        <div className="container-page text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-saffron-600">
            About Us
          </span>
          <h1 className="section-title mt-2">From Tradition to Your Table</h1>
          <p className="section-subtitle">
            VaishnoFoods is a modern food brand inspired by the traditional Indian makhana ecosystem.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-cream-50">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={STORY_IMG}
              alt="Traditional lotus pond cultivation in rural India"
              className="w-full h-[400px] lg:h-[480px] object-cover rounded-3xl shadow-xl"
            />
          </div>
          <div className="space-y-5">
            <SectionHeading eyebrow="Our Story" title="Rooted in Tradition" />
            <p className="text-forest-500 leading-relaxed">
              Makhana has been a part of Indian culture for centuries — grown in the shallow ponds
              of states like Bihar, where lotus plants thrive and skilled hands harvest, dry, and
              pop the seeds. It is a craft passed down through families, and it deserves to be
              celebrated.
            </p>
            <p className="text-forest-500 leading-relaxed">
              VaishnoFoods was born from a simple idea: take this extraordinary snack, apply modern
              standards of quality and hygiene, and make it accessible to every household in India
              and beyond. We work closely with cultivators, invest in careful processing, and pack
              every batch with the respect it deserves.
            </p>
            <p className="text-forest-500 leading-relaxed">
              Today, we offer a range of flavours — from the everyday classic to bold peri peri —
              all built on the same foundation: pure, premium makhana, roasted to perfect crunch.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-cream-100">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="What Drives Us"
            title="Our Values & Philosophy"
            subtitle="The principles that guide every decision, from sourcing to your doorstep."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="card p-6 hover:shadow-lg transition-shadow animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-forest-600" size={24} />
                </div>
                <h3 className="font-semibold text-forest-800 mb-2">{v.title}</h3>
                <p className="text-sm text-forest-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream-50">
        <div className="container-page">
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img
              src={STORY_IMG_2}
              alt="Natural spices and ingredients"
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 to-forest-900/40 flex items-center">
              <div className="px-8 sm:px-14 max-w-lg">
                <h2 className="text-3xl font-bold text-cream-50">Taste the Tradition</h2>
                <p className="text-cream-200 mt-2">
                  Explore our range of premium makhana flavours.
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
    </>
  );
}
