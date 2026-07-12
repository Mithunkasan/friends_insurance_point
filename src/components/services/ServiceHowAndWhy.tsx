'use client';

import React from 'react';
import { 
  MessageSquare, ClipboardList, ShieldCheck, 
  FileText, Check, CheckCircle2 
} from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface ServiceHowAndWhyProps {
  lang?: string;
}

export default function ServiceHowAndWhy({ lang = 'en' }: ServiceHowAndWhyProps) {
  const isTa = lang === 'ta';

  // How it works steps
  const steps = [
    {
      num: '01',
      title: isTa ? 'தேவைகளைப் பகிர்தல்' : 'Share Your Requirements',
      icon: <MessageSquare className="w-5 h-5 text-primary-blue" />
    },
    {
      num: '02',
      title: isTa ? 'ஆய்வு & திட்டங்கள்' : 'We Analyze & Suggest Plans',
      icon: <ClipboardList className="w-5 h-5 text-primary-blue" />
    },
    {
      num: '03',
      title: isTa ? 'காப்பீட்டைத் தேர்ந்தெடுத்தல்' : 'Choose The Best Insurance',
      icon: <ShieldCheck className="w-5 h-5 text-primary-blue" />
    },
    {
      num: '04',
      title: isTa ? 'ஆவணங்களை முடித்தல்' : 'Complete Documentation Hassle-Free',
      icon: <FileText className="w-5 h-5 text-primary-blue" />
    },
    {
      num: '05',
      title: isTa ? 'உடனடி பாலிசி வழங்கல்' : 'Policy Issued Instantly',
      icon: <Check className="w-5 h-5 text-white stroke-[3]" />,
      isFinal: true
    }
  ];

  // Why choose us points
  const whyPoints = [
    isTa ? 'தனிப்பயனாக்கப்பட்ட காப்பீட்டுத் தீர்வுகள்' : 'Customized insurance solutions',
    isTa ? 'நிபுணர் வழிகாட்டுதல் மற்றும் ஆதரவு' : 'Expert guidance and support',
    isTa ? 'விரைவான பாலிசி வழங்கல்' : 'Quick policy issuance',
    isTa ? 'ஒவ்வொரு கட்டத்திலும் கிளைம் உதவி' : 'Claim assistance at every step',
    isTa ? 'போட்டித்தன்மை வாய்ந்த பிரீமியம் திட்டங்கள்' : 'Competitive premium plans'
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Column: How It Works */}
        <AnimatedReveal direction="left" className="bg-primary-blue text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between">
          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 -z-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 -z-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl" />

          <div className="space-y-4 mb-8">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary-green dark:text-emerald-400 block">
              {isTa ? 'செயல்முறை' : 'HOW IT WORKS'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isTa ? 'எங்களுடன் காப்பீடு பெற எளிய படிகள்' : 'Simple Steps To Get Insured With Us'}
            </h3>
          </div>

          {/* Steps Horizontal Flow: flex scrollable on small, horizontal grid on large */}
          <div className="flex items-start lg:justify-between gap-6 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center min-w-[120px] lg:min-w-0 lg:flex-1 relative">
                
                {/* Horizontal dotted connector lines */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex items-center absolute top-5 left-[60%] w-[90%] z-0">
                    <div className="h-[1px] w-full border-t-2 border-dashed border-white/20" />
                    <span className="text-white/30 ml-0.5 text-[10px] font-bold">→</span>
                  </div>
                )}

                {/* Circle Icon */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md relative z-10 ${step.isFinal ? 'bg-emerald-600' : 'bg-white'}`}>
                  {step.icon}
                </div>

                {/* Step details */}
                <span className="text-[10px] sm:text-xs font-black text-slate-300 dark:text-slate-400 mt-4 uppercase tracking-widest">
                  {step.num}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-white/90 leading-tight mt-1 max-w-[110px] whitespace-normal">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </AnimatedReveal>

        {/* Right Column: Why Our Services Make A Difference */}
        <AnimatedReveal direction="right" className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8">
          
          {/* Text & List */}
          <div className="flex-1 space-y-6 text-left w-full">
            <h3 className="text-2xl font-extrabold text-slate-850 dark:text-white leading-tight">
              {isTa ? 'எங்கள் சேவைகள் ஏன் மாற்றத்தை ஏற்படுத்துகின்றன?' : 'Why Our Services Make A Difference'}
            </h3>
            
            <ul className="space-y-4">
              {whyPoints.map((point, index) => (
                <li key={index} className="flex items-center space-x-3 text-slate-700 dark:text-slate-200">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-950/30">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="text-xs sm:text-sm font-bold leading-normal">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Checklist Graphic/SVG */}
          <div className="relative w-36 h-44 flex items-center justify-center shrink-0">
            {/* Clipboard Sheet */}
            <div className="w-28 h-36 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-3 relative flex flex-col justify-between">
              
              {/* Clipboard Clip */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-slate-200 dark:bg-slate-800 rounded-md border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                <div className="w-4 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full" />
              </div>

              {/* Title inside document */}
              <div className="text-[8px] font-black text-center tracking-widest text-primary-blue dark:text-primary-blue-light uppercase border-b border-slate-100 dark:border-slate-900 pb-1.5 pt-2">
                INSURANCE
              </div>

              {/* Checklist lines */}
              <div className="space-y-2 py-2 flex-grow">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded flex items-center justify-center text-[6px] text-emerald-600">
                      ✓
                    </span>
                    <div className={`h-1 bg-slate-100 dark:bg-slate-900 rounded-full ${item % 2 === 0 ? 'w-10' : 'w-14'}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Overlapping Shield Check at bottom right */}
            <div className="absolute -bottom-1 -right-1 filter drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]">
              <svg viewBox="0 0 24 24" className="w-12 h-14 text-emerald-600 fill-emerald-500" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#10b981" stroke="#059669" />
                <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>

        </AnimatedReveal>

      </div>
    </section>
  );
}
