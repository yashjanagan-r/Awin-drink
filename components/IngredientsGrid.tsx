'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Milk, Sparkles, Coffee, ShieldCheck, Check } from 'lucide-react';

const INGREDIENTS = [
  {
    number: '01',
    title: 'Farm-Fresh Aavin Milk',
    tag: 'Whole Co-op Dairy',
    icon: Milk,
    iconColor: 'text-amber-400',
    description:
      'Directly procured twice daily from over 400,000 certified village dairy farmers across Tamil Nadu. Unadulterated, nutrient-dense whole milk rich in natural calcium and bio-available dairy protein.',
    stats: ['8.5g+ Natural Protein', 'No Synthetic Hormones', '100% Traceable Co-op Source'],
  },
  {
    number: '02',
    title: 'Real California Almonds & Saffron',
    tag: 'Heritage Infusion',
    icon: Sparkles,
    iconColor: 'text-amber-300',
    description:
      'Coarsely crushed California and Mamra almonds steeped with pure red Kashmiri saffron filaments. Slow-cooked in whole milk to release delicate nut oils, velvety creaminess, and an unforgettable golden hue.',
    stats: ['Whole Crushed Almond Bits', 'Grade-A Kashmiri Saffron', 'Zero Artificial Flavor Essence'],
  },
  {
    number: '03',
    title: 'Rich Cocoa & Filter Brew',
    tag: 'Single-Origin Roast',
    icon: Coffee,
    iconColor: 'text-amber-500',
    description:
      'Shade-grown Arabica and Robusta beans from South Indian Western Ghats estates, roasted to a dark chocolate sheen and slow-dripped under low temperature. Married with pure alkalized Dutch cocoa.',
    stats: ['Zero Acidity Profile', 'Single-Origin Cocoa Beans', 'Natural Clean Caffeine Kick'],
  },
  {
    number: '04',
    title: 'Aseptic Chilled Tin Freshness',
    tag: 'Cold Sealed Technology',
    icon: ShieldCheck,
    iconColor: 'text-emerald-400',
    description:
      'Hermetically packed into infinitely recyclable food-grade aluminium cans using aseptic nitrogen-dosing. Keeps delicate milk fats and coffee volatiles fresh for 180 days without artificial preservatives.',
    stats: ['Zero Chemical Preservatives', 'Infinitely Recyclable Can', 'Aseptic Nitrogen Blanket'],
  },
];

export default function IngredientsGrid() {
  return (
    <section id="ingredients" className="py-24 sm:py-32 bg-black text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Dialed Editorial Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-amber-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Functional Ingredients. Real Performance.</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.95]">
              PURE ESSENTIALS.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                ZERO COMPROMISE.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-white/50 max-w-md tracking-wide">
            Every tin of Aavin is engineered around honest South Indian agricultural integrity. What you taste is pure milk, premium beans, and sun-ripened ingredients.
          </p>
        </div>

        {/* 4-Column Cards Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative bg-[#0e0e11] hover:bg-[#141418] border border-white/10 hover:border-amber-400/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                {/* Top Number & Tag */}
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {item.number}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 bg-white/5 px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="my-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-amber-400/50 transition-all">
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs font-sans text-white/60 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Micro Bullet Specs */}
                <div className="space-y-2 pt-4 border-t border-white/5 font-mono text-[11px] text-white/80">
                  {item.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
