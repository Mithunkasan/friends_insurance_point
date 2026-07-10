'use client';

import React from 'react';
import { Users, Handshake, Clock, FileText, RefreshCw, ShieldCheck } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface AboutStatsProps {
  lang?: string;
}

export default function AboutStats({ lang = 'en' }: AboutStatsProps) {
  const isTa = lang === 'ta';

  const stats = [
    {
      value: '1000+',
      label: isTa ? 'மகிழ்ச்சியான வாடிக்கையாளர்கள்' : 'Happy Customers',
      icon: <Users className="w-8 h-8 text-white/90" />,
    },
    {
      value: '10+',
      label: isTa ? 'காப்பீட்டு கூட்டாளர்கள்' : 'Insurance Partners',
      icon: <Handshake className="w-8 h-8 text-white/90" />,
    },
    {
      value: isTa ? '10 நிமிடங்கள்' : '10 Minutes',
      label: isTa ? 'பாலிசி வழங்கல்' : 'Policy Issuance',
      icon: <Clock className="w-8 h-8 text-white/90" />,
    },
    {
      value: '5000+',
      label: isTa ? 'வழங்கப்பட்ட பாலிசிகள்' : 'Policies Issued',
      icon: <FileText className="w-8 h-8 text-white/90" />,
    },
    {
      value: '98%',
      label: isTa ? 'புதுப்பித்தல் விகிதம்' : 'Renewal Rate',
      icon: <RefreshCw className="w-8 h-8 text-white/90" />,
    },
    {
      value: '100%',
      label: isTa ? 'வாடிக்கையாளர் திருப்தி' : 'Customer Satisfaction',
      icon: <ShieldCheck className="w-8 h-8 text-white/90" />,
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6 text-center">
          {stats.map((stat, idx) => (
            <AnimatedReveal
              key={idx}
              direction="up"
              delay={0.05 * idx}
              className="flex flex-col items-center space-y-2 group"
            >
              {/* Icon */}
              <div className="mb-2 p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                {stat.icon}
              </div>
              {/* Stat Value */}
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {stat.value}
              </span>
              {/* Stat Label */}
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-extrabold text-slate-350 leading-tight">
                {stat.label}
              </span>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
