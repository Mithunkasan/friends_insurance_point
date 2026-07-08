'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Phone, FileText, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTranslation } from '@/locales/translate';

interface NavbarProps {
  lang?: string;
}

export default function Navbar({ lang = 'en' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();
  const router = useRouter();
  
  const t = getTranslation(lang);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.partners, href: '/partners' },
    { name: t.nav.faq, href: '/faq' },
    { name: t.nav.contact, href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Initial theme detection
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ta' : 'en';
    document.cookie = `lang=${nextLang}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
          isScrolled
            ? 'glass-navbar dark:bg-slate-950/80 dark:border-slate-900 py-3 shadow-soft'
            : 'bg-white/40 dark:bg-transparent backdrop-blur-xs py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo with logo.png */}
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-xs shrink-0">
                <Image
                  src="/logo.png"
                  alt="Friends Insurance Point logo"
                  width={38}
                  height={38}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-slate-850 dark:text-white leading-none">
                  Friends <span className="text-primary-green font-bold">Insurance</span>
                </span>
                <span className="text-[10px] font-bold text-primary-blue dark:text-primary-blue-light uppercase tracking-widest mt-0.5">
                  Point
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-bold tracking-wide transition-colors py-2 ${
                      isActive
                        ? 'text-primary-blue dark:text-primary-blue-light'
                        : 'text-slate-650 dark:text-slate-300 hover:text-primary-blue dark:hover:text-primary-blue-light'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-blue dark:bg-primary-blue-light rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Controls & CTAs */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors"
                title={lang === 'en' ? 'Switch to Tamil' : 'ஆங்கிலத்திற்கு மாற்றவும்'}
              >
                <Globe className="w-4.5 h-4.5 mr-1 text-primary-green" />
                <span className="text-xs font-extrabold uppercase">
                  {lang === 'en' ? 'தமிழ்' : 'ENG'}
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4.5 h-4.5 text-amber-500" />
                ) : (
                  <Moon className="w-4.5 h-4.5 text-primary-blue" />
                )}
              </button>

              <a
                href="tel:7373723019"
                className="flex items-center text-sm font-bold text-primary-blue dark:text-primary-blue-light hover:bg-primary-blue/5 dark:hover:bg-primary-blue/10 transition-colors px-4 py-2.5 rounded-xl bg-primary-blue-light/50 dark:bg-primary-blue/10 border border-primary-blue/20 dark:border-primary-blue/30"
              >
                <Phone className="w-4 h-4 mr-2" />
                7373723019
              </a>
              <Link
                href="/quote"
                className="flex items-center text-sm font-bold text-white bg-gradient-to-r from-primary-blue to-primary-blue-hover px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <FileText className="w-4 h-4 mr-2" />
                {t.common.getQuote}
              </Link>
            </div>

            {/* Mobile menu button & Small screen Toggles */}
            <div className="flex lg:hidden items-center space-x-2">
              {/* Mobile Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center p-2 rounded-xl text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-extrabold"
              >
                <Globe className="w-4 h-4 mr-1 text-primary-green" />
                {lang === 'en' ? 'தமிழ்' : 'EN'}
              </button>

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-primary-blue" />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 shadow-xl overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-3 sm:px-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                        isActive
                          ? 'bg-primary-blue-light/40 dark:bg-primary-blue/20 text-primary-blue dark:text-primary-blue-light border-l-4 border-primary-blue'
                          : 'text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary-blue'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:7373723019"
                    className="flex items-center justify-center w-full text-base font-bold text-primary-blue dark:text-primary-blue-light hover:bg-primary-blue/5 transition-colors px-4 py-3 rounded-xl bg-primary-blue-light/50 dark:bg-primary-blue/10 border border-primary-blue/20 dark:border-primary-blue/30"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    7373723019
                  </a>
                  <Link
                    href="/quote"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full text-base font-bold text-white bg-gradient-to-r from-primary-blue to-primary-blue-hover px-4 py-3 rounded-xl shadow-md transition-all duration-200"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    {t.common.getQuote}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Spacer */}
      <div className="h-[76px] md:h-[88px]" />
    </>
  );
}
