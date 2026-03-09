"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <svg className="w-24 h-24 text-gray-200 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h1 className="text-2xl font-bold text-primary mb-2">Your cart is empty</h1>
        <p className="text-text-light mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/products"
          className="px-8 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-text-light hover:text-danger transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 md:gap-6 p-4 bg-surface rounded-2xl"
              >
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.product.slug}`}>
                    <h3 className="font-semibold text-primary hover:text-accent transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-text-light mt-0.5">{item.product.category}</p>
                  <p className="text-lg font-bold text-accent mt-2">
                    ${item.product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-accent transition-colors"
                      >
                        -
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-accent transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-primary">
                        ${(item.product.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-danger transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-light">Subtotal</span>
                  <span className="font-medium">${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light">Shipping</span>
                  <span className="font-medium text-success">
                    {totalPrice >= 2500 ? "FREE" : "Calculated at checkout"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-primary">Total</span>
                  <span className="text-lg font-bold text-primary">
                    ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {totalPrice < 2500 && (
                <p className="text-xs text-text-light mt-3 bg-amber-50 p-3 rounded-lg">
                  Add ${(2500 - totalPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })} more for free shipping!
                </p>
              )}

              <Link
                href="/checkout"
                className="block w-full bg-accent hover:bg-accent-dark text-white text-center py-3.5 rounded-xl font-semibold transition-colors mt-6"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="block w-full text-center py-3 text-accent hover:text-accent-dark font-medium transition-colors mt-2"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
