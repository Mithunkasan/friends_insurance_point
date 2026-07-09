'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, FileText, CheckCircle2, Clock, IndianRupee, ShieldCheck, Headphones, Heart, Users, Plane, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTranslation } from '@/locales/translate';

interface HeroProps {
  lang?: string;
}

export default function Hero({ lang = 'en' }: HeroProps) {
  const t = getTranslation(lang);

  const badges = [
    {
      id: 'health',
      title: lang === 'ta' ? 'ஆரோக்கிய\nகாப்பீடு' : 'Health\nInsurance',
      icon: Heart,
      className: 'absolute top-[5%] left-[18%]'
    },
    {
      id: 'life',
      title: lang === 'ta' ? 'ஆயுள்\nகாப்பீடு' : 'Life\nInsurance',
      icon: Users,
      className: 'absolute top-[40%] left-[2%]'
    },
    {
      id: 'travel',
      title: lang === 'ta' ? 'பயண\nகாப்பீடு' : 'Travel\nInsurance',
      icon: Plane,
      className: 'absolute top-[5%] right-[18%]'
    },
    {
      id: 'accident',
      title: lang === 'ta' ? 'விபத்து\nகாப்பீடு' : 'Accident\nInsurance',
      icon: Shield,
      className: 'absolute top-[40%] right-[2%]'
    }
  ];

  const renderSubtitle = () => {
    const subtitle = t.hero.subtitle;
    if (lang === 'en') {
      const parts = subtitle.split('10 Minutes.');
      if (parts.length > 1) {
        return (
          <>
            {parts[0]}
            <span className="text-primary-green">10 Minutes.</span>
            {parts[1]}
          </>
        );
      }
    } else if (lang === 'ta') {
      const parts = subtitle.split('10 நிமிடங்களில்');
      if (parts.length > 1) {
        return (
          <>
            {parts[0]}
            <span className="text-primary-green">10 நிமிடங்களில்</span>
            {parts[1]}
          </>
        );
      }
    }
    return subtitle;
  };

  return (
    <section className="relative overflow-hidden bg-[url('/hero1.jpeg')] dark:bg-[url('/hero2.jpeg')] lg:bg-[url('/hero.jpeg')] lg:dark:bg-[url('/hero3.jpeg')] bg-cover bg-center bg-no-repeat pt-10 pb-[380px] md:pb-[480px] lg:pt-20 lg:pb-32 transition-all duration-300">
      {/* Background Overlay to ensure readability and contrast in both light & dark modes */}
      <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/20 -z-10 transition-colors duration-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[500px] lg:min-h-[580px]">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200/50 dark:border-green-900/30 text-primary-green dark:text-green-400 text-xs font-bold shadow-xs mx-auto lg:mx-0 uppercase tracking-wider"
            >
              <CheckCircle2 className="w-4 h-4 text-primary-green dark:text-green-400" />
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
              >
                <span className="text-primary-green dark:text-green-400">{t.hero.title}</span> <br className="hidden md:inline" />
                <span className="text-primary-blue dark:text-blue-400">{t.hero.titlePoint}</span>
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 max-w-2xl mx-auto lg:mx-0"
              >
                {renderSubtitle()}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-base sm:text-lg text-slate-650 dark:text-slate-350 max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold"
              >
                {t.hero.description}
              </motion.p>
            </div>

            {/* Bullet Points as Card Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full text-left"
            >
              {/* Card 1 */}
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-xs">
                <div className="p-2 bg-green-50 dark:bg-green-950/40 text-primary-green dark:text-green-400 rounded-xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {t.hero.bullets.instant}
                </span>
              </div>

              {/* Card 2 */}
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-xs">
                <div className="p-2 bg-green-50 dark:bg-green-950/40 text-primary-green dark:text-green-400 rounded-xl shrink-0">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {t.hero.bullets.compare}
                </span>
              </div>

              {/* Card 3 */}
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-xs">
                <div className="p-2 bg-green-50 dark:bg-green-950/40 text-primary-green dark:text-green-400 rounded-xl shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {t.hero.bullets.advisors}
                </span>
              </div>

              {/* Card 4 */}
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-xs">
                <div className="p-2 bg-green-50 dark:bg-green-950/40 text-primary-green dark:text-green-400 rounded-xl shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {t.hero.bullets.claim}
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="tel:7373723019"
                className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-primary-green hover:bg-primary-green-hover text-white text-base font-bold rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 shrink-0"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t.common.callNow}: 7373723019
              </a>
              <Link
                href="/quote"
                className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-primary-blue dark:text-primary-blue-light border-2 border-primary-blue/30 dark:border-primary-blue/50 text-base font-bold rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <FileText className="w-5 h-5 mr-2" />
                {t.common.getQuote}
              </Link>
            </motion.div>
          </div>

          {/* Right Floating Badges (Desktop only) */}
          <div className="hidden lg:block lg:col-span-5 relative w-full h-[550px] self-stretch">
            {badges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`${badge.className} flex flex-col items-center pointer-events-auto group`}
                >
                  {/* Outer White Circle */}
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 dark:border-slate-800 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                    {/* Inner Blue Circle */}
                    <div className="w-11 h-11 rounded-full bg-primary-blue dark:bg-primary-blue/90 flex items-center justify-center text-white">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Text Label */}
                  <span className="mt-2 text-[11px] font-extrabold text-[#003275] dark:text-slate-200 text-center leading-tight whitespace-pre-line bg-white/90 dark:bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-100/50 dark:border-slate-800/50 shadow-xs">
                    {badge.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
