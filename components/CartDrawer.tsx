'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { OrderRecord } from '@/lib/types';
import OrderSuccessModal from './OrderSuccessModal';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  Truck,
  ArrowRight,
  ShieldCheck,
  Loader2,
  RefreshCw,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    freeShippingProgress,
    amountUntilFreeShipping,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  // Order Confirmation State
  const [submittedOrder, setSubmittedOrder] = useState<OrderRecord | null>(null);
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !address.trim()) {
      setErrorMessage('Please fill in your name, email, and shipping address.');
      return;
    }

    if (items.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload: OrderRecord = {
        customer_name: fullName.trim(),
        customer_email: email.trim(),
        customer_phone: phone.trim(),
        shipping_address: `${address.trim()}${city ? `, ${city.trim()}` : ''}${pincode ? ` - ${pincode.trim()}` : ''}`,
        city: city.trim(),
        pincode: pincode.trim(),
        items: items,
        total_amount: subtotal,
        status: 'confirmed',
      };

      // Direct live insertion into Supabase `orders` table via Supabase client
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: orderPayload.customer_name,
            customer_email: orderPayload.customer_email,
            customer_phone: orderPayload.customer_phone,
            shipping_address: orderPayload.shipping_address,
            items: orderPayload.items,
            total_amount: orderPayload.total_amount,
            status: 'confirmed',
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase orders insert error:', error);
        throw new Error(error.message || 'Failed to place order in database.');
      }

      const generatedId = data?.id || 'AAVIN-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      setSubmittedOrder(orderPayload);
      setSubmittedOrderId(generatedId);
      setShowSuccessModal(true);
      clearCart();
      setCheckoutStep('cart');
      closeCart();
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred while placing order.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            />

            {/* Slide-out Drawer Panel */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="w-screen max-w-md bg-[#0d0d0f] border-l border-white/10 text-white flex flex-col shadow-2xl"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                    <h2 className="text-lg font-mono uppercase tracking-wider font-bold">
                      Your Chilled Cart
                    </h2>
                    <span className="text-xs font-mono text-zinc-400 bg-white/10 px-2 py-0.5 rounded-full">
                      {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <button
                    onClick={closeCart}
                    className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Free Shipping Progress Bar */}
                <div className="px-6 py-3.5 bg-zinc-950/80 border-b border-white/5">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    {amountUntilFreeShipping > 0 ? (
                      <span className="text-white/80">
                        You are <strong className="text-amber-400">₹{amountUntilFreeShipping}</strong> away from free express shipping!
                      </span>
                    ) : (
                      <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        You unlocked FREE Chilled Express Shipping!
                      </span>
                    )}
                    <span className="text-white/40">{freeShippingProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        freeShippingProgress >= 100
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : 'bg-gradient-to-r from-amber-500 to-amber-300'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${freeShippingProgress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {items.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-white/30">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <h3 className="text-base font-bold text-white tracking-wide">
                        Your chilled cart is empty
                      </h3>
                      <p className="text-xs text-white/50 font-mono max-w-xs mx-auto">
                        Explore our farm-fresh Badam Milk, Chocolate Coffee, and Vanilla Cold Brew cans.
                      </p>
                      <button
                        onClick={closeCart}
                        className="mt-4 inline-flex items-center gap-2 bg-amber-400 text-black px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors"
                      >
                        Start Shopping
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : checkoutStep === 'cart' ? (
                    /* Step 1: Items List */
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-3.5 bg-zinc-950/60 rounded-xl border border-white/5 relative group hover:border-amber-400/20 transition-all"
                        >
                          {/* Image */}
                          <div className="relative w-16 h-20 bg-black rounded-lg overflow-hidden shrink-0 border border-white/10">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="text-sm font-bold text-white truncate">
                                  {item.name}
                                </h4>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-white/40 hover:text-red-400 transition-colors p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[11px] font-mono text-zinc-400 uppercase bg-white/5 px-2 py-0.5 rounded">
                                  {item.packSize}
                                </span>
                                {item.isSubscription && (
                                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                                    <RefreshCw className="w-2.5 h-2.5" />
                                    15% Off Sub
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Quantity & Price */}
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                              <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-lg p-0.5">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-mono font-bold w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="text-sm font-mono font-bold text-amber-400">
                                ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Step 2: Interactive Checkout Form */
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                          Shipping & Customer Details
                        </span>
                        <button
                          type="button"
                          onClick={() => setCheckoutStep('cart')}
                          className="text-xs font-mono text-white/50 hover:text-white underline"
                        >
                          Back to Cart
                        </button>
                      </div>

                      {errorMessage && (
                        <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-200 font-mono">
                          {errorMessage}
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Sundararajan M."
                          className="w-full bg-zinc-900/90 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="sundar@example.com"
                            className="w-full bg-zinc-900/90 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full bg-zinc-900/90 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                          Delivery Street Address *
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Door No. 12, Anna Salai, Alwarpet"
                          className="w-full bg-zinc-900/90 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Chennai"
                            className="w-full bg-zinc-900/90 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                            Pincode *
                          </label>
                          <input
                            type="text"
                            required
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="600018"
                            className="w-full bg-zinc-900/90 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-mono"
                          />
                        </div>
                      </div>

                      <div className="p-3 bg-zinc-950 rounded-lg border border-white/10 text-[11px] font-mono text-white/60 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Order details securely synced directly to Supabase backend.</span>
                      </div>
                    </form>
                  )}
                </div>

                {/* Footer Subtotal & Action Bar */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-white/10 bg-zinc-950 space-y-4">
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-white/60">
                        <span>Chilled Express Shipping</span>
                        <span>{subtotal >= 999 ? 'FREE' : '₹99'}</span>
                      </div>
                      <div className="flex justify-between text-white/60">
                        <span>Aavin Dairy Taxes</span>
                        <span>Included</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                        <span>Total Due</span>
                        <span className="text-amber-400">
                          ₹{(subtotal + (subtotal >= 999 ? 0 : 99)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {checkoutStep === 'cart' ? (
                      <button
                        onClick={() => setCheckoutStep('form')}
                        className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-3.5 rounded-xl font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                      >
                        <span>Proceed to Delivery</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        form="checkout-form"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Confirming in Supabase...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Place Chilled Order</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <OrderSuccessModal
        isOpen={showSuccessModal}
        order={submittedOrder}
        orderId={submittedOrderId}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}
