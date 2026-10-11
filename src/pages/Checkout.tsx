import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, CreditCard, Smartphone, Building2, Banknote, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { orderService } from '@/services/api';
import type { OrderAddress } from '@/types';

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Pay using any UPI app' },
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: Building2, desc: 'All major banks' },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' },
];

export default function Checkout() {
  const { items, subtotal, shipping, total, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<OrderAddress>({
    fullName: '',
    email: '',
    phone: '',
    house: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [payment, setPayment] = useState('upi');
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold text-forest-800">Your cart is empty</h1>
        <p className="text-forest-500 mt-2">Add some makhana before checking out.</p>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">
          Shop Makhana
        </Link>
      </div>
    );
  }

  const update = (key: keyof OrderAddress, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Required';
    if (!form.email.trim()) errs.email = 'Required';
    if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit number';
    if (!form.house.trim()) errs.house = 'Required';
    if (!form.street.trim()) errs.street = 'Required';
    if (!form.city.trim()) errs.city = 'Required';
    if (!form.state.trim()) errs.state = 'Required';
    if (!/^\d{6}$/.test(form.pincode)) errs.pincode = 'Enter a valid 6-digit PIN';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setPlacing(true);
    try {
      const order = await orderService.create(items, form, payment);
      const existing = localStorage.getItem('vf_orders');
      const orders = existing ? JSON.parse(existing) : [];
      orders.unshift(order);
      localStorage.setItem('vf_orders', JSON.stringify(orders));
      clear();
      navigate(`/order-success?id=${order.id}`);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold text-forest-800 mb-2">Checkout</h1>
      <p className="text-forest-500 mb-8">Complete your order in a few simple steps.</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer details */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-forest-600 text-cream-50 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <h2 className="text-lg font-semibold text-forest-800">Customer Details</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  className="input-field"
                  data-error={!!errors.fullName}
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="input-field"
                  data-error={!!errors.email}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-forest-700 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                  className="input-field"
                  data-error={!!errors.phone}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-forest-600 text-cream-50 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <h2 className="text-lg font-semibold text-forest-800">Delivery Address</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">House / Flat</label>
                <input
                  type="text"
                  value={form.house}
                  onChange={(e) => update('house', e.target.value)}
                  className="input-field"
                  data-error={!!errors.house}
                />
                {errors.house && <p className="text-xs text-red-500 mt-1">{errors.house}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">Street</label>
                <input
                  type="text"
                  value={form.street}
                  onChange={(e) => update('street', e.target.value)}
                  className="input-field"
                  data-error={!!errors.street}
                />
                {errors.street && <p className="text-xs text-red-500 mt-1">{errors.street}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  className="input-field"
                  data-error={!!errors.city}
                />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">State</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => update('state', e.target.value)}
                  className="input-field"
                  data-error={!!errors.state}
                />
                {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-forest-700 mb-1.5">PIN Code</label>
                <input
                  type="text"
                  value={form.pincode}
                  onChange={(e) => update('pincode', e.target.value)}
                  placeholder="6-digit PIN code"
                  className="input-field"
                  data-error={!!errors.pincode}
                />
                {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-forest-600 text-cream-50 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <h2 className="text-lg font-semibold text-forest-800">Payment Method</h2>
            </div>
            <div className="space-y-3">
              {paymentMethods.map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    payment === m.id
                      ? 'border-forest-600 bg-forest-50'
                      : 'border-cream-200 hover:border-cream-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id)}
                    className="w-4 h-4 text-forest-600 focus:ring-forest-500"
                  />
                  <m.icon className="w-6 h-6 text-forest-600" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-forest-800">{m.label}</p>
                    <p className="text-xs text-forest-500">{m.desc}</p>
                  </div>
                  {payment === m.id && <Check className="w-5 h-5 text-forest-600" />}
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-forest-400">
              <Lock className="w-4 h-4" />
              <span>
                Payment integration is a backend connection point — no actual payment will be processed.
              </span>
            </div>
          </div>
        </div>

        {/* Right: Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-forest-800 mb-4">Order Summary</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.weight}`} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-forest-800 truncate">{item.name}</p>
                    <p className="text-xs text-forest-500">
                      {item.weight} × {item.quantity}
                    </p>
                    <p className="text-sm font-semibold text-forest-700">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm border-t border-cream-200 pt-4">
              <div className="flex justify-between text-forest-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-forest-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-forest-800 border-t border-cream-200 pt-2">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="btn-primary w-full mt-5 disabled:opacity-60"
            >
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
