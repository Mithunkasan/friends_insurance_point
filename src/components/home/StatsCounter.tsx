'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Users, Clock, Handshake, Award } from 'lucide-react';
import { getTranslation } from '@/locales/translate';

interface CounterItemProps {
  endValue: number;
  suffix?: string;
  duration?: number;
  label: string;
  icon: React.ComponentType<any>;
}

function CounterItem({ endValue, suffix = '', duration = 1500, label, icon: IconComponent }: CounterItemProps) {
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
      className="flex items-center space-x-4 justify-start lg:justify-center px-6 py-4 lg:py-2"
    >
      {/* Circle Icon Badge */}
      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 shadow-xs border border-white/5">
        <IconComponent className="w-7 h-7" />
      </div>
      
      {/* Text Number & Label */}
      <div className="flex flex-col text-left">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
          {count.toLocaleString()}{suffix}
        </span>
        <span className="text-xs font-semibold text-blue-100/90 leading-tight whitespace-pre-line">
          {label}
        </span>
      </div>
    </div>
  );
}

interface StatsCounterProps {
  lang?: string;
}

export default function StatsCounter({ lang = 'en' }: StatsCounterProps) {
  const t = getTranslation(lang);

  return (
    <section className="py-8 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-blue dark:bg-slate-900 rounded-2xl p-6 lg:p-8 shadow-xl text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/15">
            <CounterItem
              endValue={1000}
              suffix="+"
              label={t.stats.happyCustomers}
              icon={Users}
            />
            <CounterItem
              endValue={10}
              suffix=""
              label={t.stats.policyIssuance}
              icon={Clock}
            />
            <CounterItem
              endValue={10}
              suffix="+"
              label={t.stats.partners}
              icon={Handshake}
            />
            <CounterItem
              endValue={100}
              suffix="%"
              label={t.stats.support}
              icon={Award}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
