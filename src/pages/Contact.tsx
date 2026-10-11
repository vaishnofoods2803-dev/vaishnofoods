import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { contactService } from '@/services/api';

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: MessageCircle, label: 'WhatsApp', href: '#' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await contactService.sendMessage(form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-50 to-cream-100 py-14">
        <div className="container-page text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-saffron-600">
            Contact
          </span>
          <h1 className="section-title mt-2">We'd Love to Hear From You</h1>
          <p className="section-subtitle">
            Questions, feedback, or just want to say hello? Reach out and we'll get back to you.
          </p>
        </div>
      </section>

      <section className="py-14 bg-cream-50">
        <div className="container-page grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-forest-800 mb-5">Send a Message</h2>

              {sent ? (
                <div className="text-center py-10 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-forest-600" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-forest-800">Message Sent!</h3>
                  <p className="text-sm text-forest-500 mt-2">
                    Thank you for reaching out. We'll respond to your message soon.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-secondary mt-5"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-forest-700 mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-forest-700 mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-forest-700 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-forest-700 mb-1.5">Subject</label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => update('subject', e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest-700 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="input-field resize-none"
                    />
                  </div>
                  <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto disabled:opacity-60">
                    {sending ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="card p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-forest-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-forest-800 text-sm">Address</h3>
                  <p className="text-sm text-forest-500 mt-1">[Company address placeholder]</p>
                </div>
              </div>
            </div>
            <div className="card p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-forest-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-forest-800 text-sm">Phone</h3>
                  <p className="text-sm text-forest-500 mt-1">[Phone number placeholder]</p>
                </div>
              </div>
            </div>
            <div className="card p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-forest-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-forest-800 text-sm">Email</h3>
                  <p className="text-sm text-forest-500 mt-1">[Email placeholder]</p>
                </div>
              </div>
            </div>
            <div className="card p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-forest-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-forest-800 text-sm">Business Hours</h3>
                  <p className="text-sm text-forest-500 mt-1">Monday – Saturday</p>
                  <p className="text-sm text-forest-500">9:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-forest-800 text-sm mb-3">Follow Us</h3>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center text-forest-600 hover:bg-forest-600 hover:text-cream-50 transition-all"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
