"use client";

import Image from "next/image";
import Link from "next/link";
import { categories, getFeaturedProducts, getNewArrivals } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-primary">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80"
            alt="Luxury living room"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
              Premium Home Furniture
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-fade-in-up animation-delay-100">
              Design Your
              <span className="text-accent block">Dream Home</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mt-6 leading-relaxed animate-fade-in-up animation-delay-200 max-w-lg">
              Discover handpicked furniture that transforms your space. Premium quality, stunning designs, unbeatable prices.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 animate-fade-in-up animation-delay-300">
              <Link
                href="/products"
                className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                Shop Collection
              </Link>
              <Link
                href="/categories/sofas-loveseats"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-lg transition-all backdrop-blur-sm border border-white/20"
              >
                Browse Sofas
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 animate-fade-in-up animation-delay-400">
              {[
                { value: "500+", label: "Products" },
                { value: "10K+", label: "Happy Customers" },
                { value: "Free", label: "Shipping $2.5K+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-accent">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-surface border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "M5 13l4 4L19 7", title: "Premium Quality", desc: "Handpicked furniture" },
              { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", title: "Free Shipping", desc: "Orders over $2,500" },
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "1-Year Warranty", desc: "Manufacturer backed" },
              { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", title: "Expert Support", desc: "Dedicated assistance" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm text-primary">{item.title}</p>
                  <p className="text-xs text-text-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Browse By</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Shop Categories</h2>
            <p className="text-text-light mt-3 max-w-lg mx-auto">
              Find exactly what you need from our curated collection of home furniture
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-accent/80 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                  <p className="text-white/70 text-sm mt-0.5">{cat.productCount} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Curated For You</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Featured Products</h2>
            </div>
            <Link
              href="/products"
              className="text-accent hover:text-accent-dark font-semibold flex items-center gap-2 transition-colors group"
            >
              View All
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.slice(0, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80"
          alt="Modern living room"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Up to <span className="text-accent">40% Off</span> This Season
          </h2>
          <p className="text-gray-300 text-lg max-w-lg mx-auto mb-8">
            Refresh your home with our biggest sale of the year. Limited time only.
          </p>
          <Link
            href="/products?sale=true"
            className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            Shop the Sale
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Just Landed</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">New Arrivals</h2>
            </div>
            <Link
              href="/products?new=true"
              className="text-accent hover:text-accent-dark font-semibold flex items-center gap-2 transition-colors group"
            >
              See All New
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">What People Say</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Customer Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                text: "Absolutely love my new sectional! The quality is amazing and the delivery was seamless. Will definitely be back for more.",
                rating: 5,
              },
              {
                name: "James R.",
                text: "Best furniture shopping experience I've had. The prices are unbeatable for this level of quality. Our dining set is gorgeous.",
                rating: 5,
              },
              {
                name: "Maria L.",
                text: "The bedroom set exceeded our expectations. Beautiful finish, solid construction, and the LED headboard is a showstopper!",
                rating: 5,
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "forwards" }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text-light leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                <p className="font-semibold text-primary">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
