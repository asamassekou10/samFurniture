"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategoryBySlug, getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = getCategoryBySlug(slug);
  const products = getProductsByCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-64 md:h-80">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <nav className="flex items-center gap-2 text-sm text-gray-300 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <span>/</span>
              <span className="text-white">{category.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{category.name}</h1>
            <p className="text-gray-300 mt-2 text-lg">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-text-light mb-8">
          {products.length} product{products.length !== 1 ? "s" : ""} in {category.name}
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-text-light">No products in this category yet.</p>
            <Link href="/products" className="text-accent hover:text-accent-dark font-semibold mt-4 inline-block">
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
