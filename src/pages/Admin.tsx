import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Home,
  Menu,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { products } from '@/data/products';
import type { Order } from '@/types';

type AdminSection = 'Overview' | 'Orders' | 'Products' | 'Inventory' | 'Customers';

const sales = [42, 58, 49, 72, 64, 86, 78, 92, 74, 88, 96, 82];
const fallbackOrders: Order[] = [
  {
    id: 'VF10025',
    date: new Date().toISOString(),
    items: [
      {
        productId: 'p3',
        slug: 'peri-peri-makhana',
        name: 'Peri Peri Makhana',
        image: products[2].images[0],
        weight: '250g',
        price: 349,
        mrp: 400,
        quantity: 2,
      },
      {
        productId: 'p1',
        slug: 'classic-roasted-makhana',
        name: 'Classic Roasted Makhana',
        image: products[0].images[0],
        weight: '500g',
        price: 499,
        mrp: 580,
        quantity: 1,
      },
    ],
    total: 1197,
    status: 'Placed',
    paymentMethod: 'UPI',
    address: {
      fullName: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '9876543210',
      house: '12A',
      street: 'Placeholder Avenue',
      city: 'Patna',
      state: 'Bihar',
      pincode: '800001',
    },
  },
  {
    id: 'VF10024',
    date: new Date(Date.now() - 86400000).toISOString(),
    items: [products[1]].map((product) => ({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      weight: '250g',
      price: product.prices[1].price,
      mrp: product.prices[1].mrp,
      quantity: 1,
    })),
    total: 309,
    status: 'Shipped',
    paymentMethod: 'Card',
    address: {
      fullName: 'Ananya Mehta',
      email: 'ananya@example.com',
      phone: '9812345678',
      house: '4B',
      street: 'Placeholder Road',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
    },
  },
];

const statusStyles: Record<Order['status'], string> = {
  Placed: 'bg-saffron-400/20 text-saffron-600',
  Confirmed: 'bg-blue-100 text-blue-700',
  Packed: 'bg-purple-100 text-purple-700',
  Shipped: 'bg-amber-100 text-amber-700',
  Delivered: 'bg-forest-100 text-forest-700',
};

function readOrders() {
  try {
    const stored = localStorage.getItem('vf_orders');
    return stored ? (JSON.parse(stored) as Order[]) : fallbackOrders;
  } catch {
    return fallbackOrders;
  }
}

export default function Admin() {
  const [section, setSection] = useState<AdminSection>('Overview');
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState('');
  const orders = useMemo(() => readOrders(), []);
  const visibleOrders = orders.filter((order) =>
    `${order.id} ${order.address.fullName}`.toLowerCase().includes(query.toLowerCase())
  );
  const lowStock = products.filter((product, index) => !product.inStock || index === 3).slice(0, 3);
  const metrics: { label: string; value: string; change: string; icon: LucideIcon }[] = [
    { label: 'Today’s sales', value: '₹24,680', change: '+12.8%', icon: CircleDollarSign },
    { label: 'Total orders', value: '148', change: '+8.4%', icon: ShoppingCart },
    { label: 'Customers', value: '1,284', change: '+14.2%', icon: Users },
    { label: 'Products', value: `${products.length}`, change: '2 low stock', icon: Package },
  ];

  const navItems: { label: AdminSection; icon: typeof Home }[] = [
    { label: 'Overview', icon: Home },
    { label: 'Orders', icon: ClipboardList },
    { label: 'Products', icon: Package },
    { label: 'Inventory', icon: ShoppingBag },
    { label: 'Customers', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-forest-900">
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-forest-900 text-cream-50 transition-transform lg:translate-x-0 ${
          mobileNav ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-cream-50/10 px-6">
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight">
            Vaishno<span className="text-saffron-400">Foods</span>
          </Link>
          <button className="lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>
        <div className="px-4 py-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cream-50/40">Workspace</p>
          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => {
                  setSection(label);
                  setMobileNav(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  section === label ? 'bg-cream-50 text-forest-900 shadow-lg' : 'text-cream-50/65 hover:bg-cream-50/10 hover:text-cream-50'
                }`}
              >
                <Icon size={18} />
                {label}
                {label === 'Orders' && <span className="ml-auto rounded-full bg-saffron-400 px-2 py-0.5 text-[10px] font-bold text-forest-900">{orders.length}</span>}
              </button>
            ))}
          </nav>
          <p className="mb-3 mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cream-50/40">System</p>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-cream-50/65 hover:bg-cream-50/10 hover:text-cream-50">
            <Settings size={18} /> Settings
          </button>
        </div>
        <div className="absolute bottom-0 w-full border-t border-cream-50/10 p-4">
          <Link to="/" className="flex items-center gap-3 rounded-xl bg-cream-50/10 px-3 py-3 text-xs text-cream-50/70 hover:bg-cream-50/15">
            <ArrowUpRight size={16} /> View storefront
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-forest-900/5 bg-[#f7f8f5]/90 px-4 backdrop-blur sm:px-8">
          <button className="rounded-lg p-2 hover:bg-white lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={22} /></button>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-400">Admin workspace</p>
            <h1 className="mt-1 text-xl font-bold text-forest-900">{section}</h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative rounded-xl border border-forest-900/10 bg-white p-2.5 text-forest-500"><Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-saffron-500" /></button>
            <div className="flex items-center gap-3 border-l border-forest-900/10 pl-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-saffron-400 font-bold text-forest-900">A</div>
              <div className="hidden text-left sm:block"><p className="text-sm font-bold">Admin</p><p className="text-xs text-forest-500">Store owner</p></div>
              <ChevronDown size={15} className="text-forest-400" />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-8">
          {section === 'Overview' && (
            <>
              <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div><p className="text-sm text-forest-500">Wednesday, 16 September 2026</p><h2 className="mt-1 text-3xl font-bold tracking-tight">Good evening, Admin</h2></div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-saffron-400/15 px-3 py-2 text-xs font-semibold text-saffron-600"><span className="h-2 w-2 rounded-full bg-saffron-500" /> Demo data · Connect backend to go live</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map(({ label, value, change, icon: Icon }) => (
                  <div key={label} className="rounded-2xl border border-forest-900/5 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between"><p className="text-sm text-forest-500">{label}</p><span className="rounded-xl bg-forest-50 p-2 text-forest-600"><Icon size={18} /></span></div>
                    <p className="mt-5 text-2xl font-bold tracking-tight">{value}</p><p className="mt-1 text-xs font-semibold text-forest-500">{change}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <div className="rounded-2xl border border-forest-900/5 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between"><div><h3 className="font-bold">Sales overview</h3><p className="mt-1 text-xs text-forest-500">Last 12 months · ₹ in thousands</p></div><button className="rounded-lg border border-forest-900/10 px-3 py-2 text-xs font-semibold text-forest-600">This year <ChevronDown size={13} className="ml-1 inline" /></button></div>
                  <div className="mt-8 flex h-52 items-end gap-2 border-b border-forest-900/10 px-2 sm:gap-4">{sales.map((height, index) => <div key={index} className="group flex h-full flex-1 items-end"><div style={{ height: `${height}%` }} className="w-full rounded-t-lg bg-forest-500/80 transition-all group-hover:bg-saffron-400" /></div>)}</div>
                  <div className="mt-3 flex justify-between px-1 text-[10px] text-forest-400">{['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month) => <span key={month}>{month}</span>)}</div>
                </div>
                <div className="rounded-2xl border border-forest-900/5 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h3 className="font-bold">Inventory alerts</h3><button onClick={() => setSection('Inventory')} className="text-xs font-semibold text-forest-600">View all <ArrowUpRight size={13} className="inline" /></button></div><div className="mt-5 space-y-4">{lowStock.map((product) => <div key={product.id} className="flex items-center gap-3"><img src={product.images[0]} alt="" className="h-11 w-11 rounded-lg object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{product.name}</p><p className="text-xs text-forest-500">Variant stock needs attention</p></div><AlertTriangle size={17} className="text-saffron-500" /></div>)}</div></div>
              </div>
            </>
          )}

          {(section === 'Orders' || section === 'Customers') && (
            <div className="rounded-2xl border border-forest-900/5 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-forest-900/5 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold">{section === 'Orders' ? 'Recent orders' : 'Customers'}</h2><p className="mt-1 text-xs text-forest-500">Manage your {section.toLowerCase()} in one place.</p></div><div className="relative"><Search size={16} className="absolute left-3 top-2.5 text-forest-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search orders..." className="w-full rounded-lg border border-forest-900/10 py-2 pl-9 pr-3 text-sm outline-none focus:border-forest-500 sm:w-64" /></div></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-forest-50/60 text-xs uppercase tracking-wide text-forest-500"><tr><th className="px-5 py-3">Order</th><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Items</th><th className="px-5 py-3">Total</th><th className="px-5 py-3">Payment</th><th className="px-5 py-3">Status</th></tr></thead><tbody className="divide-y divide-forest-900/5">{visibleOrders.map((order) => <tr key={order.id} className="hover:bg-forest-50/30"><td className="px-5 py-4 font-bold">#{order.id}</td><td className="px-5 py-4"><p className="font-semibold">{order.address.fullName}</p><p className="text-xs text-forest-500">{order.address.phone}</p></td><td className="max-w-[220px] px-5 py-4 text-xs text-forest-600">{order.items.map((item) => `${item.name} · ${item.weight} × ${item.quantity}`).join(', ')}</td><td className="px-5 py-4 font-bold">₹{order.total.toLocaleString('en-IN')}</td><td className="px-5 py-4 text-xs">{order.paymentMethod}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>{order.status}</span></td></tr>)}</tbody></table></div>
            </div>
          )}

          {(section === 'Products' || section === 'Inventory') && (
            <div className="rounded-2xl border border-forest-900/5 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-forest-900/5 p-5"><div><h2 className="font-bold">{section}</h2><p className="mt-1 text-xs text-forest-500">Variant-level catalog and stock overview.</p></div><button className="btn-primary px-4 py-2 text-xs"><Plus size={15} /> Add product</button></div><div className="divide-y divide-forest-900/5">{products.slice(0, 7).map((product, index) => <div key={product.id} className="flex items-center gap-4 p-4 sm:px-5"><img src={product.images[0]} alt="" className="h-14 w-14 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="font-semibold">{product.name}</p><p className="mt-1 text-xs text-forest-500">{product.prices.length} variants · From ₹{product.prices[0].price}</p></div><div className="hidden w-32 sm:block"><div className="mb-1 flex justify-between text-[11px] text-forest-500"><span>Stock</span><span>{index === 3 ? '8 units' : `${42 + index * 17} units`}</span></div><div className="h-1.5 rounded-full bg-forest-100"><div className={`h-full rounded-full ${index === 3 ? 'w-[18%] bg-saffron-500' : 'w-3/4 bg-forest-500'}`} /></div></div><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${index === 3 ? 'bg-saffron-400/20 text-saffron-600' : 'bg-forest-100 text-forest-700'}`}>{index === 3 ? 'Low stock' : 'In stock'}</span></div>)}</div></div>
          )}
        </main>
      </div>
    </div>
  );
}
