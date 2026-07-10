'use client';

import React from 'react';
import { Clock, IndianRupee, HeartHandshake, UserCheck, FileText, Bell, Headphones, Award } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface AboutWhyChooseUsProps {
  lang?: string;
}

export default function AboutWhyChooseUs({ lang = 'en' }: AboutWhyChooseUsProps) {
  const isTa = lang === 'ta';

  const sectionTag = isTa ? 'ஏன் எங்களை தேர்வு செய்ய வேண்டும்' : 'WHY CHOOSE US';

  const gridItems = [
    {
      title: isTa ? '10 நிமிடத்தில் பாலிசி' : 'Policy in 10 Minutes',
      icon: <Clock className="w-6 h-6" />,
      colorClass: 'bg-blue-50 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400',
    },
    {
      title: isTa ? 'குறைந்த பிரீமியம் உறுதி' : 'Lowest Premium Guarantee',
      icon: <IndianRupee className="w-6 h-6" />,
      colorClass: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-650 dark:text-emerald-400',
    },
    {
      title: isTa ? 'பல இன்சூரன்ஸ் கூட்டாளர்கள்' : 'Multiple Insurance Partners',
      icon: <HeartHandshake className="w-6 h-6" />,
      colorClass: 'bg-blue-50 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400',
    },
    {
      title: isTa ? 'நிபுணர் காப்பீட்டு ஆலோசகர்கள்' : 'Expert Insurance Advisors',
      icon: <UserCheck className="w-6 h-6" />,
      colorClass: 'bg-blue-50 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400',
    },
    {
      title: isTa ? 'கிளைம் உதவி' : 'Claim Assistance',
      icon: <FileText className="w-6 h-6" />,
      colorClass: 'bg-blue-50 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400',
    },
    {
      title: isTa ? 'புதுப்பித்தல் நினைவூட்டல்' : 'Renewal Reminder',
      icon: <Bell className="w-6 h-6" />,
      colorClass: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-650 dark:text-emerald-400',
    },
    {
      title: isTa ? 'நட்பான வாடிக்கையாளர் ஆதரவு' : 'Friendly Customer Support',
      icon: <Headphones className="w-6 h-6" />,
      colorClass: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-650 dark:text-emerald-400',
    },
    {
      title: isTa ? '100% வாடிக்கையாளர் திருப்தி' : '100% Customer Satisfaction',
      icon: <Award className="w-6 h-6" />,
      colorClass: 'bg-blue-50 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400',
    },
  ];

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-slate-900/10 border-y border-slate-100 dark:border-slate-900/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <AnimatedReveal className="text-center mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400 block">
            {sectionTag}
          </span>
        </AnimatedReveal>

        {/* 8-Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridItems.map((item, idx) => (
            <AnimatedReveal
              key={idx}
              direction="up"
              delay={0.05 * idx}
              className="flex items-center space-x-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:scale-102 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${item.colorClass}`}>
                {item.icon}
              </div>
              {/* Title */}
              <h4 className="text-sm font-extrabold text-slate-800 dark:text-white leading-snug">
                {item.title}
              </h4>
            </AnimatedReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
