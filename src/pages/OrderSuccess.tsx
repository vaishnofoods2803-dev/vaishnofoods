import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, ArrowRight, Home as HomeIcon } from 'lucide-react';
import { orderService } from '@/services/api';
import type { Order } from '@/types';

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get('id');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      orderService.getById(orderId).then((o) => {
        setOrder(o ?? null);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-forest-500">Loading your order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold text-forest-800">Order not found</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="container-page py-10">
      <div className="max-w-2xl mx-auto">
        {/* Success header */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-12 h-12 text-forest-600" size={48} />
          </div>
          <h1 className="text-3xl font-bold text-forest-800">Order Placed Successfully!</h1>
          <p className="text-forest-500 mt-2">
            Thank you for your order. We will get your makhana on its way soon.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 bg-cream-100 rounded-full px-4 py-2">
            <span className="text-sm text-forest-600">Order ID:</span>
            <span className="text-sm font-bold text-forest-800">{order.id}</span>
          </div>
        </div>

        {/* Order details */}
        <div className="card p-6 mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-lg font-semibold text-forest-800 mb-4">Order Summary</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={`${item.productId}-${item.weight}`} className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-forest-800">{item.name}</p>
                  <p className="text-xs text-forest-500">
                    {item.weight} × {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold text-forest-700">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-cream-200 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-forest-600">
              <span>Payment Method</span>
              <span className="font-medium text-forest-700 uppercase">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-forest-800">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Delivery address */}
        <div className="card p-6 mb-6 animate-fade-up" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-forest-600" />
            <h2 className="text-lg font-semibold text-forest-800">Delivery Address</h2>
          </div>
          <div className="text-sm text-forest-600 space-y-1">
            <p className="font-medium text-forest-800">{order.address.fullName}</p>
            <p>{order.address.house}, {order.address.street}</p>
            <p>{order.address.city}, {order.address.state} — {order.address.pincode}</p>
            <p>Phone: {order.address.phone}</p>
          </div>
        </div>

        {/* Estimated delivery */}
        <div className="card p-6 mb-8 flex items-center gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="w-12 h-12 rounded-xl bg-saffron-400/20 flex items-center justify-center">
            <Truck className="w-6 h-6 text-saffron-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-forest-800">Estimated Delivery</p>
            <p className="text-sm text-forest-500">
              {estimatedDelivery.toLocaleDateString('en-IN', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: '250ms' }}>
          <Link to="/account" className="btn-primary flex-1">
            <Package className="w-5 h-5" />
            Track Order
          </Link>
          <Link to="/shop" className="btn-secondary flex-1">
            <HomeIcon className="w-5 h-5" />
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
