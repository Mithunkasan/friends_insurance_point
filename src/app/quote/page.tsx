import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import QuoteForm from '@/components/shared/QuoteForm';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';
import LogoLoader from '@/components/shared/LogoLoader';

export const metadata: Metadata = {
  title: 'Request a Quote | Friends Insurance Point',
  description:
    'Request a fast, customized vehicle or health insurance premium comparison. Input your vehicle brand, model, and previous expiry and receive quotes in 10 minutes.',
};

export default async function QuotePage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = getTranslation(lang);

  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 animate-fade-in">
      <AnimatedReveal className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">{t.quoteForm.tag}</h1>
        <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.quoteForm.title}
        </p>
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
          {t.quoteForm.description}
        </p>
      </AnimatedReveal>

      {/* Main Quote Container Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Guarantees */}
        <div className="lg:col-span-4 space-y-6 bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800/60 shadow-xs">
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-primary-green uppercase tracking-wider bg-primary-green-light dark:bg-primary-green/20 px-2 py-0.5 rounded-full">
              {lang === 'en' ? 'Verified Partner' : 'அங்கீகரிக்கப்பட்ட நிறுவனம்'}
            </span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t.quoteForm.comparisonBadge}</h3>
            <p className="text-[11px] text-slate-400 font-bold">{t.quoteForm.badgeSub}</p>
          </div>

          <ul className="space-y-3.5 text-xs text-slate-650 dark:text-slate-350 font-bold">
            <li className="flex items-start">
              <span className="text-primary-green mr-2 font-bold">✓</span>
              <span>{lang === 'en' ? 'Lowest premiums scanned from 10+ partners.' : '10+ கூட்டாளிகளிடமிருந்து குறைந்த பிரீமியங்கள் ஒப்பீடு.'}</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-green mr-2 font-bold">✓</span>
              <span>{lang === 'en' ? 'Zero paperwork - everything handled via WhatsApp.' : 'ஆவணப் பணிகள் இல்லை - அனைத்தும் வாட்ஸ்அப் மூலம்.'}</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-green mr-2 font-bold">✓</span>
              <span>{lang === 'en' ? 'Direct claim coordination & garage settlement support.' : 'நேரடி கிளைம் ஒருங்கிணைப்பு & கேரேஜ் செட்டில்மென்ட்.'}</span>
            </li>
          </ul>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-8 sm:p-12 shadow-soft glass-card">
          <Suspense fallback={<LogoLoader lang={lang} />}>
            <QuoteForm lang={lang} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
