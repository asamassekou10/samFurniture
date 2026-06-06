"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  BadgePercent,
  BedDouble,
  Check,
  Filter,
  Flame,
  Layers3,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

const featureFilters = [
  { id: "sale", label: "Sale", test: (p: Product) => Boolean(p.originalPrice && p.originalPrice > p.price) },
  { id: "new", label: "New", test: (p: Product) => Boolean(p.isNew) },
  { id: "in-stock", label: "In stock", test: (p: Product) => p.inStock },
  { id: "led", label: "LED", test: (p: Product) => /led/i.test(`${p.name} ${p.description}`) },
  { id: "sleeper", label: "Sleeper", test: (p: Product) => /sleeper|pull-out|trundle/i.test(`${p.name} ${p.description}`) },
  { id: "fireplace", label: "Fireplace", test: (p: Product) => /fireplace/i.test(`${p.name} ${p.description}`) },
  { id: "usb", label: "USB", test: (p: Product) => /usb/i.test(`${p.name} ${p.description}`) },
];

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

function uniqueValues(values: Array<string | undefined>) {
  return Array.from(new Set(values.filter(Boolean).map((value) => value!.trim()))).sort((a, b) => a.localeCompare(b));
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const showNew = searchParams.get("new") === "true";
  const showSale = searchParams.get("sale") === "true";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(showNew ? ["new"] : showSale ? ["sale"] : []);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const colors = useMemo(() => uniqueValues(products.map((p) => p.color)), []);
  const materials = useMemo(() => uniqueValues(products.map((p) => p.material)), []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material?.toLowerCase().includes(q) ||
          p.color?.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    if (selectedColors.length) {
      result = result.filter((p) => selectedColors.includes(normalize(p.color)));
    }

    if (selectedMaterials.length) {
      result = result.filter((p) => selectedMaterials.includes(normalize(p.material)));
    }

    if (selectedFeatures.length) {
      result = result.filter((p) => selectedFeatures.every((feature) => featureFilters.find((f) => f.id === feature)?.test(p)));
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

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
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating);
    }

    return result;
  }, [search, selectedCategory, selectedColors, selectedMaterials, selectedFeatures, sortBy, priceRange]);

  const suggestions = useMemo(() => {
    if (search.length < 2) return [];
    const q = search.toLowerCase();
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.color?.toLowerCase().includes(q))
      .slice(0, 5);
  }, [search]);

  const comparedProducts = products.filter((p) => compareIds.includes(p.id));
  const title = showNew ? "New Arrivals" : showSale ? "Sale Items" : "All Products";
  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) + selectedColors.length + selectedMaterials.length + selectedFeatures.length + (priceRange[1] < 5000 ? 1 : 0);

  function toggleValue(value: string, values: string[], setter: (next: string[]) => void) {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  function toggleCompare(productId: string) {
    setCompareIds((current) => {
      if (current.includes(productId)) return current.filter((id) => id !== productId);
      if (current.length >= 4) return current;
      return [...current, productId];
    });
  }

  function resetFilters() {
    setSearch("");
    setSelectedCategory("all");
    setSelectedColors([]);
    setSelectedMaterials([]);
    setSelectedFeatures([]);
    setPriceRange([0, 5000]);
  }

  const Filters = (
    <div className="space-y-7">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-text-light">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:border-accent focus:outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-text-light">Features</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {featureFilters.map((feature) => (
            <button
              key={feature.id}
              onClick={() => toggleValue(feature.id, selectedFeatures, setSelectedFeatures)}
              className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                selectedFeatures.includes(feature.id) ? "border-primary bg-primary text-white" : "border-gray-200 bg-white text-primary hover:border-accent"
              }`}
            >
              {feature.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-text-light">Color</label>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {colors.slice(0, 14).map((color) => {
            const key = normalize(color);
            return (
              <button
                key={color}
                onClick={() => toggleValue(key, selectedColors, setSelectedColors)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                  selectedColors.includes(key) ? "border-primary bg-primary text-white" : "border-gray-200 bg-white text-primary hover:border-accent"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: colorSwatches[key] ?? "#d1d5db" }}
                />
                {color}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-text-light">Material</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {materials.slice(0, 12).map((material) => {
            const key = normalize(material);
            return (
              <button
                key={material}
                onClick={() => toggleValue(key, selectedMaterials, setSelectedMaterials)}
                className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                  selectedMaterials.includes(key) ? "border-primary bg-primary text-white" : "border-gray-200 bg-white text-primary hover:border-accent"
                }`}
              >
                {material}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-text-light">Max price</label>
        <div className="mt-3 flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={5000}
            step={100}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-accent"
          />
          <span className="min-w-[82px] text-right text-sm font-bold text-primary">${priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-0">
      <div className="bg-primary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-accent-light">
            <Sparkles className="h-4 w-4" />
            Visual furniture finder
          </p>
          <h1 className="text-3xl font-bold text-white md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            Filter by room, color, material, budget, and lifestyle features so the right pieces surface faster.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="hidden self-start rounded-2xl border border-gray-200 bg-surface p-5 lg:sticky lg:top-28 lg:block">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-bold text-primary">
                <SlidersHorizontal className="h-5 w-5 text-accent" />
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="text-sm font-semibold text-accent hover:text-accent-dark">
                  Reset
                </button>
              )}
            </div>
            {Filters}
          </aside>

          <main>
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="grid gap-3 lg:grid-cols-[1fr_210px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-light" />
                  <input
                    type="text"
                    placeholder="Search by item, color, material, feature..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 focus:border-accent focus:outline-none"
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                      {suggestions.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          className="flex items-center gap-3 border-b border-gray-100 p-3 last:border-b-0 hover:bg-surface"
                        >
                          <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-surface">
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="56px" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-primary">{product.name}</p>
                            <p className="text-xs text-text-light">{product.category}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 focus:border-accent focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-text-light">
                  <span className="font-bold text-primary">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? "s" : ""} found
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Truck, label: "Delivery support" },
                    { icon: BadgePercent, label: "Sale-aware" },
                    { icon: Layers3, label: "Compare up to 4" },
                  ].map((item) => (
                    <span key={item.label} className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-text-light">
                      <item.icon className="h-3.5 w-3.5 text-accent" />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, i) => (
                  <div key={product.id} className="relative">
                    <label className="absolute right-3 top-3 z-10 flex cursor-pointer items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-xs font-bold text-primary shadow-sm backdrop-blur">
                      <input
                        type="checkbox"
                        checked={compareIds.includes(product.id)}
                        onChange={() => toggleCompare(product.id)}
                        className="h-4 w-4 accent-accent"
                      />
                      Compare
                    </label>
                    <ProductCard product={product} index={i} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl bg-surface py-20 text-center">
                <Search className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <h3 className="mb-2 text-xl font-semibold text-primary">No products found</h3>
                <p className="text-text-light">Try adjusting your search or filter criteria.</p>
                <button onClick={resetFilters} className="mt-5 rounded-xl bg-primary px-5 py-3 font-semibold text-white">
                  Reset filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white p-3 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white"
          >
            <Filter className="h-5 w-5" />
            Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
          </button>
          <Link href="/cart" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-semibold text-white">
            View cart
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} className="rounded-full bg-surface p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            {Filters}
            <button onClick={() => setFiltersOpen(false)} className="mt-7 w-full rounded-xl bg-accent px-5 py-3 font-semibold text-white">
              Show {filteredProducts.length} products
            </button>
          </div>
        </div>
      )}

      {comparedProducts.length > 0 && (
        <div className="fixed inset-x-4 bottom-20 z-30 mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl lg:bottom-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-bold text-primary">Compare {comparedProducts.length}/4</p>
            <button onClick={() => setCompareIds([])} className="text-sm font-semibold text-text-light hover:text-primary">
              Clear
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {comparedProducts.map((product) => (
              <div key={product.id} className="rounded-xl bg-surface p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-2 text-sm font-bold text-primary">{product.name}</p>
                  <button onClick={() => toggleCompare(product.id)} className="text-text-light hover:text-danger">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-text-light">
                  <span>${product.price.toLocaleString()}</span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-amber-400" />
                    {product.rating}
                  </span>
                  <span>{product.color ?? "Color n/a"}</span>
                  <span>{product.material ?? "Material n/a"}</span>
                </div>
              </div>
            ))}
          </div>
          {comparedProducts.length < 2 && (
            <p className="mt-3 flex items-center gap-2 text-sm text-text-light">
              <Flame className="h-4 w-4 text-accent" />
              Select at least two items to compare choices side by side.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
