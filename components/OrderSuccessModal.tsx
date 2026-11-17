'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Package, Sparkles, X, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OrderRecord } from '@/lib/types';

interface OrderSuccessModalProps {
  order: OrderRecord | null;
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderSuccessModal({
  order,
  orderId,
  isOpen,
  onClose,
}: OrderSuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Trigger festive multi-burst confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#E5A93C', '#FFFFFF', '#D97706'],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#F59E0B', '#FDE68A'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#E5A93C', '#FFFFFF'],
        });
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#0e0e10] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badge */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                Order Confirmed & Saved to Supabase
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Chilled Goodness is on the Way!
              </h3>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 sm:p-5 space-y-3 mb-5 text-sm font-mono">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-white/60">Order ID</span>
              <span className="text-amber-400 font-bold tracking-wider select-all">
                {orderId || 'AAVIN-' + Math.random().toString(36).substr(2, 9).toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-white/60">Recipient</span>
              <span className="text-white font-medium">{order.customer_name}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-white/60">Contact Email</span>
              <span className="text-white">{order.customer_email}</span>
            </div>

            <div className="flex justify-between items-start text-xs pt-1">
              <span className="text-white/60 shrink-0">Deliver To</span>
              <span className="text-white/80 text-right truncate max-w-[240px]">
                {order.shipping_address}
                {order.city ? `, ${order.city}` : ''}
                {order.pincode ? ` - ${order.pincode}` : ''}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-white/10 text-base font-bold">
              <span className="text-white">Total Amount Paid</span>
              <span className="text-amber-400">₹{order.total_amount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Items Summary */}
          <div className="mb-6 space-y-2 max-h-36 overflow-y-auto pr-1">
            <span className="text-xs font-mono text-white/50 uppercase tracking-wider block">
              Items Ordered ({order.items.length})
            </span>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs py-1.5 px-3 bg-zinc-950/60 rounded border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-white/50 text-[10px]">({item.packSize})</span>
                  {item.isSubscription && (
                    <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1 rounded">
                      4-Wk Sub
                    </span>
                  )}
                </div>
                <div className="font-mono text-white/80">
                  {item.quantity} × ₹{item.unitPrice}
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Note */}
          <div className="flex items-center gap-3 p-3 bg-amber-400/10 border border-amber-400/20 rounded-xl mb-6 text-xs text-amber-200">
            <Truck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Insulated cold-box express courier dispatched in 24 hours. Keep refrigerated at 4°C upon delivery.
            </span>
          </div>

          {/* CTA Actions */}
          <button
            onClick={onClose}
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] font-mono tracking-wider uppercase text-sm"
          >
            <span>Continue Exploring Aavin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
