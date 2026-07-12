'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, Users, Car, Shield, Phone, Calculator,
  MessageCircle, Percent, Lock 
} from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface ServiceCoverageAndHelpProps {
  lang?: string;
}

export default function ServiceCoverageAndHelp({ lang = 'en' }: ServiceCoverageAndHelpProps) {
  const isTa = lang === 'ta';

  // Badges for left card
  const coverageBanners = [
    {
      title: isTa ? 'உங்கள் ஆரோக்கியம்' : 'Your Health',
      icon: <Heart className="w-5 h-5 text-white" />
    },
    {
      title: isTa ? 'உங்கள் குடும்பம்' : 'Your Family',
      icon: <Users className="w-5 h-5 text-white" />
    },
    {
      title: isTa ? 'உங்கள் வாகனம்' : 'Your Vehicle',
      icon: <Car className="w-5 h-5 text-white" />
    },
    {
      title: isTa ? 'உங்கள் எதிர்காலம்' : 'Your Future',
      icon: <Shield className="w-5 h-5 text-white" />
    }
  ];

  // Badges for right card
  const helpBadges = [
    {
      title: isTa ? 'இலவச ஆலோசனை' : 'Free Consultation',
      icon: <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: isTa ? 'மறைமுகக் கட்டணங்கள் இல்லை' : 'No Hidden Charges',
      icon: <Percent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: isTa ? '100% ரகசியம்' : '100% Confidential',
      icon: <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Card: We Cover What Matters Most */}
        <AnimatedReveal direction="left" className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4 mb-8 text-left">
            <h3 className="text-2xl font-extrabold text-slate-850 dark:text-white tracking-tight">
              {isTa ? 'மிகவும் முக்கியமானவற்றை நாங்கள் உள்ளடக்குகிறோம்' : 'We Cover What Matters Most'}
            </h3>
            <div className="w-12 h-1 bg-primary-green rounded-full mt-2" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 flex-grow">
            {/* Left Graphic: Family sofa photo + Roof overlay */}
            <div className="relative w-full max-w-[240px] aspect-[4/3] rounded-2xl overflow-hidden shadow-md shrink-0">
              
              {/* Custom floating roof outline */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-[82%] drop-shadow-md">
                <svg viewBox="0 0 100 32" fill="none" className="text-amber-800 dark:text-amber-500 w-full h-auto">
                  <path d="M5 27 L50 5 L95 27" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Family Image */}
              <Image 
                src="/family_sofa.png" 
                alt="Happy Insured Family" 
                fill 
                className="object-cover object-center select-none" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent z-10" />
            </div>

            {/* Right Banners */}
            <div className="flex-1 space-y-3.5 w-full">
              {coverageBanners.map((banner, idx) => (
                <div 
                  key={idx}
                  className="flex items-center space-x-3.5 bg-primary-blue text-white px-5 py-3.5 rounded-2xl border border-white/5 shadow-xs w-full font-bold text-xs uppercase tracking-wider justify-center sm:justify-start hover:bg-[#00388d] transition-colors duration-200"
                >
                  <div className="flex-shrink-0">
                    {banner.icon}
                  </div>
                  <span>{banner.title}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedReveal>

        {/* Right Card: Need Help Choosing The Right Plan? */}
        <AnimatedReveal direction="right" className="bg-emerald-50/10 dark:bg-emerald-950/5 border border-emerald-100/50 dark:border-emerald-900/20 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center flex-grow">
            
            {/* Left Content Column */}
            <div className="sm:col-span-8 space-y-6 text-left z-10">
              <div className="space-y-3">
                <h3 className="text-2xl font-extrabold text-primary-green dark:text-emerald-400 tracking-tight leading-tight">
                  {isTa ? 'சரியான திட்டத்தைத் தேர்ந்தெடுக்க உதவி தேவையா?' : 'Need Help Choosing The Right Plan?'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold leading-normal">
                  {isTa 
                    ? 'எங்கள் காப்பீட்டு நிபுணர்களுடன் பேசி, உங்கள் தேவைகளுக்கான சிறந்த திட்டத்தைப் பெறுங்கள்.'
                    : 'Talk to our insurance experts and get the best plan for your needs.'}
                </p>
              </div>

              {/* Three horizontal badges */}
              <div className="grid grid-cols-3 gap-3">
                {helpBadges.map((badge, idx) => (
                  <div 
                    key={idx}
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center space-y-1.5 shadow-xs"
                  >
                    <div className="p-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                      {badge.icon}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black text-slate-700 dark:text-slate-200 mt-1 block leading-tight whitespace-normal max-w-[85px]">
                      {badge.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Buttons */}
              <div className="flex flex-col xs:flex-row items-center gap-3.5 pt-2">
                <Link
                  href="/quote"
                  className="flex items-center justify-center w-full xs:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Calculator className="w-4 h-4 mr-1.5 stroke-[2.5]" />
                  {isTa ? 'இலவசக் கட்டணக் கோரிக்கை' : 'Get Free Quote'}
                </Link>
                <a
                  href="tel:7598657990"
                  className="flex items-center justify-center w-full xs:w-auto px-5 py-3 bg-white dark:bg-slate-900 dark:hover:bg-slate-800 text-primary-blue dark:text-primary-blue-light text-xs font-bold rounded-xl shadow-xs border border-slate-200 dark:border-slate-800 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 mr-1.5" />
                  {isTa ? 'நிபுணரிடம் பேசுங்கள்' : 'Talk To Expert'}
                </a>
              </div>
            </div>

            {/* Right Consultant Photo Column */}
            <div className="hidden sm:flex sm:col-span-4 justify-center items-end self-end h-full">
              <div className="relative w-full max-w-[160px] aspect-[3/4] overflow-hidden -mb-10 pointer-events-none">
                <Image 
                  src="/insurance_expert.png" 
                  alt="Insurance Expert" 
                  width={200}
                  height={260}
                  className="object-contain object-bottom select-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]" 
                />
              </div>
            </div>

          </div>
        </AnimatedReveal>

      </div>
    </section>
  );
}
