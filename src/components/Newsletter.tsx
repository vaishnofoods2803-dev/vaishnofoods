import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-forest-50">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl shadow-lg p-8 sm:p-12 border border-cream-200/60">
          <div className="w-16 h-16 rounded-full bg-saffron-500 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-8 h-8 text-forest-900" size={32} />
          </div>
          <h2 className="section-title">Stay in the Crunch!</h2>
          <p className="section-subtitle">
            Get updates about new flavours, offers, and delicious ways to enjoy makhana.
          </p>

          {subscribed ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-forest-600 animate-scale-in">
              <CheckCircle className="w-6 h-6 text-forest-600" />
              <span className="font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
          <p className="text-xs text-forest-400 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
