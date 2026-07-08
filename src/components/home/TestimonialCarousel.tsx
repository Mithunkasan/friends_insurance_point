'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTranslation } from '@/locales/translate';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  lang?: string;
}

export default function TestimonialCarousel({ testimonials, lang = 'en' }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const t = getTranslation(lang);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Reset autoplay timer when index changes
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      {/* Google Style Header badge */}
      <div className="flex items-center justify-center space-x-2 mb-8">
        <div className="flex items-center text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-350">{t.testimonials.googleRating}</span>
      </div>

      {/* Main Review Card Box */}
      <div className="relative h-[290px] sm:h-[230px] overflow-hidden flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute w-full bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-soft border border-slate-100/60 dark:border-slate-800/60 glass-card flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center space-x-1 text-amber-455 mb-4">
                {[...Array(testimonials[index].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-base sm:text-lg italic text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                "{testimonials[index].review}"
              </p>
            </div>
            
            <div className="mt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800/80 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-blue-light/50 dark:bg-primary-blue/20 text-primary-blue dark:text-primary-blue-light flex items-center justify-center font-bold text-base">
                  {testimonials[index].name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">{testimonials[index].name}</h4>
                  <p className="text-xs text-slate-450 dark:text-slate-400 font-bold">{testimonials[index].role}</p>
                </div>
              </div>

              {/* Google Verified Reviewer G Badge */}
              <div className="flex items-center space-x-1 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded-full border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">G</span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wide">
                  {t.testimonials.verified}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8">
        {/* Pagination Dots */}
        <div className="flex space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === index ? 'bg-primary-blue w-6' : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Action Arrows */}
        <div className="flex space-x-3">
          <button
            onClick={prevSlide}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-750 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-755 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
