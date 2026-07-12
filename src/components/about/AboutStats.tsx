'use client';

import React from 'react';
import { Users, Handshake, Clock, FileText, RefreshCw, Award } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface AboutStatsProps {
  lang?: string;
}

export default function AboutStats({ lang = 'en' }: AboutStatsProps) {
  const isTa = lang === 'ta';

  const stats = [
    {
      valueOnly: '1000+',
      valueSuffix: '',
      label: isTa ? 'மகிழ்ச்சியான வாடிக்கையாளர்கள்' : 'Happy Customers',
      icon: <Users className="w-5.5 h-5.5 text-white" />,
    },
    {
      valueOnly: '10+',
      valueSuffix: '',
      label: isTa ? 'காப்பீட்டு கூட்டாளர்கள்' : 'Insurance Partners',
      icon: <Handshake className="w-5.5 h-5.5 text-white" />,
    },
    {
      valueOnly: '10',
      valueSuffix: isTa ? 'நிமிடங்கள்' : 'Minutes',
      label: isTa ? 'பாலிசி வழங்கல்' : 'Policy Issuance',
      icon: <Clock className="w-5.5 h-5.5 text-white" />,
    },
    {
      valueOnly: '5000+',
      valueSuffix: '',
      label: isTa ? 'வழங்கப்பட்ட பாலிசிகள்' : 'Policies Issued',
      icon: <FileText className="w-5.5 h-5.5 text-white" />,
    },
    {
      valueOnly: '98%',
      valueSuffix: '',
      label: isTa ? 'புதுப்பித்தல் விகிதம்' : 'Renewal Rate',
      icon: <RefreshCw className="w-5.5 h-5.5 text-white" />,
    },
    {
      valueOnly: '100%',
      valueSuffix: '',
      label: isTa ? 'வாடிக்கையாளர் திருப்தி' : 'Customer Satisfaction',
      icon: <Award className="w-5.5 h-5.5 text-white" />,
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-blue text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6 lg:gap-y-0 lg:gap-x-0 items-center">
            {stats.map((stat, idx) => (
              <AnimatedReveal
                key={idx}
                direction="up"
                delay={0.05 * idx}
                className="flex items-center justify-center lg:justify-start px-4 lg:px-6 lg:border-r lg:border-white/20 last:lg:border-r-0 w-full group"
              >
                <div className="flex items-center space-x-3.5 w-full justify-center lg:justify-start">
                  {/* Icon Wrapper */}
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:scale-105 group-hover:bg-white/15 transition-all duration-300">
                    {stat.icon}
                  </div>
                  
                  {/* Text Container */}
                  <div className="text-left">
                    <div className="flex items-baseline space-x-1 leading-none">
                      <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
                        {stat.valueOnly}
                      </span>
                      {stat.valueSuffix && (
                        <span className="text-xs sm:text-sm font-extrabold text-white/90">
                          {stat.valueSuffix}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 mt-1 block leading-tight whitespace-normal max-w-[120px]">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
