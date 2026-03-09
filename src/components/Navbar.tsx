"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="hidden sm:block">Free shipping on orders over $2,500</p>
          <p className="sm:hidden text-center w-full">Free shipping over $2,500</p>
          <div className="hidden sm:flex items-center gap-4">
            <a href="tel:8323916080" className="hover:text-accent transition-colors">(832) 391-6080</a>
            <span className="text-gray-400">|</span>
            <a href="mailto:sales@happyhomesindustries.com" className="hover:text-accent transition-colors">Contact Us</a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:bg-accent-dark transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-primary">SAM</span>
                <span className="text-xl font-light text-accent ml-1">Furniture</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-text hover:text-accent font-medium transition-colors">
                Home
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <Link href="/products" className="text-text hover:text-accent font-medium transition-colors flex items-center gap-1">
                  Shop
                  <svg className={`w-4 h-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {categoriesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-scale-in origin-top">
                      <Link
                        href="/products"
                        className="block px-4 py-2.5 text-sm hover:bg-surface hover:text-accent transition-colors font-medium"
                      >
                        All Products
                      </Link>
                      <div className="border-t border-gray-100 my-1" />
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/categories/${cat.slug}`}
                          className="block px-4 py-2.5 text-sm hover:bg-surface hover:text-accent transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link href="/products?new=true" className="text-text hover:text-accent font-medium transition-colors">
                New Arrivals
              </Link>
              <Link href="/products?sale=true" className="text-text hover:text-accent font-medium transition-colors">
                Sale
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <Link href="/products" className="p-2 hover:bg-surface rounded-lg transition-colors">
                <svg className="w-5 h-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4 animate-fade-in-up">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 font-medium hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 font-medium hover:text-accent transition-colors">
                All Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 pl-4 text-sm text-text-light hover:text-accent transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <Link href="/products?new=true" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 font-medium hover:text-accent transition-colors">
                New Arrivals
              </Link>
              <Link href="/products?sale=true" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 font-medium hover:text-accent transition-colors">
                Sale
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
