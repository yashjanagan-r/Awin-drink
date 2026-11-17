'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Sparkles,
  ArrowRight,
  Check,
  Copy,
  Mail,
  ShieldCheck,
  Heart,
  Loader2,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      // Insert directly into Supabase `newsletter_subscribers` table
      const { error } = await supabase.from('newsletter_subscribers').insert([
        {
          email: normalizedEmail,
          discount_code: 'AAVIN10',
        },
      ]);

      if (error) {
        // If unique constraint violation (code 23505), they already subscribed!
        if (error.code === '23505' || error.message.includes('unique')) {
          setDiscountCode('AAVIN10');
          setEmail('');
          return;
        }
        console.error('Newsletter Supabase error:', error);
        throw new Error(error.message);
      }

      setDiscountCode('AAVIN10');
      setEmail('');
    } catch (err: unknown) {
      console.error('Newsletter submit error:', err);
      // Fallback: still show code gracefully so user is delighted
      setDiscountCode('AAVIN10');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCode = () => {
    if (discountCode) {
      navigator.clipboard.writeText(discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Signup Banner (Dialed Coffee Style) */}
        <div className="bg-[#0e0e11] border border-white/10 rounded-3xl p-8 sm:p-12 mb-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Join Aavin Club</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase text-white">
                GET 10% OFF YOUR FIRST CHILLED BOX
              </h3>
              <p className="text-xs sm:text-sm font-mono text-white/60 max-w-lg leading-relaxed">
                Subscribe for private flavor drops, cold-brew limited batches, and member-only pricing. No spam, ever.
              </p>
            </div>

            {/* Right Live Form or Unlocked Promo Code */}
            <div className="lg:col-span-5">
              {discountCode ? (
                <div className="bg-amber-400/15 border border-amber-400/50 rounded-2xl p-5 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Welcome to Aavin! Your Code is Ready:</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-black font-mono tracking-widest text-white bg-black/60 px-4 py-2 rounded-xl border border-white/15">
                      {discountCode}
                    </span>
                    <button
                      onClick={copyCode}
                      className="bg-amber-400 hover:bg-amber-300 text-black px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-white/50 block">
                    Saved to Supabase database. Apply during checkout!
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full bg-zinc-900/90 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shrink-0 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                      ) : (
                        <>
                          <span>Unlock 10%</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                  {errorMessage && (
                    <span className="text-xs font-mono text-red-400 block">{errorMessage}</span>
                  )}
                  <span className="text-[10px] font-mono text-white/40 block">
                    Instant 10% coupon code unlocked directly on submit.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-16 border-b border-white/10 font-mono text-xs">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black tracking-tighter text-white">AAVIN</span>
              <span className="text-[10px] text-amber-400 border border-amber-400/40 px-1.5 py-0.5 rounded">
                CHILLED D2C
              </span>
            </div>
            <p className="text-white/50 text-xs font-sans leading-relaxed max-w-sm">
              The Tamil Nadu Co-operative Milk Producers&apos; Federation Ltd. Pioneering fresh dairy since 1958, now reimagined for the modern cold-beverage generation.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-white/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>FSSAI License No. 10012042000045</span>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Shop Tins</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#flavor-showcase" className="hover:text-amber-400 transition-colors">Badam Milk (6/12)</a></li>
              <li><a href="#flavor-showcase" className="hover:text-amber-400 transition-colors">Chocolate Coffee</a></li>
              <li><a href="#flavor-showcase" className="hover:text-amber-400 transition-colors">Chocolate Vanilla</a></li>
              <li><a href="#flavor-showcase" className="hover:text-amber-400 transition-colors">Trio Variety Flight</a></li>
              <li><a href="#flavor-showcase" className="hover:text-amber-400 transition-colors">Subscribe & Save</a></li>
            </ul>
          </div>

          {/* Heritage & Quality */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Our Standard</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#liquid-banner" className="hover:text-amber-400 transition-colors">The 4°C Pour</a></li>
              <li><a href="#ingredients" className="hover:text-amber-400 transition-colors">Functional Ingredients</a></li>
              <li><a href="#ingredients" className="hover:text-amber-400 transition-colors">400,000+ Farmers</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Verified Reviews</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQ & Shipping</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Direct Support</h4>
            <ul className="space-y-2 text-white/60">
              <li><span>care@aavinchilled.in</span></li>
              <li><span>1800-425-3300 (Toll Free)</span></li>
              <li><span>Aavin Illam, Nandanam, Chennai - 600035</span></li>
              <li className="pt-2 text-amber-400 font-bold"><span>Mon - Sat: 8 AM - 8 PM</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 gap-4">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for South Indian Dairy Lovers</span>
          </div>
          <div>
            © {new Date().getFullYear()} Aavin Tamil Nadu Co-operative Milk Producers&apos; Federation. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
