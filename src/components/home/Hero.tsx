'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, FileText, Shield, Bike, Car, Heart, Truck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedReveal from '../shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

interface HeroProps {
  lang?: string;
}

export default function Hero({ lang = 'en' }: HeroProps) {
  const t = getTranslation(lang);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-blue-light/30 via-slate-50 to-white dark:from-slate-900/30 dark:via-slate-950 dark:to-slate-950 pt-10 pb-20 lg:pt-16 lg:pb-32 transition-colors duration-300">
      {/* Decorative Animated Gradients in Background */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 rounded-full bg-primary-blue-light/50 dark:bg-primary-blue/10 blur-3xl opacity-60 animate-pulse duration-5000" />
      <div className="absolute bottom-10 left-10 -z-10 w-96 h-96 rounded-full bg-primary-green-light/40 dark:bg-primary-green/5 blur-3xl opacity-50 animate-pulse duration-7000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary-blue-light dark:bg-primary-blue/20 border border-primary-blue/15 dark:border-primary-blue/30 text-primary-blue dark:text-primary-blue-light text-sm font-bold shadow-xs mx-auto lg:mx-0"
            >
              <Shield className="w-4 h-4 text-primary-blue animate-pulse" />
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
              >
                {t.hero.title} <br className="hidden md:inline" />
                <span className="text-gradient">{t.hero.titlePoint}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-350 max-w-2xl mx-auto lg:mx-0"
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-base sm:text-lg text-slate-550 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold"
              >
                {t.hero.description}
              </motion.p>
            </div>

            {/* Bullet Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 text-left"
            >
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary-green shrink-0" />
                <span>{t.hero.bullets.instant}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary-green shrink-0" />
                <span>{t.hero.bullets.compare}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary-green shrink-0" />
                <span>{t.hero.bullets.advisors}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary-green shrink-0" />
                <span>{t.hero.bullets.claim}</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/quote"
                className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-blue to-primary-blue-hover text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <FileText className="w-5 h-5 mr-2" />
                {t.common.getQuote}
              </Link>
              <a
                href="tel:7373723019"
                className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-primary-blue dark:text-primary-blue-light border border-slate-200 dark:border-slate-800 text-base font-bold rounded-2xl shadow-sm hover:shadow-soft transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Phone className="w-5 h-5 mr-2 text-primary-green" />
                {t.common.callNow}
              </a>
            </motion.div>
          </div>

          {/* Right Floating Visuals */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0 flex justify-center">
            <AnimatedReveal direction="none" delay={0.2} className="relative w-full max-w-md aspect-square">
              {/* Central Premium Graphic Container */}
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-primary-blue/10 to-primary-green/10 dark:from-primary-blue/5 dark:to-primary-green/5 border border-white/60 dark:border-slate-800/40 shadow-glass flex items-center justify-center p-8 backdrop-blur-md">
                <svg viewBox="0 0 200 200" className="w-64 h-64 text-primary-blue/30 dark:text-primary-blue-light/10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                  <path d="M60 130C60 110 80 90 100 90C120 90 140 110 140 130" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="70" r="20" stroke="currentColor" strokeWidth="3" />
                  <path d="M100 110V150" stroke="currentColor" strokeWidth="2" />
                </svg>
                
                {/* Floating Insurances Visual Center */}
                <div className="absolute flex flex-col items-center text-center space-y-2">
                  <Shield className="w-16 h-16 text-primary-blue dark:text-primary-blue-light animate-bounce duration-3000" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest">100% Secure</span>
                  <span className="text-xs text-slate-550 dark:text-slate-400 font-semibold">Authorized Advisor</span>
                </div>
              </div>

              {/* Floating Card 1: Car Insurance */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 -left-6 flex items-center space-x-3 p-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800"
              >
                <div className="p-2.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Car Insurance</h4>
                  <p className="text-[10px] text-slate-400 font-bold">Starts @ ₹2,094*</p>
                </div>
              </motion.div>

              {/* Floating Card 2: Bike Insurance */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-10 -right-6 flex items-center space-x-3 p-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800"
              >
                <div className="p-2.5 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-xl">
                  <Bike className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Bike Insurance</h4>
                  <p className="text-[10px] text-slate-400 font-bold">Policy in 2 Mins</p>
                </div>
              </motion.div>

              {/* Floating Card 3: Health Insurance */}
              <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-6 right-6 flex items-center space-x-3 p-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800"
              >
                <div className="p-2.5 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-xl">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Health Insurance</h4>
                  <p className="text-[10px] text-slate-400 font-bold">Cashless Hospital</p>
                </div>
              </motion.div>

              {/* Floating Card 4: Commercial vehicle */}
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute bottom-2 -left-4 flex items-center space-x-3 p-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800"
              >
                <div className="p-2.5 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Heavy Vehicle</h4>
                  <p className="text-[10px] text-slate-400 font-bold">Best Fleet Rates</p>
                </div>
              </motion.div>
            </AnimatedReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
