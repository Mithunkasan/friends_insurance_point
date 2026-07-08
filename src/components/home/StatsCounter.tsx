'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Smile, Zap, Building2, Headset } from 'lucide-react';
import { getTranslation } from '@/locales/translate';

interface CounterItemProps {
  endValue: number;
  suffix?: string;
  duration?: number;
  label: string;
  icon: React.ReactNode;
}

function CounterItem({ endValue, suffix = '', duration = 1500, label, icon }: CounterItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = endValue;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, endValue, duration]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center p-6 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-soft border border-slate-100/50 dark:border-slate-800/40 hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-blue-light dark:bg-primary-blue/20 text-primary-blue dark:text-primary-blue-light mb-4 font-bold">
        {icon}
      </div>
      <span className="text-3xl sm:text-4xl font-extrabold text-slate-850 dark:text-white tracking-tight mb-2">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm font-bold text-slate-450 dark:text-slate-400">{label}</span>
    </div>
  );
}

interface StatsCounterProps {
  lang?: string;
}

export default function StatsCounter({ lang = 'en' }: StatsCounterProps) {
  const t = getTranslation(lang);

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <CounterItem
            endValue={1000}
            suffix="+"
            label={t.stats.happyCustomers}
            icon={<Smile className="w-6 h-6 text-primary-blue" />}
          />
          <CounterItem
            endValue={10}
            suffix={lang === 'en' ? ' Mins' : ' நிமிடங்கள்'}
            label={t.stats.policyIssuance}
            icon={<Zap className="w-6 h-6 text-primary-green" />}
          />
          <CounterItem
            endValue={15}
            suffix="+"
            label={t.stats.partners}
            icon={<Building2 className="w-6 h-6 text-primary-blue" />}
          />
          <CounterItem
            endValue={100}
            suffix="%"
            label={t.stats.support}
            icon={<Headset className="w-6 h-6 text-primary-green" />}
          />
        </div>
      </div>
    </section>
  );
}
