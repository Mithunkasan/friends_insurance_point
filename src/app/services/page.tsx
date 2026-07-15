import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceGrid from '@/components/services/ServiceGrid';
import ServiceHowAndWhy from '@/components/services/ServiceHowAndWhy';
import ServiceCoverageAndHelp from '@/components/services/ServiceCoverageAndHelp';

export const metadata: Metadata = {
  title: 'Our Insurance Services | Friends Insurance Point',
  description:
    'Browse our comprehensive selection of insurance plans in Nagercoil including Car, Bike, Auto, Bus, Heavy Commercial Truck, Life, Health, OPD, Fire, and Group Mediclaim policy comparisons.',
};

export default async function ServicesPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <ServiceHero lang={lang} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        <ServiceGrid lang={lang} />
        <ServiceHowAndWhy lang={lang} />
        <ServiceCoverageAndHelp lang={lang} />
      </div>
    </div>
  );
}
