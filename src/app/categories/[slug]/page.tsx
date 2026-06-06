"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgePercent, Check, ChevronRight, Palette, SlidersHorizontal, Sparkles, Star } from "lucide-react";
import { getCategoryBySlug, getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

const colorSwatches: Record<string, string> = {
  black: "#111827",
  white: "#f8fafc",
  gray: "#9ca3af",
  grey: "#9ca3af",
  charcoal: "#374151",
  beige: "#d8c3a5",
  cream: "#f4ead7",
  sand: "#d6b98c",
  brown: "#7c4a2d",
  espresso: "#3b2418",
  olive: "#68734d",
  ivory: "#f5f0e5",
  natural: "#c8a46a",
};

function normalize(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = getCategoryBySlug(slug);
  const products = getProductsByCategory(slug);
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedFeature, setSelectedFeature] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  if (!category) {
    notFound();
  }

  const colors = Array.from(new Set(products.map((p) => p.color).filter(Boolean).map((color) => color!.trim())));
  const bestSellers = products.filter((p) => p.isFeatured || p.rating >= 4.7).slice(0, 3);
  const saleCount = products.filter((p) => p.originalPrice && p.originalPrice > p.price).length;
  const newCount = products.filter((p) => p.isNew).length;

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedColor !== "all") result = result.filter((p) => normalize(p.color) === selectedColor);
    if (selectedFeature === "sale") result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
    if (selectedFeature === "new") result = result.filter((p) => p.isNew);
    if (selectedFeature === "in-stock") result = result.filter((p) => p.inStock);
    if (selectedFeature === "comfort") result = result.filter((p) => /recliner|sectional|sofa|sleeper|bed/i.test(`${p.name} ${p.description}`));

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating);
    }
    return result;
  }, [products, selectedColor, selectedFeature, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-primary">
        <Image src={category.image} alt={category.name} fill className="object-cover opacity-35" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
          <nav className="mb-5 flex items-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-white">Products</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{category.name}</span>
          </nav>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-accent-light">
            <Sparkles className="h-4 w-4" />
            Curated category
          </p>
          <h1 className="max-w-2xl text-4xl font-bold text-white md:text-6xl">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-300">{category.description}</p>
          <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              { icon: Check, label: "Available", value: `${products.filter((p) => p.inStock).length} in stock` },
              { icon: BadgePercent, label: "Deals", value: `${saleCount} on sale` },
              { icon: Star, label: "New", value: `${newCount} arrivals` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
                <stat.icon className="h-5 w-5 text-accent-light" />
                <p className="mt-4 text-sm text-white/60">{stat.label}</p>
                <p className="font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {bestSellers.length > 0 && (
        <section className="bg-surface py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-accent">Best bets</p>
                <h2 className="mt-1 text-2xl font-bold text-primary">Top picks in {category.name}</h2>
              </div>
              <Link href="/products" className="hidden items-center gap-2 font-semibold text-accent sm:inline-flex">
                All products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {bestSellers.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_180px] lg:items-end">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-light">
                  <Palette className="h-4 w-4 text-accent" />
                  Color
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedColor("all")}
                    className={`rounded-full border px-3 py-2 text-sm font-semibold ${
                      selectedColor === "all" ? "border-primary bg-primary text-white" : "border-gray-200 bg-surface text-primary"
                    }`}
                  >
                    All
                  </button>
                  {colors.map((color) => {
                    const key = normalize(color);
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(key)}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold ${
                          selectedColor === key ? "border-primary bg-primary text-white" : "border-gray-200 bg-surface text-primary"
                        }`}
                      >
                        <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: colorSwatches[key] ?? "#d1d5db" }} />
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-light">
                  <SlidersHorizontal className="h-4 w-4 text-accent" />
                  Quick filter
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    ["all", "All"],
                    ["in-stock", "In stock"],
                    ["sale", "Sale"],
                    ["new", "New"],
                    ["comfort", "Comfort"],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setSelectedFeature(id)}
                      className={`rounded-full border px-3 py-2 text-sm font-semibold ${
                        selectedFeature === id ? "border-primary bg-primary text-white" : "border-gray-200 bg-surface text-primary"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 focus:border-accent focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <p className="mb-8 text-text-light">
          <span className="font-bold text-primary">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? "s" : ""} in {category.name}
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-surface py-20 text-center">
            <p className="text-xl text-text-light">No products match these filters.</p>
            <button
              onClick={() => {
                setSelectedColor("all");
                setSelectedFeature("all");
              }}
              className="mt-4 rounded-xl bg-primary px-5 py-3 font-semibold text-white"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
