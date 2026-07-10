'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Calculator, Heart, Car, ShieldAlert, Plane } from 'lucide-react';
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

  // Badges around family
  const badges = [
    {
      label: isTa ? 'சுகாதார காப்பீடு' : 'Health Insurance',
      sub: 'Health Insurance',
      icon: <Heart className="w-5 h-5 text-blue-650 dark:text-blue-400" />,
      posClass: 'top-[12%] -left-8 sm:-left-12 lg:-left-16',
    },
    {
      label: isTa ? 'வாகன காப்பீடு' : 'Vehicle Insurance',
      sub: 'Vehicle Insurance',
      icon: <Car className="w-5 h-5 text-blue-650 dark:text-blue-400" />,
      posClass: 'top-[15%] -right-8 sm:-right-12 lg:-right-16',
    },
    {
      label: isTa ? 'ஆயுள் காப்பீடு' : 'Life Insurance',
      sub: 'Life Insurance',
      icon: <ShieldAlert className="w-5 h-5 text-blue-650 dark:text-blue-400" />,
      posClass: 'bottom-[22%] -left-8 sm:-left-12 lg:-left-16',
    },
    {
      label: isTa ? 'பயண காப்பீடு' : 'Travel Insurance',
      sub: 'Travel Insurance',
      icon: <Plane className="w-5 h-5 text-blue-650 dark:text-blue-400" />,
      posClass: 'bottom-[25%] -right-8 sm:-right-12 lg:-right-16',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/20 via-white to-white dark:from-slate-900/5 dark:via-slate-950 dark:to-slate-950 py-16 lg:py-24 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                href="tel:7373723019"
                className="flex items-center justify-center px-6 py-3.5 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-blue-650 dark:text-blue-400 text-sm font-bold rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Phone className="w-4.5 h-4.5 mr-2" />
                {callBtnText}
              </a>
            </AnimatedReveal>
          </div>

          {/* Right Column: Family Portrait + Floating Badges */}
          <div className="lg:col-span-6 flex justify-center py-6">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px]">
              
              {/* Shield Graphic Background Blur */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-blue-100 dark:from-emerald-950/20 dark:to-blue-950/20 rounded-full blur-3xl -z-10 opacity-70" />
              
              {/* Family Image Frame */}
              <AnimatedReveal direction="none" delay={0.2} className="relative z-10 flex justify-center">
                <Image
                  src="/about-family.png"
                  alt="Happy Insured Family"
                  width={400}
                  height={400}
                  priority
                  className="w-full h-auto object-contain select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)]"
                />
              </AnimatedReveal>

              {/* Floating Badges */}
              {badges.map((badge, idx) => (
                <AnimatedReveal
                  key={idx}
                  direction="none"
                  delay={0.3 + 0.1 * idx}
                  className={`absolute ${badge.posClass} z-20 hidden xs:flex items-center space-x-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2.5 px-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] select-none hover:scale-105 transition-transform duration-300`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 shadow-inner shrink-0">
                    {badge.icon}
                  </div>
                  <div className="leading-tight pr-1.5">
                    <p className="text-[10px] font-extrabold text-slate-800 dark:text-white whitespace-nowrap">
                      {badge.label}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mt-0.5">
                      {badge.sub}
                    </p>
                  </div>
                </AnimatedReveal>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
