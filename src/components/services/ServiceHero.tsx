'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Handshake, RefreshCw } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface ServiceHeroProps {
  lang?: string;
}

export default function ServiceHero({ lang = 'en' }: ServiceHeroProps) {
  const isTa = lang === 'ta';

  const tagText = isTa ? 'எங்கள் சேவைகள்' : 'OUR SERVICES';
  const titleText = isTa ? (
    <span className="block">
      <span className="text-primary-blue dark:text-primary-blue-light block">உங்கள் வாழ்க்கையின்</span>
      <span className="text-primary-green dark:text-emerald-400 block">ஒவ்வொரு கட்டத்திற்கும் பாதுகாப்பு</span>
    </span>
  ) : (
    <span className="block">
      <span className="text-primary-blue dark:text-primary-blue-light block">Protection For Every</span>
      <span className="text-primary-green dark:text-emerald-400 block">Stage Of Your Life</span>
    </span>
  );
  
  const descText = isTa
    ? 'உங்களுக்கும் உங்கள் அன்புக்குரியவர்களுக்கும் மிகவும் முக்கியமானவற்றைப் பாதுகாக்க வடிவமைக்கப்பட்ட விரிவான காப்பீட்டுத் தீர்வுகளை நாங்கள் வழங்குகிறோம்.'
    : 'We offer a wide range of insurance solutions designed to protect what matters most to you and your loved ones.';

  const badges = [
    {
      label: isTa ? 'நம்பகமான ஆலோசனை' : 'Trusted Advice',
      icon: <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      bgClass: 'bg-blue-50 dark:bg-blue-950/30 border-blue-100/50 dark:border-blue-900/10'
    },
    {
      label: isTa ? 'பரந்த அளவிலான காப்பீட்டுத் திட்டங்கள்' : 'Wide Range Of Insurance Plans',
      icon: <Handshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      bgClass: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100/50 dark:border-emerald-900/10'
    },
    {
      label: isTa ? 'தொந்தரவு இல்லாத செயல்முறை' : 'Hassle-Free Process',
      icon: <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin-slow" />,
      bgClass: 'bg-blue-50 dark:bg-blue-950/30 border-blue-100/50 dark:border-blue-900/10'
    }
  ];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
      {/* Background Images */}
      <div className="absolute inset-0 select-none pointer-events-none z-0">
        {/* Large screen, light mode */}
        <div className="absolute inset-0 opacity-0 lg:opacity-100 dark:lg:opacity-0 transition-opacity duration-700">
          <Image
            src="/service.jpeg"
            alt="Services Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Small screen, light mode */}
        <div className="absolute inset-0 opacity-100 lg:opacity-0 dark:opacity-0 transition-opacity duration-700">
          <Image
            src="/service1.jpeg"
            alt="Services Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Large screen, dark mode */}
        <div className="absolute inset-0 opacity-0 dark:lg:opacity-100 transition-opacity duration-700">
          <Image
            src="/service2.jpeg"
            alt="Services Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Small screen, dark mode */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 dark:lg:opacity-0 transition-opacity duration-700">
          <Image
            src="/service3.jpeg"
            alt="Services Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Readability Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/40 lg:from-white lg:via-white/90 lg:to-transparent lg:dark:from-slate-950 lg:dark:via-slate-950/90 lg:dark:to-transparent z-0 transition-colors duration-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatedReveal className="space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-primary-green dark:text-emerald-400 block">
                {tagText}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {titleText}
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                {descText}
              </p>
            </AnimatedReveal>

            {/* Badges */}
            <AnimatedReveal delay={0.2} className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
              {badges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-full border ${badge.bgClass} shadow-xs shrink-0`}
                >
                  <div className="flex items-center justify-center p-0.5 shrink-0">
                    {badge.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-350">
                    {badge.label}
                  </span>
                </div>
              ))}
            </AnimatedReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
