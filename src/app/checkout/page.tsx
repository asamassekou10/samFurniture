"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = totalPrice >= 2500 ? 0 : 199.99;
  const tax = totalPrice * 0.0825;
  const grandTotal = totalPrice + shipping + tax;

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6 animate-scale-in">
          <svg className="w-10 h-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">Order Confirmed!</h1>
        <p className="text-text-light text-center max-w-md mb-2">
          Thank you for your order. We&apos;ll send you a confirmation email with your order details and tracking information.
        </p>
        <p className="text-sm text-text-light mb-8">Order #SAM-{Date.now().toString().slice(-6)}</p>
        <Link
          href="/products"
          className="px-8 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-primary mb-2">Nothing to checkout</h1>
        <p className="text-text-light mb-6">Add some items to your cart first.</p>
        <Link
          href="/products"
          className="px-8 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {["Shipping", "Payment", "Review"].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                    step > i + 1
                      ? "bg-success text-white"
                      : step === i + 1
                      ? "bg-accent text-white"
                      : "bg-gray-200 text-text-light"
                  }`}
                >
                  {step > i + 1 ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${step >= i + 1 ? "text-primary" : "text-text-light"}`}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div className={`w-16 md:w-24 h-0.5 mx-2 mb-5 ${step > i + 1 ? "bg-success" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold text-primary mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text mb-1.5">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text mb-1.5">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text mb-1.5">Address</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">City</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">State</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">ZIP</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full md:w-auto px-8 py-3.5 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold text-primary mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-accent transition-colors">
                    <input type="radio" name="payment" defaultChecked className="accent-accent w-4 h-4" />
                    <span className="font-medium">Credit / Debit Card</span>
                    <div className="ml-auto flex gap-1">
                      {["Visa", "MC", "Amex"].map((c) => (
                        <span key={c} className="px-2 py-0.5 bg-surface rounded text-xs text-text-light">{c}</span>
                      ))}
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-accent transition-colors">
                    <input type="radio" name="payment" className="accent-accent w-4 h-4" />
                    <span className="font-medium">PayPal</span>
                  </label>

                  <div className="mt-6 p-6 bg-surface rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-text mb-1.5">Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text mb-1.5">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text mb-1.5">CVV</label>
                        <input type="text" placeholder="123" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-text mb-1.5">Name on Card</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 bg-surface hover:bg-surface-dark text-text rounded-xl font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 md:flex-none px-8 py-3.5 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold text-primary mb-6">Review Your Order</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-3 bg-surface rounded-xl">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                        <p className="text-text-light text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-sm">
                        ${(item.product.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3.5 bg-surface hover:bg-surface-dark text-text rounded-xl font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setOrderPlaced(true);
                      clearCart();
                    }}
                    className="flex-1 md:flex-none px-8 py-3.5 bg-success hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
                  >
                    Place Order — ${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-primary mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-light">Subtotal ({items.length} items)</span>
                  <span>${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light">Shipping</span>
                  <span className={shipping === 0 ? "text-success font-medium" : ""}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light">Tax (8.25%)</span>
                  <span>${tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-primary">
                    ${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-white rounded-xl flex items-start gap-2">
                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-xs text-text-light">
                  Your payment information is secure. All transactions are encrypted and protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
