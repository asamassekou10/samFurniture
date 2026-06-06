"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ArrowUpRight, ShoppingBag, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
  compact?: boolean;
}

const categoryFallbacks: Record<string, string> = {
  "sofas-loveseats": "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/24_orig.png",
  sectionals: "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/23_orig.png",
  beds: "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/27_orig.png",
  "dining-room": "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/26_orig.png",
  recliners: "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/s388224282203948371_p3572_i7_w6815.jpeg?width=640",
  "tv-stands": "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/s388224282203948371_p2633_i1_w3241.jpeg?width=640",
  "bunk-beds": "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/s388224282203948371_p2550_i13_w5400.jpeg?width=640",
};

export default function ProductCard({ product, index = 0, compact = false }: ProductCardProps) {
  const { addItem } = useCart();
  const fallbackImage = useMemo(
    () => categoryFallbacks[product.categorySlug] ?? "https://www.happyhomesindustries.com/uploads/4/0/5/2/40528873/11-10_orig.jpg",
    [product.categorySlug]
  );
  const [primaryImage, setPrimaryImage] = useState(product.images[0] ?? fallbackImage);
  const [secondaryImage, setSecondaryImage] = useState<string | undefined>(product.images[1]);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className={`relative block overflow-hidden bg-surface ${compact ? "aspect-[5/3]" : "aspect-[4/3]"}`}>
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          className="object-contain p-2 transition duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={() => setPrimaryImage(fallbackImage)}
        />
        {secondaryImage && secondaryImage !== primaryImage && (
          <Image
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            fill
            className="object-contain p-2 opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setSecondaryImage(undefined)}
          />
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-danger px-3 py-1 text-xs font-bold text-white">
              -{discount}%
            </span>
          )}
        </div>
        <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-accent-dark"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className={compact ? "p-4" : "p-5"}>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] font-semibold text-primary transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        {!compact && <p className="mt-2 line-clamp-1 text-sm text-text-light">{product.shortDescription}</p>}

        <div className="mt-3 flex flex-wrap gap-2">
          {product.material && (
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-light">
              {product.material}
            </span>
          )}
          {product.color && (
            <span className="rounded-full bg-[#edf5f0] px-3 py-1 text-xs font-medium text-[#1f5137]">
              {product.color}
            </span>
          )}
        </div>

        {/* Price & Rating */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <span className="block text-lg font-bold text-primary">
              ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-text-light line-through">
                ${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-xs text-text-light font-medium">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
