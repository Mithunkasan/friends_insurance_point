'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Phone, Calculator } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface AboutPromiseProps {
  lang?: string;
}

export default function AboutPromise({ lang = 'en' }: AboutPromiseProps) {
  const isTa = lang === 'ta';

  const promises = [
    {
      title: isTa ? 'நேர்மையான ஆலோசனை' : 'Honest Advice',
      icon: <Users className="w-9 h-9 text-emerald-600" />,
    },
    {
      title: isTa ? 'சிறந்த பிரீமியம் ஒப்பீடு' : 'Best Premium Comparison',
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9 text-emerald-600" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#10b981" fillOpacity="0.1" stroke="#059669" />
          <path d="M9 7h6 M9 10h5 M12 7a3 3 0 0 1 0 6H9 M11 13l4 4" stroke="#059669" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: isTa ? 'விரைவான ஆவணமாக்கல்' : 'Fast Documentation',
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9 text-emerald-600" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#10b981" fillOpacity="0.1" stroke="#059669" />
          <polyline points="14 2 14 8 20 8" stroke="#059669" />
          <circle cx="16" cy="16" r="4.5" fill="#10b981" stroke="#059669" />
          <path d="m14 16 1.5 1.5 2.5-2.5" stroke="white" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: isTa ? 'விரைவான உரிமைகோரல் ஆதரவு' : 'Quick Claim Support',
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9 text-emerald-600" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#10b981" fillOpacity="0.1" stroke="#059669" />
          <path d="m9 12 2 2 4-4" stroke="#059669" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      title: isTa ? 'வாழ்நாள் புதுப்பித்தல் உதவி' : 'Lifetime Renewal Assistance',
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9 text-emerald-600" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" fill="#10b981" fillOpacity="0.1" stroke="#059669" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-950 py-8 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Promise Component */}
        <AnimatedReveal direction="up" className="bg-emerald-50/10 dark:bg-emerald-950/5 border border-emerald-100/50 dark:border-emerald-900/20 rounded-3xl p-8 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 -z-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 -z-10 w-48 h-48 bg-primary-green/5 rounded-full blur-2xl" />

          <h4 className="text-center text-xs font-extrabold tracking-widest text-primary-green dark:text-emerald-400 uppercase mb-10">
            {isTa ? 'எங்கள் வாக்குறுதி' : 'OUR PROMISE'}
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6 lg:gap-y-0 lg:gap-x-0 items-start">
            {promises.map((promise, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-4 lg:px-6 lg:border-r lg:border-slate-200 dark:lg:border-slate-800 last:lg:border-r-0 w-full group"
              >
                {/* Icon Wrapper */}
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-100/65 dark:group-hover:bg-emerald-900/20 transition-all duration-300 shadow-inner border border-emerald-100/20 dark:border-emerald-900/10">
                  {promise.icon}
                </div>
                
                {/* Title */}
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-4 leading-tight max-w-[150px] mx-auto">
                  {promise.title}
                </span>
              </div>
            ))}
          </div>
        </AnimatedReveal>

        {/* CTA Component */}
        <AnimatedReveal direction="up" delay={0.15} className="bg-primary-blue text-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-white/5 rounded-full blur-xl" />
          <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 bg-primary-green/10 rounded-full blur-xl" />

          {/* Left Graphic: Umbrella + Shield */}
          <div className="relative w-28 h-28 flex flex-col items-center justify-center shrink-0">
            {/* Umbrella */}
            <div className="absolute top-0 z-10 filter drop-shadow-[0_8px_16px_rgba(37,99,235,0.25)]">
              <svg viewBox="0 0 24 24" className="w-22 h-22 text-blue-500 fill-blue-500" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v1M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z" fill="#3b82f6" stroke="#2563eb" />
                <path d="M12 12v6a2.5 2.5 0 0 0 5 0" fill="none" stroke="#2563eb" />
              </svg>
            </div>
            {/* Shield */}
            <div className="absolute bottom-1 z-20 filter drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]">
              <svg viewBox="0 0 24 24" className="w-12 h-14 text-emerald-600 fill-emerald-500" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#10b981" stroke="#059669" />
                <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>

          {/* Middle Text content */}
          <div className="flex-1 text-center lg:text-left space-y-2.5 z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isTa ? 'மிகவும் முக்கியமானவற்றைப் பாதுகாக்கத் தயாரா?' : 'Ready to Protect What Matters Most?'}
            </h3>
            <p className="text-sm sm:text-base text-blue-100 font-bold leading-relaxed max-w-xl">
              {isTa ? 'வெறும் 10 நிமிடங்களில் உங்களுக்கான சரியான காப்பீட்டுத் திட்டத்தைக் கண்டறிய நாங்கள் உதவுகிறோம்.' : 'We help you find the perfect insurance plan in just 10 minutes.'}
            </p>
          </div>

          {/* Right Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto z-10">
            <Link
              href="/quote"
              className="flex items-center justify-center w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Calculator className="w-4.5 h-4.5 mr-2 stroke-[2.5]" />
              {isTa ? 'இலவசக் கட்டணக் கோரிக்கை' : 'Get Free Quote'}
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-primary-blue text-sm font-bold rounded-xl shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Phone className="w-4.5 h-4.5 mr-2" />
              {isTa ? 'எங்களைத் தொடர்பு கொள்ளவும்' : 'Contact Us'}
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
