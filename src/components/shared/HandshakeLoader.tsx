'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getTranslation } from '@/locales/translate';

interface HandshakeLoaderProps {
  lang?: string;
  fullscreen?: boolean;
}

export default function HandshakeLoader({ lang = 'en', fullscreen = false }: HandshakeLoaderProps) {
  const t = getTranslation(lang);

  // Translation values helper
  const weAreHereText = lang === 'ta' ? 'நாங்கள் உங்களுடன் இருக்கிறோம்' : "We're here for you";

  // Keyframes for reaching and shaking
  const duration = 2.8;

  const leftArmVariants = {
    initial: { x: -60, y: 0, opacity: 0 },
    animate: {
      x: [-60, 0, 0, 0, 0, 0, -60],
      y: [0, 0, -4, 4, -4, 4, 0, 0, 0],
      opacity: [0, 1, 1, 1, 1, 1, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.25, 0.4, 0.5, 0.6, 0.7, 0.85, 1],
      },
    },
  };

  const rightArmVariants = {
    initial: { x: 60, y: 0, opacity: 0 },
    animate: {
      x: [60, 0, 0, 0, 0, 0, 60],
      y: [0, 0, -4, 4, -4, 4, 0, 0, 0],
      opacity: [0, 1, 1, 1, 1, 1, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        times: [0, 0.25, 0.4, 0.5, 0.6, 0.7, 0.85, 1],
      },
    },
  };

  const ringVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: [0.8, 1, 1.15, 1, 0.8],
      opacity: [0, 0.2, 0.4, 0.1, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeOut' as const,
        times: [0, 0.25, 0.5, 0.7, 1],
      },
    },
  };

  const loaderBody = (
    <div className="flex flex-col items-center justify-center p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-3xl shadow-soft max-w-sm w-full mx-auto text-center space-y-6">
      {/* SVG Animation Box */}
      <div className="relative w-48 h-24 flex items-center justify-center overflow-hidden">
        {/* Subtle pulsing background ring */}
        <motion.div
          variants={ringVariants}
          initial="initial"
          animate="animate"
          className="absolute w-20 h-20 rounded-full bg-primary-blue-light/30 dark:bg-primary-blue/10 border border-primary-blue/10"
        />

        <svg width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left Arm & Hand (Blue) */}
          <motion.g variants={leftArmVariants} initial="initial" animate="animate">
            {/* Sleeve */}
            <path d="M10 32 C10 29.5 12 27.5 14.5 27.5 H28 V62.5 H14.5 C12 62.5 10 60.5 10 58 Z" fill="#004199" />
            {/* Wrist / Arm */}
            <path d="M28 36 H65 C69.5 36 73 39.5 73 44 C73 48.5 69.5 52 65 52 H28" fill="#e3f2fd" stroke="#004199" strokeWidth="4.5" strokeLinecap="round" />
            {/* Thumb */}
            <path d="M62 36 C66 28 72 28 74 33 C76 38 70 42 62 42" stroke="#004199" strokeWidth="4.5" strokeLinecap="round" fill="#e3f2fd" />
            {/* Fingers wrap */}
            <path d="M72 43 C76 43 78 46 78 49 C78 52 75 54 71 54" stroke="#004199" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </motion.g>

          {/* Right Arm & Hand (Green) */}
          <motion.g variants={rightArmVariants} initial="initial" animate="animate">
            {/* Sleeve */}
            <path d="M170 32 C170 29.5 168 27.5 165.5 27.5 H152 V62.5 H165.5 C168 62.5 170 60.5 170 58 Z" fill="#1c7c22" />
            {/* Wrist / Arm */}
            <path d="M152 46 H115 C110.5 46 107 42.5 107 38 C107 33.5 110.5 30 115 30 H152" fill="#e8f5e9" stroke="#1c7c22" strokeWidth="4.5" strokeLinecap="round" />
            {/* Thumb */}
            <path d="M118 46 C114 54 108 54 106 49 C104 44 110 40 118 40" stroke="#1c7c22" strokeWidth="4.5" strokeLinecap="round" fill="#e8f5e9" />
            {/* Fingers wrap */}
            <path d="M108 37 C104 37 102 40 102 43 C102 46 105 48 109 48" stroke="#1c7c22" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </motion.g>
        </svg>
      </div>

      {/* Localized labels */}
      <div className="space-y-1.5">
        <h4 className="text-sm font-extrabold tracking-wide text-slate-800 dark:text-white uppercase">
          {t.hero.title} <span className="text-primary-green">{t.hero.titlePoint}</span>
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
