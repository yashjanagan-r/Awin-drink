'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, SUBSCRIPTION_DISCOUNT } from '@/lib/products';
import { FlavorId, PackSize } from '@/lib/types';
import {
  Check,
  ShoppingBag,
  Sparkles,
  RefreshCw,
  Zap,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function FlavorShowcase() {
  const [activeFlavorId, setActiveFlavorId] = useState<FlavorId>('badam');
  const [selectedPackSize, setSelectedPackSize] = useState<PackSize>('12-pack');
  const [isSubscription, setIsSubscription] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { addToCart } = useCart();
  const currentProduct = PRODUCTS.find((p) => p.id === activeFlavorId) || PRODUCTS[0];

  // 3D Mouse Tilt state
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Pricing calculations
  const isVariety = currentProduct.id === 'variety-pack';
  const effectivePackSize: PackSize = isVariety ? '12-pack' : selectedPackSize;
  const basePrice = currentProduct.prices[effectivePackSize] || currentProduct.prices['12-pack'];
  const originalPrice = currentProduct.originalPrices[effectivePackSize] || currentProduct.originalPrices['12-pack'];
  const finalPrice = isSubscription ? Math.round(basePrice * (1 - SUBSCRIPTION_DISCOUNT)) : basePrice;

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(currentProduct.id, effectivePackSize, isSubscription, 1);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <section
      id="flavor-showcase"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-700 ease-out flex flex-col justify-center overflow-hidden"
      style={{
        background: currentProduct.heroGradient,
      }}
    >
      {/* Background ambient light */}
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 160px ${currentProduct.accentColor}`,
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Kicker */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-black/60 border border-white/10 px-4 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-white/70 mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Flavor Switcher</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white uppercase">
            CHOOSE YOUR CHILLED FIX
          </h2>
          <p className="text-sm sm:text-base font-mono text-white/60 max-w-xl mx-auto mt-2">
            Switch between single-origin roasts, saffron infusions, and multi-packs.
          </p>
        </div>

        {/* Dialed-style Flavor Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {PRODUCTS.map((product) => {
            const isActive = product.id === activeFlavorId;
            return (
              <button
                key={product.id}
                onClick={() => {
                  setActiveFlavorId(product.id);
                  if (product.id === 'variety-pack') {
                    setSelectedPackSize('12-pack');
                  }
                }}
                className={`relative px-5 py-3 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 backdrop-blur-md ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-105'
                    : 'bg-black/50 text-white/70 hover:text-white border border-white/15 hover:border-white/30'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: product.accentColor }}
                />
                <span>{product.name.replace('Aavin ', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Showcase Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 3D Mouse-Tilt Can Visual */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-7 flex flex-col items-center justify-center relative perspective-[1000px] py-8"
          >
            {/* Atmospheric Glow */}
            <div
              className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full blur-[110px] pointer-events-none transition-all duration-700"
              style={{
                backgroundColor: currentProduct.glowColor,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative w-72 sm:w-96 md:w-[420px] aspect-[3/4] cursor-grab active:cursor-grabbing"
              >
                {/* Product Image */}
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_35px_50px_rgba(0,0,0,0.95)]"
                />

                {/* Floating Micro-Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-2 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-left font-mono text-[11px] text-white/90 shadow-2xl flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <div className="font-bold text-amber-400">{currentProduct.specs.protein}</div>
                    <div className="text-[9px] text-white/50">{currentProduct.specs.dairySource}</div>
                  </div>
                </motion.div>

                {/* Floating Shelf-Life Badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-8 right-2 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-right font-mono text-[11px] text-white/90 shadow-2xl"
                >
                  <div className="font-bold text-white">{currentProduct.specs.shelfLife}</div>
                  <div className="text-[9px] text-amber-400">{currentProduct.specs.serving}</div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="text-center mt-3 text-xs font-mono text-white/40 tracking-wider">
              ✦ Hover & Move Mouse to Inspect 3D Chilled Can Condensation ✦
            </div>
          </div>

          {/* Right Column: Editorial Product Details & Purchase Form */}
          <div className="lg:col-span-5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Title & Tagline */}
            <div>
              <div className="inline-block bg-white/10 text-amber-300 font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-2">
                {currentProduct.badge}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                {currentProduct.name}
              </h3>
              <p className="mt-2 text-sm font-mono text-amber-200/90 leading-relaxed italic">
                &ldquo;{currentProduct.tagline}&rdquo;
              </p>
              <p className="mt-3 text-xs text-white/70 leading-relaxed font-sans">
                {currentProduct.description}
              </p>
            </div>

            {/* Tasting Notes Tags */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest block">
                Flavor Profile & Craft Notes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentProduct.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-lg"
                  >
                    ✦ {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/60 uppercase tracking-wider">Select Pack Size</span>
                <span className="text-amber-400 text-[11px]">Free Shipping &gt; ₹999</span>
              </div>

              {isVariety ? (
                <div className="p-3.5 bg-amber-400/10 border border-amber-400/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-white">
                      12 Tins (4x Badam, 4x Choc Coffee, 4x Vanilla)
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-amber-400">₹579</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedPackSize('6-pack')}
                    className={`p-3 rounded-xl border text-left transition-all font-mono ${
                      selectedPackSize === '6-pack'
                        ? 'border-amber-400 bg-amber-400/10 text-white shadow-lg'
                        : 'border-white/10 bg-zinc-900/50 text-white/70 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">6 Tins</span>
                      <span className="text-amber-400 font-bold">₹299</span>
                    </div>
                    <div className="text-[10px] text-white/40 mt-1">₹49.8 per tin</div>
                  </button>

                  <button
                    onClick={() => setSelectedPackSize('12-pack')}
                    className={`p-3 rounded-xl border text-left transition-all font-mono relative ${
                      selectedPackSize === '12-pack'
                        ? 'border-amber-400 bg-amber-400/10 text-white shadow-lg'
                        : 'border-white/10 bg-zinc-900/50 text-white/70 hover:border-white/20'
                    }`}
                  >
                    <div className="absolute -top-2 right-2 bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                      Best Value
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">12 Tins</span>
                      <span className="text-amber-400 font-bold">₹549</span>
                    </div>
                    <div className="text-[10px] text-white/40 mt-1">₹45.7 per tin</div>
                  </button>
                </div>
              )}
            </div>

            {/* Subscribe & Save 15% Toggle */}
            <div
              onClick={() => setIsSubscription(!isSubscription)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                isSubscription
                  ? 'border-emerald-400 bg-emerald-950/30'
                  : 'border-white/10 bg-zinc-900/40 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                    isSubscription
                      ? 'bg-emerald-400 border-emerald-400 text-black'
                      : 'border-white/30 bg-transparent'
                  }`}
                >
                  {isSubscription && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Subscribe & Save 15%
                    </span>
                    <span className="text-[10px] bg-emerald-400/20 text-emerald-300 font-mono px-1.5 py-0.5 rounded">
                      Every 4 Weeks
                    </span>
                  </div>
                  <span className="text-[10px] text-white/50 block font-mono">
                    Auto-delivered chilled. Pause, skip, or cancel anytime.
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  -15% OFF
                </span>
              </div>
            </div>

            {/* Price Display & Add To Cart CTA */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-4">
              <div className="shrink-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                    ₹{finalPrice}
                  </span>
                  <span className="text-sm font-mono text-white/40 line-through">
                    ₹{originalPrice}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/50 block">
                  Taxes Included • {isSubscription ? 'Recurring' : 'One-Time'}
                </span>
              </div>

              <button
                onClick={handleAdd}
                disabled={isAdding}
                className="flex-1 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-black font-bold py-4 px-6 rounded-2xl font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl transition-all"
              >
                {isAdding ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-black" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>Add To Chilled Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
