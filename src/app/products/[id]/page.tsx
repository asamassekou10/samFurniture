"use client";

import { use, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  HeartHandshake,
  Minus,
  PackageCheck,
  Plus,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { getProductBySlug, getProductsByCategory, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";

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

function swatchFor(color?: string) {
  return colorSwatches[color?.toLowerCase() ?? ""] ?? "#d1d5db";
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductBySlug(id);
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const roomComplements = useMemo(() => {
    const roomMap: Record<string, string[]> = {
      "sofas-loveseats": ["tv-stands", "recliners", "sectionals"],
      sectionals: ["tv-stands", "recliners", "sofas-loveseats"],
      beds: ["bunk-beds", "tv-stands"],
      "bunk-beds": ["beds", "tv-stands"],
      "dining-room": ["sofas-loveseats", "tv-stands"],
      recliners: ["sofas-loveseats", "sectionals", "tv-stands"],
      "tv-stands": ["sofas-loveseats", "sectionals", "recliners"],
    };
    const slugs = roomMap[product.categorySlug] ?? [];
    return products
      .filter((p) => p.id !== product.id && slugs.includes(p.categorySlug))
      .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating)
      .slice(0, 3);
  }, [product.categorySlug, product.id]);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  function addQuantityToCart() {
    for (let i = 0; i < quantity; i++) addItem(product!);
  }

  return (
    <div className="bg-white pb-24 lg:pb-0">
      <div className="border-b border-gray-200 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 overflow-hidden text-sm text-text-light">
            <Link href="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="h-4 w-4 shrink-0" />
            <Link href="/products" className="hover:text-accent">Products</Link>
            <ChevronRight className="h-4 w-4 shrink-0" />
            <Link href={`/categories/${product.categorySlug}`} className="hover:text-accent">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0" />
            <span className="truncate font-medium text-primary">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain p-3"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {discount > 0 && <span className="rounded-full bg-danger px-3 py-1.5 text-sm font-bold text-white">-{discount}%</span>}
                {product.isNew && <span className="rounded-full bg-primary px-3 py-1.5 text-sm font-bold text-white">New</span>}
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View ${product.name} image ${i + 1}`}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-surface ${
                      selectedImage === i ? "border-accent" : "border-gray-200 hover:border-accent/50"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-contain p-1" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                {product.category}
              </span>
              {product.color && (
                <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-bold text-primary">
                  <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: swatchFor(product.color) }} />
                  {product.color}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold leading-tight text-primary md:text-5xl">{product.name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-bold">{product.rating}</span>
              </div>
              <span className="text-sm text-text-light">{product.reviewCount} reviews</span>
              <span className={`inline-flex items-center gap-2 text-sm font-bold ${product.inStock ? "text-success" : "text-danger"}`}>
                <span className={`h-2 w-2 rounded-full ${product.inStock ? "bg-success" : "bg-danger"}`} />
                {product.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-text-light line-through">
                    ${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="rounded-lg bg-danger/10 px-2 py-1 text-sm font-bold text-danger">
                    Save ${(product.originalPrice - product.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 text-lg leading-8 text-text-light">{product.shortDescription}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Truck, title: "Delivery", text: "Local large-item support" },
                { icon: ShieldCheck, title: "Warranty", text: "Manufacturer backed" },
                { icon: HeartHandshake, title: "Buying help", text: "Call for fit guidance" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-gray-200 bg-surface p-4">
                  <item.icon className="h-5 w-5 text-accent" />
                  <p className="mt-4 font-bold text-primary">{item.title}</p>
                  <p className="mt-1 text-sm leading-5 text-text-light">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-gray-200 p-5">
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">Quantity</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex w-full items-center justify-between rounded-xl border border-gray-200 sm:w-36">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="p-4 hover:bg-surface"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span aria-live="polite" className="font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="p-4 hover:bg-surface"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={addQuantityToCart}
                  disabled={!product.inStock}
                  aria-label={`Add ${quantity} ${product.name} to cart`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-lg font-semibold text-white transition hover:bg-accent-dark disabled:bg-gray-300"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
              <p className="mt-3 text-sm text-text-light">SKU: <span className="font-semibold text-primary">{product.sku}</span></p>
            </div>
          </div>
        </div>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl bg-surface p-6 md:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Product Details</p>
            <h2 className="mt-2 text-2xl font-bold text-primary">Specs that matter before delivery day</h2>
            <p className="mt-4 leading-8 text-text-light">{product.description}</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              {[
                ["Dimensions", product.dimensions],
                ["Material", product.material],
                ["Color", product.color],
                ["Category", product.category],
                ["SKU", product.sku],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[120px_1fr] border-b border-gray-100 last:border-b-0">
                    <div className="bg-surface px-4 py-3 text-sm font-bold text-primary">{label}</div>
                    <div className="px-4 py-3 text-sm text-text-light">{value}</div>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 p-6 md:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Delivery Readiness</p>
            <h2 className="mt-2 text-2xl font-bold text-primary">Measure once, order with confidence.</h2>
            <div className="mt-6 space-y-4">
              {[
                { icon: Ruler, text: "Confirm doorway, hallway, and room dimensions before ordering large pieces." },
                { icon: PackageCheck, text: "Free shipping applies on orders over $2,500." },
                { icon: BadgeCheck, text: "Report delivery damage within 72 hours for fastest support." },
              ].map((item) => (
                <div key={item.text} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-6 text-text-light">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {roomComplements.length > 0 && (
        <section className="bg-primary py-16 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent-light">
                  <Sparkles className="h-4 w-4" />
                  Complete the room
                </p>
                <h2 className="mt-2 text-3xl font-bold">Pieces that pair naturally</h2>
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 font-semibold text-accent-light">
                Browse all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roomComplements.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-primary">More from {product.category}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white p-3 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-primary">{product.name}</p>
            <p className="text-sm font-bold text-accent">${product.price.toLocaleString()}</p>
          </div>
          <button
            onClick={addQuantityToCart}
            aria-label={`Add ${product.name} to cart`}
            className="rounded-xl bg-accent px-5 py-3 font-semibold text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
