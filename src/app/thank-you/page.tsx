import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { CheckCircle2, Phone, Home, MessageSquare } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

export const metadata: Metadata = {
  title: 'Thank You | Friends Insurance Point',
  description: 'Thank you for contacting Friends Insurance Point. We have received your details and will get back to you shortly.',
};

export default async function ThankYouPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = getTranslation(lang);

  return (
    <div className="py-20 sm:py-32 max-w-xl mx-auto px-4 text-center bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <AnimatedReveal direction="up" className="space-y-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-8 sm:p-12 shadow-soft glass-card">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary-green-light dark:bg-primary-green/20 text-primary-green">
          <CheckCircle2 className="w-10 h-10 text-primary-green" />
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.thankYou.title}
          </h1>
          <p className="text-base font-bold text-slate-700 dark:text-slate-300">
            {t.thankYou.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
            {t.thankYou.desc}
          </p>
        </div>

        {/* Contact/Action Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60 text-xs sm:text-sm font-semibold space-y-2 text-slate-650 dark:text-slate-350">
          <p>{t.thankYou.urgentTitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-3">
            <a
              href="tel:7373723019"
              className="flex items-center text-primary-blue dark:text-primary-blue-light hover:text-primary-blue-hover"
            >
              <Phone className="w-4 h-4 mr-1.5 text-primary-green" />
              Call 7373723019
            </a>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-800">|</span>
            <a
              href="https://wa.me/917373723019"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <MessageSquare className="w-4 h-4 mr-1.5" />
              {t.thankYou.whatsappLink}
            </a>
          </div>
        </div>

        {/* Home Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-blue hover:bg-primary-blue-hover text-white text-sm font-bold rounded-xl shadow-md transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            {t.common.backToHome}
          </Link>
        </div>
      </AnimatedReveal>
    </div>
  );
}
