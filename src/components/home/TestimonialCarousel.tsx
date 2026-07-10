'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  image?: string | null;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  lang?: string;
}

function TestimonialAvatar({ src, name }: { src?: string | null; name: string }) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className="w-full h-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-extrabold text-xl select-none">
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="w-full h-full object-cover select-none"
      onError={() => setImgError(true)}
    />
  );
}

export default function TestimonialCarousel({ testimonials, lang = 'en' }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Reset autoplay timer when index changes
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index]);

  if (!testimonials || testimonials.length === 0) return null;

  // Calculate visible indices in a circular way
  const index1 = index;
  const index2 = (index + 1) % testimonials.length;
  const index3 = (index + 2) % testimonials.length;

  const visibleCards = [
    { item: testimonials[index1], className: 'block w-full h-full' },
    { item: testimonials[index2], className: 'hidden md:block w-full h-full' },
    { item: testimonials[index3], className: 'hidden lg:block w-full h-full' }
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-4 select-none">
      
      {/* Cards Viewport Container */}
      <div className="relative">
        
        {/* Navigation Chevron Left */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-emerald-600 dark:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Previous Review"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Dynamic Responsive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {visibleCards.map(({ item, className }, idx) => {
            // Extract location from role if comma is present, otherwise fallback
            const roleParts = item.role.split(',');
            const location = roleParts[1]?.trim() || roleParts[0]?.trim() || '';

            return (
              <div key={`${item.id}-${idx}`} className={className}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.98, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full group"
                  >
                    {/* Faint Quotation Watermark */}
                    <span className="absolute top-6 right-8 text-slate-100 dark:text-slate-800 text-6xl font-serif select-none pointer-events-none leading-none -mt-2 transition-colors duration-300">
                      ”
                    </span>

                    <div className="space-y-4">
                      {/* Top Info Header */}
                      <div className="flex items-center space-x-4">
                        {/* Avatar Picture */}
                        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 shadow-xs">
                          <TestimonialAvatar src={item.image} name={item.name} />
                        </div>
                        {/* Name, Location & Stars */}
                        <div className="space-y-1">
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold leading-tight mt-0.5">
                              {location}
                            </p>
                          </div>
                          {/* 5 gold stars */}
                          <div className="flex text-amber-500 space-x-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current stroke-current" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Review message text */}
                      <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                        {item.review}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Navigation Chevron Right */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-emerald-600 dark:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Next Review"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

      </div>

      {/* Pagination dots at the bottom */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === index ? 'bg-emerald-600 w-2.5' : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-350'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
