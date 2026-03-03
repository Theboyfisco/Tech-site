import { BentoProductCard } from "@/components/product/BentoProductCard";
import { dummyProducts, categories } from "@/lib/dummy-data";
import { ShieldCheck, Truck, Clock, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="min-h-screen pb-24">

      <main className="container mx-auto px-4 pt-12">
        {/* Hero Section */}
        <section className="mb-16 text-center sm:text-left flex flex-col items-center sm:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-border-subtle text-sm text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Same Day Delivery in Asaba
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-2xl">
            Premium Gadgets. <br />
            <span className="text-secondary font-medium">Unbeatable Prices.</span>
          </h1>
          <p className="text-lg text-secondary max-w-xl mb-8">
            The ultimate destination for authentic iPhones, MacBooks, and Android flagships. Delivered fast and secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="#featured" className="bg-primary text-base font-bold px-8 py-4 rounded-standard hover:bg-emerald-400 transition-colors shadow-glow text-center">
              Shop Featured Deals
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(category => (
              <Link href={`/category/${category.id}`} key={category.id} className="group relative h-40 rounded-standard overflow-hidden border border-border-subtle hover:border-primary/50 transition-colors">
                <Image 
                  src={category.image} 
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="text-white font-bold text-lg text-center drop-shadow-md">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust Indicators Section */}
        <section className="mb-24 bg-white/5 border border-white/5 rounded-2xl p-8 lg:p-12 hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-x divide-border-subtle/50">
            <div className="flex flex-col items-center text-center px-4">
              <Truck size={36} className="text-primary mb-4" />
              <h3 className="text-white font-bold mb-2">Fast Nationwide Delivery</h3>
              <p className="text-sm text-secondary">Same day for Asaba. 1-3 days for other cities.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <ShieldCheck size={36} className="text-primary mb-4" />
              <h3 className="text-white font-bold mb-2">Authentic Warranty</h3>
              <p className="text-sm text-secondary">Manufacturer warranty and our 6-month store guarantee.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <CreditCard size={36} className="text-primary mb-4" />
              <h3 className="text-white font-bold mb-2">Secure Payments</h3>
              <p className="text-sm text-secondary">Pay securely via Paystack, bank transfer, or crypto.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <Clock size={36} className="text-primary mb-4" />
              <h3 className="text-white font-bold mb-2">24/7 Support</h3>
              <p className="text-sm text-secondary">Our WhatsApp concierge is always available to help.</p>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section id="featured">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Featured Deals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyProducts.map((product, index) => (
              <Link href={`/product/${product.id}`} key={product.id} className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}>
                <BentoProductCard
                  product={product}
                  featured={index === 0}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
