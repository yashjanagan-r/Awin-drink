'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, ChevronDown, Plus, Minus, MessageSquareQuote, HelpCircle } from 'lucide-react';

const REVIEWS = [
  {
    id: '01',
    name: 'Karthik Subramanian',
    city: 'Chennai, TN',
    rating: 5,
    tagline: 'Best Badam Milk I have tasted outside grandmother’s kitchen.',
    review:
      'The saffron aroma hits you the moment you pop open the chilled can. You can actually chew the real crushed almond bits! Having this ice-cold after a humid Chennai afternoon run is absolute heaven. Subscribed to the 12-pack immediately.',
    verified: 'Verified Buyer • 12-Pack Badam Milk Subscriber',
    flavorBadge: 'Aavin Badam Milk',
  },
  {
    id: '02',
    name: 'Ananya Raghavan',
    city: 'Bengaluru, KA',
    rating: 5,
    tagline: 'Finally, real South Indian filter brew without excessive syrup sweetness.',
    review:
      'Most canned iced coffees in India taste like pure melted sugar. Aavin Chocolate Coffee hits that authentic, bold South Indian filter brew profile with rich dark cocoa. The aluminium can keeps it crisply cold. Replaced my daily café runs.',
    verified: 'Verified Buyer • Chocolate Coffee 12-Pack',
    flavorBadge: 'Aavin Chocolate Coffee',
  },
  {
    id: '03',
    name: 'Dr. Vignesh Natarajan',
    city: 'Coimbatore, TN',
    rating: 5,
    tagline: 'The Trio Variety pack is a staple in my clinic refrigerator.',
    review:
      'Knowing this comes directly from our Tamil Nadu dairy farmers cooperative makes it ten times better. The chocolate vanilla coffee has the perfect silky texture, and the badam milk is a classic. Cold chain delivery arrived in 36 hours with ice packs still intact.',
    verified: 'Verified Buyer • Trio Variety Flight',
    flavorBadge: 'Aavin Trio Pack',
  },
];

const FAQS = [
  {
    question: 'How long do the chilled Aavin cans last and how should I store them?',
    answer:
      'Our aluminium cans are aseptically nitrogen-flushed, giving them an ambient shelf life of up to 180 days from manufacturing without chemical preservatives. For the quintessential Aavin experience, we recommend popping them directly into your refrigerator upon delivery and serving at 4°C.',
  },
  {
    question: 'How does chilled delivery work across India?',
    answer:
      'We pack your order in custom recyclable insulated thermal cold-boxes packed with food-grade gel ice packs. We partner with express 24-48 hour air couriers so your tins arrive cold to your doorstep across major Indian cities including Chennai, Bengaluru, Mumbai, Delhi, and Hyderabad.',
  },
  {
    question: 'Are the aluminium tins 100% recyclable?',
    answer:
      'Yes, 100% infinitely recyclable. Aluminium can be recycled indefinitely without losing its structural integrity or purity. In fact, over 75% of all aluminium ever produced in human history is still in active use today.',
  },
  {
    question: 'How does the "Subscribe & Save 15%" subscription work?',
    answer:
      'When you subscribe, your selected 6-pack or 12-pack is automatically processed and shipped every 4 weeks at a guaranteed 15% discount. You have full freedom to swap flavors, delay a delivery, skip a month, or cancel anytime with zero cancellation penalties.',
  },
  {
    question: 'Is this the same authentic Aavin milk we grew up drinking in Tamil Nadu?',
    answer:
      'Yes! We source 100% of our milk directly from the Tamil Nadu Co-operative Milk Producers’ Federation (TCMPF), uniting over 400,000 dairy farmers. We pair this rich dairy heritage with state-of-the-art cold-brew infusion and modern canned convenience.',
  },
];

export default function ReviewsAndFaq() {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIdx(openFaqIdx === index ? null : index);
  };

  const currentReview = REVIEWS[activeReviewIdx];

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-black text-white relative overflow-hidden border-t border-white/10">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* PART 1: NUMBERED REVIEWS SECTION (01, 02, 03) */}
        <div className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-amber-300 mb-3">
                <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Dairy Enthusiasts</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase">
                TASTED & PRAISED.
              </h2>
            </div>

            {/* Dialed-Style Numbered Tabs: 01, 02, 03 */}
            <div className="flex items-center gap-2 font-mono">
              {REVIEWS.map((review, idx) => (
                <button
                  key={review.id}
                  onClick={() => setActiveReviewIdx(idx)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    activeReviewIdx === idx
                      ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
                      : 'bg-zinc-900 text-white/50 hover:text-white border border-white/10'
                  }`}
                >
                  {review.id}
                </button>
              ))}
            </div>
          </div>

          {/* Active Review Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0e0e11] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl"
            >
              <div className="max-w-3xl">
                {/* Rating Stars & Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex text-amber-400">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-amber-300">
                    {currentReview.flavorBadge}
                  </span>
                </div>

                {/* Tagline / Headline */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug mb-4">
                  &ldquo;{currentReview.tagline}&rdquo;
                </h3>

                {/* Review Body */}
                <p className="text-sm sm:text-base font-sans text-white/70 leading-relaxed mb-8">
                  {currentReview.review}
                </p>

                {/* Reviewer Details */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10 flex-wrap gap-4 font-mono">
                  <div>
                    <div className="text-sm font-bold text-white">
                      {currentReview.name}
                    </div>
                    <div className="text-xs text-white/40">{currentReview.city}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{currentReview.verified}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* PART 2: ANIMATED FAQ ACCORDION */}
        <div id="faq" className="pt-12 border-t border-white/10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-amber-300 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Answers to Common Queries</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIdx === index;
              return (
                <div
                  key={index}
                  className="bg-[#0e0e11] border border-white/10 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-white font-mono">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-amber-400 text-black border-amber-400' : 'text-white/60'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-white/65 leading-relaxed font-sans border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
