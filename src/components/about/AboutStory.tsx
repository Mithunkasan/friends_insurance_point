'use client';

import React from 'react';
import Image from 'next/image';
import { Target, Eye } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface AboutStoryProps {
  lang?: string;
}

export default function AboutStory({ lang = 'en' }: AboutStoryProps) {
  const isTa = lang === 'ta';

  const storyTag = isTa ? 'எங்கள் கதை' : 'OUR STORY';
  const storyTitle = isTa ? 'எங்கள் கதை' : 'Our Story';
  const p1 = isTa
    ? 'நபர்கள் மற்றும் நிறுவனங்கள் தங்களின் காப்பீட்டுத் திட்டங்களை நம்பிக்கையுடன் தேர்ந்தெடுக்க உதவுவதற்கு பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்ட் கடமைப்பட்டுள்ளது.'
    : 'Friends Insurance Point is committed to helping individuals and businesses choose the right insurance plans with confidence.';
  const p2 = isTa
    ? 'நாங்கள் இந்தியாவின் முன்னணி காப்பீட்டு நிறுவனங்களுடன் இணைந்து மலிவு விலை பிரீமியம், நிபுணர் வழிகாட்டுதல் மற்றும் விரைவான பாலிசி வழங்கலை வழங்குகிறோம்.'
    : "We work with India's leading insurance companies to provide affordable premiums, expert guidance, and fast policy issuance.";
  const p3 = isTa
    ? 'எங்களது நோக்கம் ஒவ்வொரு வாடிக்கையாளருக்கும் காப்பீட்டை எளிமையாகவும், வெளிப்படையாகவும், தொந்தரவில்லாததாகவும் மாற்றுவதாகும்.'
    : 'Our goal is to make insurance simple, transparent, and hassle-free for every customer.';
  const signature = isTa ? '— பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்ட் குழு' : '— Friends Insurance Point Team';

  const missionTitle = isTa ? 'எங்கள் பணி' : 'OUR MISSION';
  const missionDesc = isTa
    ? 'முழுமையான வெளிப்படைத்தன்மை, விரைவான சேவை மற்றும் மலிவு விலையில் நம்பகமான காப்பீட்டு தீர்வுகளை வழங்குதல்.'
    : 'Provide reliable insurance solutions with complete transparency, quick service, and affordable pricing.';

  const visionTitle = isTa ? 'எங்கள் பார்வை' : 'OUR VISION';
  const visionDesc = isTa
    ? 'விதிவிலக்கான வாடிக்கையாளர் திருப்தி மற்றும் நீண்ட கால நிதிப் பாதுகாப்பை வழங்குவதன் மூலம் மிகவும் நம்பகமான காப்பீட்டு ஆலோசனையாக மாறுதல்.'
    : 'Become the most trusted insurance consultancy by delivering exceptional customer satisfaction and long-term financial protection.';

  return (
    <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Advisor illustration */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <AnimatedReveal direction="left" delay={0.15}>
              <Image
                src="/about-story.png"
                alt="Insurance Advisor Meeting Family"
                width={500}
                height={380}
                className="w-full h-auto max-w-[460px] object-contain select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.03)]"
              />
            </AnimatedReveal>
          </div>

          {/* Right Column: Narrative text */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <AnimatedReveal className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400 block">
                {storyTag}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {storyTitle}
              </h2>
            </AnimatedReveal>

            <AnimatedReveal delay={0.2} className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed space-y-4 font-bold">
              <p>{p1}</p>
              <p>{p2}</p>
              <p>{p3}</p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.3}>
              <p className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm sm:text-base">
                {signature}
              </p>
            </AnimatedReveal>
          </div>
        </div>

        {/* Mission and Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {/* Mission Card */}
          <AnimatedReveal
            direction="up"
            delay={0.1}
            className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5 p-6 sm:p-8 bg-emerald-50/10 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.015)]"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-650 dark:text-emerald-400 shrink-0 shadow-inner">
              <Target className="w-7 h-7 stroke-[2]" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-extrabold text-emerald-700 dark:text-emerald-500 tracking-wider">
                {missionTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                {missionDesc}
              </p>
            </div>
          </AnimatedReveal>

          {/* Vision Card */}
          <AnimatedReveal
            direction="up"
            delay={0.2}
            className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5 p-6 sm:p-8 bg-blue-50/10 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.015)]"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400 shrink-0 shadow-inner">
              <Eye className="w-7 h-7 stroke-[2]" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-extrabold text-blue-700 dark:text-blue-400 tracking-wider">
                {visionTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                {visionDesc}
              </p>
            </div>
          </AnimatedReveal>
        </div>

      </div>
    </section>
  );
}
