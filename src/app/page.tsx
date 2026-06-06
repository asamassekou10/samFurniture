"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  ChevronRight,
  Clock3,
  HeartHandshake,
  PackageCheck,
  ShieldCheck,
  Sofa,
  Sparkles,
  Truck,
  Utensils,
} from "lucide-react";
import { categories, getFeaturedProducts, getNewArrivals, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const roomFilters = [
  {
    id: "living",
    label: "Living",
    icon: Sofa,
    headline: "Conversation-ready living rooms",
    copy: "Layer sofas, sectionals, TV stands, and accent comfort into a room that actually gets used.",
    slugs: ["sofas-loveseats", "sectionals", "recliners", "tv-stands"],
  },
  {
    id: "sleep",
    label: "Sleep",
    icon: BedDouble,
    headline: "Bedrooms with storage and drama",
    copy: "Start with a statement bed, then tune the room with practical pieces for nightly routines.",
    slugs: ["beds", "bunk-beds"],
  },
  {
    id: "dining",
    label: "Dining",
    icon: Utensils,
    headline: "Dining spaces made for hosting",
    copy: "Find tables and sets that balance daily meals, weekend guests, and easy clean-up.",
    slugs: ["dining-room"],
  },
];

const featureCards = [
  { icon: BadgeCheck, title: "Curated Quality", desc: "Product picks are filtered for finish, comfort, and value." },
  { icon: Truck, title: "Local Delivery", desc: "Delivery support for large pieces and full-room orders." },
  { icon: ShieldCheck, title: "Warranty Backing", desc: "Manufacturer-backed protection on qualifying furniture." },
  { icon: HeartHandshake, title: "Guided Buying", desc: "Get help matching dimensions, color, and room flow." },
];

const styleNotes = [
  { label: "Modern LED", value: "Miami sets", tone: "bg-[#eef7ff] text-[#164e63]" },
  { label: "Family Comfort", value: "Sectionals", tone: "bg-[#f1f8ec] text-[#365314]" },
  { label: "Small Space", value: "Sleepers", tone: "bg-[#fff3e6] text-[#7c2d12]" },
  { label: "Hosting", value: "Dining sets", tone: "bg-[#f5eefb] text-[#581c87]" },
];

const categoryVisuals: Record<string, string> = {
  "sofas-loveseats": "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/24_orig.png",
  sectionals: "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/23_orig.png",
  beds: "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/27_orig.png",
  "dining-room": "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/26_orig.png",
  recliners: "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/s388224282203948371_p3572_i7_w6815.jpeg?width=640",
  "tv-stands": "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/s388224282203948371_p2633_i1_w3241.jpeg?width=640",
  "bunk-beds": "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/s388224282203948371_p2550_i13_w5400.jpeg?width=640",
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const [activeRoom, setActiveRoom] = useState(roomFilters[0]);

  const activeProducts = useMemo(
    () =>
      products
        .filter((product) => activeRoom.slugs.includes(product.categorySlug))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4),
    [activeRoom]
  );

  const activeCategories = categories.filter((category) => activeRoom.slugs.includes(category.slug));
  const heroProduct = featured[0] ?? products[0];

  return (
    <>
      <section className="relative isolate min-h-[calc(100vh-104px)] overflow-hidden bg-[#f6f2ea]">
        <div className="absolute inset-0 grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[#1f2621]" />
          <div className="relative min-h-[44vh] lg:min-h-0">
            <Image
              src="https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/11-10_orig.jpg"
              alt="Happy Homes furniture showroom"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1f2621] via-[#1f2621]/20 to-transparent lg:from-[#1f2621]/60" />
          </div>
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-104px)] max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[0.86fr_1.14fr] lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles className="h-4 w-4 text-accent-light" />
              Room-first furniture shopping
            </div>
            <h1 className="max-w-[11ch] text-5xl font-bold leading-[0.95] tracking-normal md:text-7xl">
              Build the room before you buy.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/76">
              Browse SAM Furniture by lifestyle, size, color, and value so every sofa, bed, and dining set feels easier to picture at home.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-accent-dark hover:-translate-y-0.5"
              >
                Shop the collection
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/products?sale=true"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/18"
              >
                View current deals
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="ml-auto w-full max-w-xl"
          >
            <div className="rounded-[2rem] border border-white/45 bg-white/86 p-4 shadow-2xl shadow-black/22 backdrop-blur-md">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface">
                <Image
                  src={categoryVisuals[heroProduct.categorySlug] ?? heroProduct.images[0]}
                  alt={heroProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary shadow-sm">
                  Featured find
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 p-4 shadow-xl backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">This week&apos;s room anchor</p>
                  <h2 className="mt-1 text-xl font-bold text-primary">{heroProduct.name}</h2>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-2xl font-bold text-primary">${heroProduct.price.toLocaleString("en-US")}</span>
                    <Link
                      href={`/products/${heroProduct.slug}`}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-light"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {styleNotes.map((note) => (
                  <div key={note.label} className={`rounded-2xl px-3 py-3 ${note.tone}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-wide opacity-70">{note.label}</p>
                    <p className="mt-1 text-sm font-bold">{note.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 lg:grid-cols-4">
          {featureCards.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf5f0] text-[#1f5137]">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">{item.title}</p>
                <p className="text-xs leading-5 text-text-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fbfaf7] py-18">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-[0.55fr_1fr] lg:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">Interactive finder</span>
              <h2 className="mt-2 text-3xl font-bold text-primary md:text-5xl">Shop by the way the room lives.</h2>
              <p className="mt-4 leading-7 text-text-light">
                Furniture shoppers need fast visual filtering. Pick a room mood and the page reshuffles categories and products around that intent.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {roomFilters.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    activeRoom.id === room.id
                      ? "border-primary bg-primary text-white shadow-xl shadow-primary/15"
                      : "border-gray-200 bg-white text-primary hover:-translate-y-1 hover:border-accent"
                  }`}
                >
                  <room.icon className={`mb-8 h-6 w-6 ${activeRoom.id === room.id ? "text-accent-light" : "text-accent"}`} />
                  <span className="text-lg font-bold">{room.label}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeRoom.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
          >
            <div className="overflow-hidden rounded-3xl bg-primary text-white shadow-xl shadow-primary/12">
              <div className="grid min-h-full md:grid-cols-2">
                <div className="p-7 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent-light">Selected mood</p>
                  <h3 className="mt-3 text-3xl font-bold">{activeRoom.headline}</h3>
                  <p className="mt-4 leading-7 text-white/72">{activeRoom.copy}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {activeCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/categories/${category.slug}`}
                        className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/18"
                      >
                        {category.name}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-[320px]">
                  <Image
                    src={categoryVisuals[activeCategories[0]?.slug] ?? activeCategories[0]?.image ?? categories[0].image}
                    alt={activeCategories[0]?.name ?? "Furniture room"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 32vw"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {activeProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} compact />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">Visual catalog</span>
              <h2 className="mt-2 text-3xl font-bold text-primary md:text-4xl">Browse Categories</h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 font-semibold text-accent transition hover:text-accent-dark">
              See every product
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`group relative overflow-hidden rounded-3xl bg-surface ${
                  i === 0 || i === 3 ? "lg:col-span-2" : ""
                } aspect-[4/3]`}
              >
                <Image
                  src={categoryVisuals[cat.slug] ?? cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/12 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-sm text-white/72">{cat.productCount} curated pieces</p>
                  <h3 className="mt-1 text-2xl font-bold">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">Curated For You</span>
              <h2 className="mt-2 text-3xl font-bold text-primary md:text-4xl">Featured Products</h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 font-semibold text-accent transition hover:text-accent-dark">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#253329] py-20 text-white">
        <Image
          src="https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/happy-homes-horizontal-banner_orig.png"
          alt="Happy Homes furniture banner"
          fill
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#253329] via-[#253329]/84 to-[#253329]/30" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-light">Smarter sale discovery</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">Deals that still feel designed.</h2>
            <p className="mt-5 max-w-xl leading-8 text-white/74">
              Keep promotions visual and contextual: sale pieces, new arrivals, and best-rated staples are only one tap away.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products?sale=true" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 font-semibold text-white transition hover:bg-accent-dark">
                Shop sale
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/products?new=true" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/18">
                New arrivals
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Clock3, label: "Seasonal promos", value: "Up to 40% off" },
              { icon: PackageCheck, label: "Ready to style", value: `${newArrivals.length}+ arrivals` },
              { icon: Truck, label: "Large orders", value: "Delivery support" },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/12 bg-white/10 p-5 backdrop-blur">
                <item.icon className="h-6 w-6 text-accent-light" />
                <p className="mt-8 text-sm text-white/60">{item.label}</p>
                <p className="mt-1 text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">Just Landed</span>
              <h2 className="mt-2 text-3xl font-bold text-primary md:text-4xl">New Arrivals</h2>
            </div>
            <Link href="/products?new=true" className="inline-flex items-center gap-2 font-semibold text-accent transition hover:text-accent-dark">
              See all new
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
