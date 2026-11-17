'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Droplet, ShieldCheck, Flame, Sparkles } from 'lucide-react';

export default function LiquidMotionBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scroll-linked scale and opacity reveal
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.6, 1, 1, 0.7]);
  const textTranslate = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="liquid-banner"
      ref={containerRef}
      className="relative py-28 sm:py-36 bg-black overflow-hidden flex items-center justify-center border-y border-white/10"
    >
      {/* Background glow behind video container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-amber-300 mb-3">
            <Droplet className="w-3.5 h-3.5 text-amber-400" />
            <span>Liquid Motion & Pour Dynamics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white uppercase">
            THE VELVET CASCADE
          </h2>
          <p className="text-xs sm:text-sm font-mono text-white/50 max-w-xl mx-auto mt-2 uppercase tracking-wider">
            Cold-infused at 4°C for silk-smooth texture and zero acidity
          </p>
        </div>

        {/* Video Canvas Container */}
        <motion.div
          style={{ scale, opacity }}
          className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.9)] bg-zinc-950 group"
        >
          {/* Native HTML5 Video Element */}
          <video
            src="/videos/aavin-pour.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.08] transition-all duration-700 group-hover:scale-105"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 pointer-events-none" />

          {/* Overlaid Kinetic Typography & Badge Banner */}
          <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-between pointer-events-none">
            {/* Top Bar inside Video */}
            <div className="flex justify-between items-center text-xs font-mono text-white/80">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="uppercase tracking-widest">LIVE POUR SPEC • 60 FPS</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <span>ASEPTIC CHILLED PACKAGING</span>
              </div>
            </div>

            {/* Bottom Giant Overlay Text */}
            <motion.div style={{ y: textTranslate }} className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-amber-300 font-mono text-xs sm:text-sm tracking-widest uppercase font-bold">
                <span>100% Real Farm Milk</span>
                <span className="text-white/40">•</span>
                <span>Roasted Coffee Beans</span>
                <span className="text-white/40">•</span>
                <span>Zero Preservatives</span>
                <span className="text-white/40">•</span>
                <span>Chilled Perfection</span>
              </div>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight max-w-2xl">
                CRAFTED FOR PEAK FRESHNESS. DRINK STRAIGHT FROM THE CHILLED TIN.
              </h3>
            </motion.div>
          </div>
        </motion.div>

        {/* 3 Micro-Metrics below the Video */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto mt-8">
          <div className="p-4 bg-zinc-950/70 border border-white/10 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Cold Chain</div>
              <div className="text-sm font-bold text-white">48-Hr Insulated Dispatch</div>
            </div>
          </div>

          <div className="p-4 bg-zinc-950/70 border border-white/10 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Preservation</div>
              <div className="text-sm font-bold text-white">Zero Chemical Additives</div>
            </div>
          </div>

          <div className="p-4 bg-zinc-950/70 border border-white/10 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Traceability</div>
              <div className="text-sm font-bold text-white">Farm to Tin within 24 Hours</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
