'use client';

import React from 'react';

const MARQUEE_ITEMS = [
  'DRINK CHILLED',
  'PURE AAVIN',
  'BADAM MILK',
  'CHOCOLATE COFFEE',
  'MADAGASCAR VANILLA',
  '100% REAL MILK',
  'SOUTH INDIAN FILTER ROAST',
  'CALIFORNIA ALMONDS',
  'KASHMIRI SAFFRON',
  'ASEPTIC CHILLED TINS',
  'TAMIL NADU CO-OP DAIRY',
];

export default function MarqueeTicker() {
  return (
    <div className="relative w-full overflow-hidden bg-amber-400 py-3 sm:py-4 select-none border-y border-amber-500 text-black">
      <div className="flex w-max animate-marquee font-mono text-xs sm:text-sm font-black uppercase tracking-[0.25em]">
        {/* Render twice for continuous loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center mx-4 sm:mx-6 shrink-0">
            <span>{item}</span>
            <span className="mx-4 sm:mx-6 text-black/40">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
