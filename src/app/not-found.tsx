import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { ShieldAlert, Home, HelpCircle, Phone } from 'lucide-react';
import { getTranslation } from '@/locales/translate';

export default async function NotFound() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = getTranslation(lang);

  return (
    <div className="py-24 sm:py-32 max-w-xl mx-auto px-4 text-center space-y-8 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Brand box */}
      <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary-blue-light dark:bg-primary-blue/20 text-primary-blue dark:text-primary-blue-light shadow-xs">
        <ShieldAlert className="w-9 h-9" />
      </div>

      {/* Message */}
      <div className="space-y-3">
        <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight">404</h1>
        <h2 className="text-2xl font-extrabold text-slate-850 dark:text-slate-200">
          {t.notFound.title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-semibold">
          {t.notFound.desc}
        </p>
      </div>

      {/* Helpful Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
        <Link
          href="/"
          className="flex items-center justify-center p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-primary-blue border border-slate-200 dark:border-slate-800 text-sm font-bold rounded-2xl shadow-xs transition-all"
        >
          <Home className="w-4.5 h-4.5 mr-2 text-primary-blue" />
          {t.common.backToHome}
        </Link>
        <Link
          href="/faq"
          className="flex items-center justify-center p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-primary-blue border border-slate-200 dark:border-slate-800 text-sm font-bold rounded-2xl shadow-xs transition-all"
        >
          <HelpCircle className="w-4.5 h-4.5 mr-2 text-primary-green" />
          {lang === 'en' ? 'FAQ Help Desk' : 'அடிக்கடி கேட்கப்படும் கேள்விகள்'}
        </Link>
      </div>

      <div className="pt-4 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center space-x-2">
        <span>{t.notFound.helpText}</span>
        <a href="tel:7598657990" className="text-primary-blue dark:text-primary-blue-light hover:text-primary-blue-hover flex items-center">
          <Phone className="w-3.5 h-3.5 mr-1" />
          7598657990
        </a>
      </div>
    </div>
  );
}
