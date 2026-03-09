"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductBySlug(id);
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "shipping">("description");

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-text-light">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
            <span>/</span>
            <Link href={`/categories/${product.categorySlug}`} className="hover:text-accent transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-primary font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-danger text-white text-sm font-bold rounded-full">
                  -{discount}% OFF
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-4 right-4 px-3 py-1.5 bg-primary text-white text-sm font-bold rounded-full">
                  NEW
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-accent" : "border-gray-200 hover:border-accent/50"
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-200"} fill-current`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-text-light text-sm">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-text-light line-through">
                    ${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="px-2 py-0.5 bg-danger/10 text-danger text-sm font-bold rounded-md">
                    Save ${(product.originalPrice - product.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </>
              )}
            </div>

            <p className="text-text-light mt-4 leading-relaxed">{product.shortDescription}</p>

            {/* SKU & Stock */}
            <div className="flex items-center gap-4 mt-4 text-sm">
              <span className="text-text-light">SKU: {product.sku}</span>
              <span className={`flex items-center gap-1.5 font-medium ${product.inStock ? "text-success" : "text-danger"}`}>
                <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-success" : "bg-danger"}`} />
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-surface transition-colors text-lg"
                >
                  -
                </button>
                <span className="px-6 py-3 font-semibold min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-surface transition-colors text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addItem(product);
                }}
                disabled={!product.inStock}
                className="flex-1 bg-accent hover:bg-accent-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-10 border-t border-gray-200 pt-8">
              <div className="flex gap-6 border-b border-gray-200">
                {(["description", "details", "shipping"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                      activeTab === tab
                        ? "text-accent border-accent"
                        : "text-text-light border-transparent hover:text-primary"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="py-6">
                {activeTab === "description" && (
                  <p className="text-text-light leading-relaxed">{product.description}</p>
                )}
                {activeTab === "details" && (
                  <div className="space-y-3">
                    {product.dimensions && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-text-light">Dimensions</span>
                        <span className="font-medium">{product.dimensions}</span>
                      </div>
                    )}
                    {product.material && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-text-light">Material</span>
                        <span className="font-medium">{product.material}</span>
                      </div>
                    )}
                    {product.color && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-text-light">Color</span>
                        <span className="font-medium">{product.color}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-text-light">SKU</span>
                      <span className="font-medium">{product.sku}</span>
                    </div>
                  </div>
                )}
                {activeTab === "shipping" && (
                  <div className="space-y-3 text-text-light leading-relaxed">
                    <p>Free shipping on orders over $2,500. Standard delivery within 7-14 business days.</p>
                    <p>Local delivery available within 60 miles of Houston, TX. Minimum order of $2,500 qualifies for a 5% discount.</p>
                    <p>All items covered under a 1-year manufacturer warranty. Please report any damage within 72 hours of delivery.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
