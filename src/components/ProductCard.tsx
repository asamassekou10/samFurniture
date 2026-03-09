"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 bg-danger text-white text-xs font-bold rounded-full">
              -{discount}%
            </span>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm">
              Sold Out
            </span>
          </div>
        )}
        {/* Quick add */}
        {product.inStock && (
          <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="w-full bg-accent hover:bg-accent-dark text-white py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-lg"
            >
              Add to Cart
            </button>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <p className="text-text-light text-sm mt-1 line-clamp-1">{product.shortDescription}</p>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-text-light line-through">
                ${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-text-light font-medium">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
