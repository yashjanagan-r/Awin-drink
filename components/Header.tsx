'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';

export default function Header() {
  const { totalItemsCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#170b04] via-[#241306] to-[#170b04] text-amber-300/90 text-xs font-mono py-2 px-4 border-b border-amber-900/30 text-center flex items-center justify-center gap-2 overflow-hidden tracking-wider uppercase">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
        <span>Free Chilled Express 48-Hr Delivery on Orders Over ₹999</span>
        <span className="hidden md:inline text-amber-500/50">•</span>
        <span className="hidden md:inline text-white/70">Use Code <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">AAVIN10</span> for 10% Off</span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-black/40 backdrop-blur-sm border-b border-white/5 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Nav (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-mono tracking-widest uppercase text-white/70">
            <a href="#flavor-showcase" className="hover:text-amber-400 transition-colors">
              Shop Tins
            </a>
            <a href="#liquid-banner" className="hover:text-amber-400 transition-colors">
              The Pour
            </a>
            <a href="#ingredients" className="hover:text-amber-400 transition-colors">
              Ingredients
            </a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Center Brand Logo */}
          <a href="#" className="flex flex-col items-center group">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase group-hover:text-amber-400 transition-colors">
                AAVIN
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 border border-amber-400/40 px-1.5 py-0.5 rounded bg-amber-400/10">
                CHILLED
              </span>
            </div>
            <span className="text-[9px] tracking-[0.25em] font-mono text-white/40 uppercase -mt-0.5">
              EST. 1958 • TAMIL NADU
            </span>
          </a>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <a
              href="#flavor-showcase"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-zinc-300 hover:text-white px-3 py-1.5 rounded border border-white/10 hover:border-amber-400/40 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Bulk Orders</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-white/10 hover:bg-amber-400 hover:text-black text-white px-4 py-2 rounded-full border border-white/15 transition-all duration-200 group active:scale-95"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:text-black transition-colors" />
              <span className="text-xs font-mono tracking-wider font-semibold">
                CART ({totalItemsCount})
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950/95 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3 font-mono text-sm tracking-wider uppercase text-white/80">
              <a
                href="#flavor-showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 transition-colors py-1"
              >
                Shop Tins
              </a>
              <a
                href="#liquid-banner"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 transition-colors py-1"
              >
                The Pour
              </a>
              <a
                href="#ingredients"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 transition-colors py-1"
              >
                Functional Ingredients
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 transition-colors py-1"
              >
                Reviews (01, 02, 03)
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 transition-colors py-1"
              >
                FAQ
              </a>
            </nav>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono">
              <span>Pure Tamil Nadu Dairy Co-op</span>
              <span>100% Recyclable Tins</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
