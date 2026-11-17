'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { ArrowDown, Sparkles, ShieldCheck, Flame, Star } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-linked parallax and scale-down transitions matching dialedcoffee
  const cansScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const cansY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between items-center overflow-hidden bg-black text-white pt-6 pb-12"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orange-700/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      {/* Subheader Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest text-amber-300"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Farm-To-Can Chilled Cold Brew & Badam Milk</span>
        <span className="text-white/40">•</span>
        <span className="text-white/70">Tamil Nadu Pure Dairy</span>
      </motion.div>

      {/* Oversized Kinetic Headline */}
      <motion.div
        style={{ y: textY, opacity }}
        className="z-10 text-center max-w-6xl mx-auto px-4 mt-6 select-none"
      >
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/30">
          CHILLED. CREAMY.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
            PURE AAVIN.
          </span>
        </h1>
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-mono text-white/60 max-w-2xl mx-auto tracking-wide">
          South India&apos;s most iconic dairy cooperative meets modern cold-canning craft. 
          100% farm milk, crushed California almonds, and cold-steeped filter coffee.
        </p>
      </motion.div>

      {/* Floating 3-Tin Hero Composition */}
      <motion.div
        style={{ scale: cansScale, y: cansY }}
        className="relative z-20 w-full max-w-5xl mx-auto px-4 my-8 flex items-center justify-center"
      >
        <div className="relative flex items-center justify-center gap-2 sm:gap-6 md:gap-8">
          {/* Left Tin: Aavin Badam Milk */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ duration: 0.9, delay: 0.2, type: 'spring' }}
            whileHover={{ scale: 1.05, rotate: -2, zIndex: 30 }}
            className="relative w-44 sm:w-64 md:w-72 aspect-[3/4] cursor-pointer group"
          >
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-500/40 transition-all" />
            <Image
              src="/images/aavin-badam.png"
              alt="Aavin Badam Milk Can"
              fill
              priority
              className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_30px_45px_rgba(245,158,11,0.4)] transition-all"
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 border border-amber-400/50 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-amber-300 whitespace-nowrap shadow-xl">
              BADAM MILK • ₹299
            </div>
          </motion.div>

          {/* Center Main Tin: Aavin Chocolate Coffee (Elevated) */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1.08 }}
            transition={{ duration: 0.9, delay: 0.1, type: 'spring' }}
            whileHover={{ scale: 1.15, zIndex: 35 }}
            className="relative w-52 sm:w-72 md:w-80 aspect-[3/4] z-20 cursor-pointer group -my-4"
          >
            <div className="absolute inset-0 bg-amber-600/25 rounded-full blur-3xl group-hover:bg-amber-500/50 transition-all" />
            <Image
              src="/images/aavin-chocolate-coffee.png"
              alt="Aavin Chocolate Coffee Can"
              fill
              priority
              className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)] group-hover:drop-shadow-[0_35px_60px_rgba(217,119,6,0.45)] transition-all"
            />
            {/* Center Pill Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-3 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-lg flex items-center gap-1">
              <Flame className="w-3 h-3 fill-black" />
              <span>Bestseller</span>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 border border-amber-400/50 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-amber-300 whitespace-nowrap shadow-xl">
              CHOCOLATE COFFEE • ₹299
            </div>
          </motion.div>

          {/* Right Tin: Aavin Chocolate Vanilla Coffee */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 8 }}
            animate={{ opacity: 1, x: 0, rotate: 6 }}
            transition={{ duration: 0.9, delay: 0.3, type: 'spring' }}
            whileHover={{ scale: 1.05, rotate: 2, zIndex: 30 }}
            className="relative w-44 sm:w-64 md:w-72 aspect-[3/4] cursor-pointer group"
          >
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl group-hover:bg-yellow-400/40 transition-all" />
            <Image
              src="/images/aavin-chocolate-vanilla.png"
              alt="Aavin Chocolate Vanilla Coffee Can"
              fill
              priority
              className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_30px_45px_rgba(251,191,36,0.4)] transition-all"
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 border border-amber-400/50 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-amber-300 whitespace-nowrap shadow-xl">
              VANILLA COFFEE • ₹299
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Trust Pills & Action Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="z-20 flex flex-col sm:flex-row items-center justify-center gap-4 px-4 w-full max-w-xl mx-auto"
      >
        <a
          href="#flavor-showcase"
          className="w-full sm:w-auto bg-white text-black hover:bg-amber-400 font-mono text-xs uppercase tracking-widest font-bold py-3.5 px-8 rounded-full shadow-2xl transition-all duration-200 active:scale-95 text-center flex items-center justify-center gap-2 group"
        >
          <span>Explore All Flavors</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </a>

        <button
          onClick={() => addToCart('variety-pack', '12-pack', false, 1)}
          className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono text-xs uppercase tracking-widest font-bold py-3.5 px-6 rounded-full shadow-2xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Add Trio Pack (₹579)</span>
        </button>
      </motion.div>

      {/* Bottom Trust Line & Review Badge */}
      <div className="z-10 mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-white/50 uppercase tracking-widest px-4 border-t border-white/5 pt-6 w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="text-white font-bold">4.9/5</span>
          <span>(14,200+ Reviews)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>FSSAI Certified Fresh</span>
        </div>
        <div>
          <span>400,000+ Tamil Nadu Farmers</span>
        </div>
      </div>
    </section>
  );
}
