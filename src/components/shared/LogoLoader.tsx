'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoLoaderProps {
  lang?: string;
  fullscreen?: boolean;
}

export default function LogoLoader({ lang = 'en', fullscreen = false }: LogoLoaderProps) {
  const isTa = lang === 'ta';
  const loadingText = isTa ? 'ஏற்றப்படுகிறது...' : 'Loading...';
  const weAreHereText = isTa ? 'நாங்கள் உங்களுடன் இருக்கிறோம்' : "We're here for you";

  const loaderBody = (
    <div className="flex flex-col items-center justify-center p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-3xl shadow-soft max-w-sm w-full mx-auto text-center space-y-6">
      
      {/* Animated Logo Container */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer animated spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="absolute w-24 h-24 rounded-full border-[3.5px] border-t-primary-blue border-r-primary-green border-b-transparent border-l-transparent shadow-xs"
        />
        
        {/* Inner pulsing circle backing the logo */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute w-20 h-20 rounded-full bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-xs"
        />
        
        {/* Central Logo */}
        <div className="relative z-10 w-12 h-12 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Friends Insurance Point Logo"
            width={40}
            height={40}
            priority
            className="object-contain select-none"
          />
        </div>
      </div>

      {/* Loading Labels */}
      <div className="space-y-1.5">
        <h4 className="text-sm font-extrabold tracking-wide text-slate-850 dark:text-white uppercase">
          {loadingText}
        </h4>
        <p className="text-xs font-bold text-primary-blue dark:text-primary-blue-light animate-pulse">
          {weAreHereText}
        </p>
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-xs transition-colors duration-300">
        {loaderBody}
      </div>
    );
  }

  return <div className="py-12 flex items-center justify-center">{loaderBody}</div>;
}
