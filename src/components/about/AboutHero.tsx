'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Calculator } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface AboutHeroProps {
  lang?: string;
}

export default function AboutHero({ lang = 'en' }: AboutHeroProps) {
  const isTa = lang === 'ta';

  const tagText = isTa ? 'எங்களைப் பற்றி' : 'ABOUT US';
  const titleText = isTa ? (
    <span className="block">
      <span className="text-primary-blue dark:text-primary-blue-light block">பிரண்ட்ஸ்</span>
      <span className="text-primary-green dark:text-emerald-400 block">இன்சூரன்ஸ் பாயிண்ட்</span>
    </span>
  ) : (
    <span className="block">
      <span className="text-primary-blue dark:text-primary-blue-light block">About Friends</span>
      <span className="text-primary-green dark:text-emerald-400 block">Insurance Point</span>
    </span>
  );
  const subtitleText = isTa ? (
    <span>உங்கள் நம்பகமான காப்பீட்டு கூட்டாளர் <span className="text-primary-green font-extrabold">2015</span> முதல்</span>
  ) : (
    <span>Your Trusted Insurance Partner Since <span className="text-primary-green font-extrabold">2015</span></span>
  );
  const descText = isTa
    ? 'நிபுணர் வழிகாட்டுதல், மலிவு விலை பிரீமியம் மற்றும் விரைவான சேவையுடன் சிறந்த காப்பீட்டு தீர்வுகளை வழங்க நாங்கள் கடமைப்பட்டுள்ளோம். உங்கள் பாதுகாப்பே எங்கள் முன்னுரிமை.'
    : 'We are committed to providing the best insurance solutions with expert guidance, affordable premiums, and fast service. Your protection is our priority.';
  
  const quoteBtnText = isTa ? 'இலவசக் கட்டணக் கோரிக்கை' : 'Get Free Quote';
  const callBtnText = isTa ? 'இப்போது அழைக்கவும்' : 'Call Now';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/20 via-white to-white dark:from-slate-900/5 dark:via-slate-950 dark:to-slate-950 py-16 lg:py-24 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
      {/* Background Images */}
      <div className="absolute inset-0 select-none pointer-events-none z-0">
        {/* Large screen, light mode */}
        <div className="absolute inset-0 opacity-0 lg:opacity-100 dark:lg:opacity-0 transition-opacity duration-700">
          <Image
            src="/about.jpeg"
            alt="About Us Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Small screen, light mode */}
        <div className="absolute inset-0 opacity-100 lg:opacity-0 dark:opacity-0 transition-opacity duration-700">
          <Image
            src="/about1.jpeg"
            alt="About Us Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Large screen, dark mode */}
        <div className="absolute inset-0 opacity-0 dark:lg:opacity-100 transition-opacity duration-700">
          <Image
            src="/about2.jpeg"
            alt="About Us Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Small screen, dark mode */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 dark:lg:opacity-0 transition-opacity duration-700">
          <Image
            src="/about3.jpeg"
            alt="About Us Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Readability Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/40 lg:from-white lg:via-white/90 lg:to-transparent lg:dark:from-slate-950 lg:dark:via-slate-950/90 lg:dark:to-transparent z-0 transition-colors duration-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatedReveal className="space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-primary-green dark:text-emerald-400 block">
                {tagText}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {titleText}
              </h1>
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-bold">
                {subtitleText}
              </p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.15} className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-bold">
              <p>{descText}</p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.3} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/quote"
                className="flex items-center justify-center px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Calculator className="w-4.5 h-4.5 mr-2 stroke-[2.5]" />
                {quoteBtnText}
              </Link>
              <a
                href="tel:7598657990"
                className="flex items-center justify-center px-6 py-3.5 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-blue-650 dark:text-blue-400 text-sm font-bold rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Phone className="w-4.5 h-4.5 mr-2" />
                {callBtnText}
              </a>
            </AnimatedReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
