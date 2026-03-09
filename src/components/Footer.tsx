"use client";

import Link from "next/link";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
            <p className="text-gray-400 mb-6">
              Get exclusive deals and new arrivals delivered to your inbox
            </p>
            <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent hover:bg-accent-dark rounded-xl font-semibold transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold">SAM</span>
                <span className="text-xl font-light text-accent ml-1">Furniture</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium home furniture at unbeatable prices. We bring you the best selection of sofas, beds, dining sets, and more — delivered right to your door.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">Shop</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Delivery Policy</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Return Policy</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 text-sm">Houston, TX</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:8323916080" className="text-gray-400 hover:text-white text-sm transition-colors">(832) 391-6080</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:sales@happyhomesindustries.com" className="text-gray-400 hover:text-white text-sm transition-colors">sales@samhomefurniture.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SAM Furniture. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-xs">We accept</span>
            <div className="flex gap-2">
              {["Visa", "MC", "Amex", "PayPal"].map((method) => (
                <span key={method} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
