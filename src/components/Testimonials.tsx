import { Star, Quote } from 'lucide-react';
import { reviews } from '@/data/products';
import Rating from './Rating';

export default function Testimonials() {
  return (
    <section className="py-20 bg-cream-100">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-saffron-600">
            Testimonials
          </span>
          <h2 className="section-title mt-2">What Our Customers Say</h2>
          <p className="section-subtitle">
            Real opinions from real snackers. (Shown as sample reviews for demonstration.)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review, i) => (
            <div
              key={review.id}
              className="card p-6 hover:shadow-lg transition-shadow animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Quote className="w-8 h-8 text-cream-300 mb-3" />
              <Rating value={review.rating} size="md" />
              <h4 className="font-semibold text-forest-800 mt-3">{review.title}</h4>
              <p className="text-sm text-forest-500 mt-2 leading-relaxed line-clamp-3">
                {review.body}
              </p>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-cream-200">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-forest-600 font-semibold">
                    {review.name[0]}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-forest-800">{review.name}</p>
                  <p className="text-xs text-forest-400">Sample review</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
