import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getTranslation } from '@/locales/translate';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutWhyChooseUs from '@/components/about/AboutWhyChooseUs';
import AboutStats from '@/components/about/AboutStats';
import AboutHowWeWork from '@/components/about/AboutHowWeWork';

export const metadata: Metadata = {
  title: 'About Us | Friends Insurance Point',
  description:
    'Learn more about Friends Insurance Point. We are experienced insurance consultants in Vadasery, Nagercoil, providing motor, health, life, and fire insurance comparisons.',
};

export default async function AboutPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = getTranslation(lang);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <AboutHero lang={lang} />
      <AboutStory lang={lang} />
      <AboutWhyChooseUs lang={lang} />
      <AboutStats lang={lang} />
      <AboutHowWeWork lang={lang} />
    </div>
  );
}
