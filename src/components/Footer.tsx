import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Youtube, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About Us', path: '/about' },
  { label: 'Why Makhana?', path: '/why-makhana' },
  { label: 'Contact', path: '/contact' },
];

const supportLinks = [
  { label: 'Shipping Policy', path: '/contact' },
  { label: 'Return Policy', path: '/contact' },
  { label: 'Privacy Policy', path: '/contact' },
  { label: 'Terms & Conditions', path: '/contact' },
  { label: 'FAQs', path: '/contact' },
];

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: MessageCircle, label: 'WhatsApp', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-forest-800 text-cream-200 mt-20">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-saffron-500 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-forest-900" size={22} />
              </div>
              <span className="text-xl font-serif font-bold text-cream-50">
                Vaishno<span className="text-saffron-400">Foods</span>
              </span>
            </div>
            <p className="text-sm text-cream-300 leading-relaxed">
              Premium makhana for everyday snacking. Carefully selected, hygienically packed, and
              delivered fresh to your door.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-forest-700 flex items-center justify-center text-cream-300 hover:bg-saffron-500 hover:text-forest-900 transition-all duration-300"
                >
                  <s.icon className="w-4.5 h-4.5" size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cream-50 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="text-sm text-cream-300 hover:text-saffron-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-cream-50 font-semibold mb-4">Customer Support</h4>
            <ul className="space-y-2.5">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="text-sm text-cream-300 hover:text-saffron-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream-50 font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-cream-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-saffron-400" />
                <span>[Company address placeholder]</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-saffron-400" />
                <span>[Phone number placeholder]</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-saffron-400" />
                <span>[Email placeholder]</span>
              </li>
            </ul>
            <p className="text-xs text-cream-400 mt-4">Business hours: Mon–Sat, 9 AM – 6 PM IST</p>
          </div>
        </div>
      </div>

      <div className="border-t border-forest-700">
        <div className="container-page py-5 text-center text-sm text-cream-400">
          &copy; 2026 VaishnoFoods. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
