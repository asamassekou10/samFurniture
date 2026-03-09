"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-text-light text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-accent hover:text-accent-dark font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 bg-surface rounded-xl">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                    <p className="text-accent font-bold mt-1">
                      ${item.product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:border-accent transition-colors text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:border-accent transition-colors text-sm"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-gray-400 hover:text-danger transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-light">Subtotal</span>
              <span className="text-xl font-bold text-primary">
                ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-xs text-text-light">Shipping & taxes calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-accent hover:bg-accent-dark text-white text-center py-3.5 rounded-xl font-semibold transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full bg-surface hover:bg-surface-dark text-text text-center py-3 rounded-xl font-medium transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
