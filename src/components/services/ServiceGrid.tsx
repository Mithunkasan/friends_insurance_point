'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, Car, Bike, Users, Plane, Home, 
  Briefcase, User, HeartHandshake, GraduationCap, 
  CalendarDays, ShieldAlert 
} from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface ServiceGridProps {
  lang?: string;
}

export default function ServiceGrid({ lang = 'en' }: ServiceGridProps) {
  const isTa = lang === 'ta';

  const tagText = isTa ? 'நாம் வழங்குவது' : 'WHAT WE OFFER';
  const titleText = isTa ? 'எங்கள் காப்பீட்டு சேவைகள்' : 'Our Insurance Services';

  // 12 Services matching reference image
  const services = [
    {
      title: isTa ? 'சுகாதார காப்பீடு' : 'Health Insurance',
      desc: isTa 
        ? 'மருத்துவமனையில் அனுமதிப்பு, மருத்துவச் செலவுகள் மற்றும் பலவற்றிற்கான விரிவான கவரேஜ்.' 
        : 'Extensive coverage for hospitalization, medical expenses and more.',
      slug: 'health-insurance',
      icon: <Heart className="w-6 h-6 text-white" />,
      colorClass: 'bg-blue-600 border-blue-100 dark:border-blue-900/30'
    },
    {
      title: isTa ? 'கார் இன்சூரன்ஸ்' : 'Car Insurance',
      desc: isTa 
        ? 'விபத்துகள் மற்றும் திருட்டுகளுக்கு எதிராக உங்கள் காரை முழுமையாகப் பாதுகாக்கும் கவரேஜ்.' 
        : 'Comprehensive protection for your car against accidents and theft.',
      slug: 'car-insurance',
      icon: <Car className="w-6 h-6 text-white" />,
      colorClass: 'bg-emerald-600 border-emerald-100 dark:border-emerald-900/30'
    },
    {
      title: isTa ? 'இருசக்கர வாகன காப்பீடு' : 'Bike Insurance',
      desc: isTa 
        ? 'சிறந்த பைக் காப்பீட்டுத் திட்டங்களுடன் உங்கள் இருசக்கர வாகனத்தைப் பாதுகாக்கவும்.' 
        : 'Secure your two-wheeler with the best bike insurance plans.',
      slug: 'bike-insurance',
      icon: <Bike className="w-6 h-6 text-white" />,
      colorClass: 'bg-blue-600 border-blue-100 dark:border-blue-900/30'
    },
    {
      title: isTa ? 'ஆயுள் காப்பீடு' : 'Life Insurance',
      desc: isTa 
        ? 'சரியான ஆயுள் காப்பீடு மூலம் உங்கள் குடும்பத்தின் எதிர்காலத்திற்கான நிதிப் பாதுகாப்பு.' 
        : "Financial security for your family's future with the right life insurance.",
      slug: 'life-insurance',
      icon: <Users className="w-6 h-6 text-white" />,
      colorClass: 'bg-emerald-600 border-emerald-100 dark:border-emerald-900/30'
    },
    {
      title: isTa ? 'பயண காப்பீடு' : 'Travel Insurance',
      desc: isTa 
        ? 'எங்கள் பயண காப்பீட்டு திட்டங்களுடன் பாதுகாப்பான மற்றும் தொந்தரவில்லாத பயணம்.' 
        : 'Safe and hassle-free journey with our travel insurance plans.',
      slug: 'travel-insurance',
      icon: <Plane className="w-6 h-6 text-white" />,
      colorClass: 'bg-blue-600 border-blue-100 dark:border-blue-900/30'
    },
    {
      title: isTa ? 'வீட்டு காப்பீடு' : 'Home Insurance',
      desc: isTa 
        ? 'எதிர்பாராத நிகழ்வுகளிலிருந்து உங்கள் கனவு இல்லம் மற்றும் உடைமைகளைப் பாதுகாக்கவும்.' 
        : 'Protect your dream home and belongings from unexpected events.',
      slug: 'fire-insurance', // Using fire-insurance for property/home
      icon: <Home className="w-6 h-6 text-white" />,
      colorClass: 'bg-emerald-600 border-emerald-100 dark:border-emerald-900/30'
    },
    {
      title: isTa ? 'வணிக காப்பீடு' : 'Commercial Insurance',
      desc: isTa 
        ? 'உங்கள் வணிகச் சொத்துக்கள், ஊழியர்கள் மற்றும் செயல்பாட்டு அபாயங்களுக்கான கவரேஜ்.' 
        : 'Coverage for your business assets, employees and operational risks.',
      slug: 'heavy-vehicle-insurance', // Heavy commercial/business fallback
      icon: <Briefcase className="w-6 h-6 text-white" />,
      colorClass: 'bg-emerald-600 border-emerald-100 dark:border-emerald-900/30'
    },
    {
      title: isTa ? 'தனிநபர் விபத்து காப்பீடு' : 'Personal Accident',
      desc: isTa 
        ? 'தற்செயலான காயங்கள் மற்றும் ஊனங்களுக்கு எதிரான நிதிப் பாதுகாப்பு கவரேஜ்.' 
        : 'Financial protection against accidental injuries and disabilities.',
      slug: 'accident-insurance',
      icon: <User className="w-6 h-6 text-white" />,
      colorClass: 'bg-blue-600 border-blue-100 dark:border-blue-900/30'
    },
    {
      title: isTa ? 'தீவிர நோய் காப்பீடு' : 'Critical Illness',
      desc: isTa 
        ? 'தீவிர நோய்களின் போது மீள்வதில் கவனம் செலுத்த தேவையான நிதி உதவி.' 
        : 'Get financial support to focus on recovery during critical illnesses.',
      slug: 'health-insurance',
      icon: <HeartHandshake className="w-6 h-6 text-white" />,
      colorClass: 'bg-emerald-600 border-emerald-100 dark:border-emerald-900/30'
    },
    {
      title: isTa ? 'குழந்தைகள் கல்வித் திட்டம்' : 'Child Education Plan',
      desc: isTa 
        ? 'புத்திசாலித்தனமான சேமிப்பு மற்றும் காப்பீட்டுத் திட்டங்களுடன் உங்கள் குழந்தையின் கல்வியைத் திட்டமிடுங்கள்.' 
        : "Plan your child's education with smart savings and insurance plans.",
      slug: 'life-insurance',
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      colorClass: 'bg-blue-600 border-blue-100 dark:border-blue-900/30'
    },
    {
      title: isTa ? 'ஓய்வூதியத் திட்டம்' : 'Retirement Plan',
      desc: isTa 
        ? 'உங்கள் ஓய்வூதியத்தைப் பாதுகாத்து, ஓய்வுக்குப் பிந்தைய கவலையற்ற வாழ்க்கையை அனுபவிக்கவும்.' 
        : 'Secure your retirement and enjoy a stress-free life after retirement.',
      slug: 'life-insurance',
      icon: <CalendarDays className="w-6 h-6 text-white" />,
      colorClass: 'bg-emerald-600 border-emerald-100 dark:border-emerald-900/30'
    },
    {
      title: isTa ? 'குழு காப்பீடு' : 'Group Insurance',
      desc: isTa 
        ? 'உங்கள் ஊழியர்கள் மற்றும் அவர்களது குடும்பத்தினருக்கான விரிவான சுகாதார பாதுகாப்பு.' 
        : 'Comprehensive coverage for your employees and their families.',
      slug: 'group-mediclaim-insurance',
      icon: <ShieldAlert className="w-6 h-6 text-white" />,
      colorClass: 'bg-blue-600 border-blue-100 dark:border-blue-900/30'
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <span className="text-xs uppercase font-extrabold tracking-widest text-primary-green dark:text-emerald-400 block">
          {tagText}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {titleText}
        </h2>
        <div className="w-12 h-1 bg-primary-green mx-auto rounded-full mt-2" />
      </div>

      {/* Grid: 6 columns on desktop, 3 on tablet, 2 on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {services.map((service, idx) => (
          <AnimatedReveal
            key={idx}
            direction="up"
            delay={0.05 * (idx % 6)}
            className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between items-center text-center hover:shadow-soft hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center">
              {/* Circular Icon Wrapper */}
              <div className={`w-12 h-12 rounded-full ${service.colorClass} flex items-center justify-center border-4 group-hover:scale-105 transition-transform duration-300 shadow-xs mb-4`}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white mb-2 leading-tight group-hover:text-primary-blue dark:group-hover:text-primary-blue-light transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-bold mb-4 line-clamp-3">
                {service.desc}
              </p>
            </div>

            {/* Link */}
            <Link
              href={`/services/${service.slug}`}
              className="text-xs font-extrabold text-primary-green dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-500 flex items-center space-x-1 mt-auto group/link"
            >
              <span>{isTa ? 'மேலும் அறிய' : 'Learn More'}</span>
              <span className="transform group-hover/link:translate-x-0.5 transition-transform">→</span>
            </Link>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
