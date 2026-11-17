'use client';

import Hero from '@/components/Hero';
import MarqueeTicker from '@/components/MarqueeTicker';
import FlavorShowcase from '@/components/FlavorShowcase';
import LiquidMotionBanner from '@/components/LiquidMotionBanner';
import IngredientsGrid from '@/components/IngredientsGrid';
import ReviewsAndFaq from '@/components/ReviewsAndFaq';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 1. Full-Screen Kinetic Hero Section */}
      <Hero />

      {/* Dynamic Marquee Ticker */}
      <MarqueeTicker />

      {/* 2. Interactive Alternating Flavor & Color-Morph Showcase (Signature Section) */}
      <FlavorShowcase />

      {/* 3. Scroll-Driven Liquid Motion-Flow Banner */}
      <LiquidMotionBanner />

      {/* 4. Ingredient & Quality Breakdown Grid (4-Column) */}
      <IngredientsGrid />

      {/* 5. Numbered Customer Reviews (01, 02, 03) & Animated FAQ Accordion */}
      <ReviewsAndFaq />

      {/* Kinetic Marquee before Footer */}
      <MarqueeTicker />
    </div>
  );
}
