'use client';

import React from 'react';
import { MessageSquare, ClipboardList, Search, ShieldCheck, FileSpreadsheet, CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface AboutHowWeWorkProps {
  lang?: string;
}

export default function AboutHowWeWork({ lang = 'en' }: AboutHowWeWorkProps) {
  const isTa = lang === 'ta';

  const sectionTag = isTa ? 'நாங்கள் எவ்வாறு செயல்படுகிறோம்' : 'HOW WE WORK';

  const steps = [
    {
      title: isTa ? 'வாடிக்கையாளர் விசாரணை' : 'Customer Enquiry',
      icon: <MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      title: isTa ? 'தேவை பகுப்பாய்வு' : 'Requirement Analysis',
      icon: <ClipboardList className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      title: isTa ? 'திட்டங்களை ஒப்பிடுதல்' : 'Compare Plans',
      icon: <Search className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      title: isTa ? 'சிறந்த திட்ட தேர்வு' : 'Choose Best Policy',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      title: isTa ? 'உடனடி ஆவணங்கள்' : 'Instant Documentation',
      icon: <FileSpreadsheet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      title: isTa ? 'பாலிசி வழங்கல்' : 'Policy Issued',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <AnimatedReveal className="text-center mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400 block">
            {sectionTag}
          </span>
        </AnimatedReveal>

        {/* Stepper Steps Flow */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-3">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;

            return (
              <React.Fragment key={idx}>
                {/* Step Item */}
                <AnimatedReveal
                  direction="up"
                  delay={0.08 * idx}
                  className="flex flex-col items-center flex-1 text-center"
                >
                  {/* Circular Badge wrapper */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:scale-105 hover:border-emerald-500/20 transition-all duration-300">
                    {step.icon}
                  </div>
                  {/* Title */}
                  <h4 className="text-sm font-extrabold text-slate-800 dark:text-white mt-4 max-w-[140px] leading-tight">
                    {step.title}
                  </h4>
                </AnimatedReveal>

                {/* Arrow Connector */}
                {!isLast && (
                  <div className="flex items-center justify-center text-emerald-500 py-2 lg:py-6 shrink-0 select-none">
                    {/* Down arrow on mobile, Right arrow on desktop */}
                    <ChevronDown className="w-5 h-5 block lg:hidden stroke-[3]" />
                    <ChevronRight className="w-5 h-5 hidden lg:block stroke-[3]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
