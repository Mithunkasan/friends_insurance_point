'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Phone, Mail, Clock, MapPin, 
  MessageSquare, HelpCircle, FileText, CreditCard, 
  Plus, Minus, List, ArrowUpRight, Check, ShieldAlert, Users, Heart, Shield, Headphones
} from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQClientProps {
  faqs: FAQItem[];
  lang: string;
}

export default function FAQClient({ faqs, lang }: FAQClientProps) {
  const isTa = lang === 'ta';
  
  const [searchVal, setSearchVal] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Questions');
  const [expandedId, setExpandedId] = useState<string | null>(faqs[0]?.id || null);

  const ui = {
    tag: isTa ? 'கேள்விகள்' : 'FAQ',
    title: isTa ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions',
    desc: isTa ? 'எங்கள் காப்பீட்டுத் தயாரிப்புகள் மற்றும் சேவைகளைப் பற்றிய பொதுவான கேள்விகளுக்கான விரைவான பதில்களைக் கண்டறியவும்.' : 'Find quick answers to common questions about our insurance products and services.',
    searchPlaceholder: isTa ? 'உங்கள் கேள்வியை இங்கே தேடவும்...' : 'Search your question here...',
    searchBtn: isTa ? 'தேடு' : 'Search',
    categoriesTitle: isTa ? 'வகைகள்' : 'Categories',
    questionsText: isTa ? 'கேள்விகள்' : 'Questions',
    stillHaveQuestions: isTa ? 'இன்னும் கேள்விகள் உள்ளதா?' : 'Still Have Questions?',
    supportTeamText: isTa ? 'உங்களுக்கு உதவ எங்கள் குழு தயாராக உள்ளது.' : 'Our support team is here to help you.',
    contactUsBtn: isTa ? 'தொடர்பு கொள்ள' : 'Contact Us',
    getFreeQuoteBtn: isTa ? 'இலவசக் கட்டணக் கோரிக்கை' : 'Get Free Quote',
    weAreHere: isTa ? 'உங்களுக்கு உதவ நாங்கள் இருக்கிறோம்' : 'We Are Here To Help You',
    needMoreHelp: isTa ? 'மேலும் உதவி தேவையா?' : 'Need More Help?',
    expertTeamDesc: isTa ? 'உங்களது காப்பீடு தொடர்பான எந்தவொரு கேள்விகளுக்கும் பதிலளிக்க எங்களது நிபுணர் குழு தயாராக உள்ளது.' : 'Our expert team is ready to assist you with any of your insurance related queries.',
    quickAssistance: isTa ? 'உடனடி உதவி' : 'Quick Assistance',
    callUsTitle: isTa ? 'அழைக்க' : 'Call Us',
    callUsDesc: isTa ? 'எங்கள் நிபுணரிடம் பேச' : 'Speak with our expert',
    liveChatTitle: isTa ? 'வாட்ஸ்அப் அரட்டை' : 'Live Chat',
    liveChatDesc: isTa ? 'எங்கள் குழுவுடன் அரட்டையடிக்க' : 'Chat live with our support',
    emailUsTitle: isTa ? 'மின்னஞ்சல் செய்ய' : 'Email Us',
    emailUsDesc: isTa ? 'மின்னஞ்சல் அனுப்பவும்' : 'Drop us an email',
    callbackTitle: isTa ? 'திரும்ப அழைக்கக் கோரவும்' : 'Request Call Back',
    callbackDesc: isTa ? 'நாங்கள் உங்களை அழைப்போம்' : 'We will call you',
    allQuestions: isTa ? 'அனைத்து கேள்விகள்' : 'All Questions',
    workingHours: isTa ? 'திங்கள் - சனி: காலை 9:00 - மாலை 7:00' : 'Mon - Sat: 9:00 AM - 7:00 PM',
    address: isTa ? '72/132, ஆராட்டு ரோடு, கிருஷ்ணன்கோவில், நாகர்கோவில் - 629001' : '72/132, Arattu Road, Krishnancoil, Nagercoil - 629001'
  };

  // Helper to translate category names dynamically for displaying in the sidebar
  const translateCategory = (cat: string) => {
    if (!isTa) {
      if (cat === 'POLICY') return 'Policy & Coverage';
      if (cat === 'GENERAL') return 'General';
      if (cat === 'DOCUMENTS') return 'Documents';
      return cat;
    }
    
    const mapping: Record<string, string> = {
      'All Questions': 'அனைத்து கேள்விகள்',
      'General': 'பொதுவானவை',
      'GENERAL': 'பொதுவானவை',
      'Motor Insurance': 'மோட்டார் காப்பீடு',
      'Claims': 'கிளைம்கள்',
      'Health Insurance': 'சுகாதார காப்பீடு',
      'Life Insurance': 'ஆயுள் காப்பீடு',
      'Commercial Insurance': 'வணிக காப்பீடு',
      'DOCUMENTS': 'ஆவணங்கள்',
      'Documents': 'ஆவணங்கள்',
      'POLICY': 'பாலிசி & கவரேஜ்',
      'Policy & Coverage': 'பாலிசி & கவரேஜ்'
    };

    return mapping[cat] || cat;
  };

  // Get icons for each category
  const getCategoryIcon = (category: string) => {
    const cat = category.toUpperCase();
    if (cat.includes('ALL')) return <List className="w-4 h-4" />;
    if (cat.includes('MOTOR')) return <FileText className="w-4 h-4" />;
    if (cat.includes('POLICY')) return <Shield className="w-4 h-4" />;
    if (cat.includes('CLAIM')) return <ShieldAlert className="w-4 h-4" />;
    if (cat.includes('DOCUMENT')) return <FileText className="w-4 h-4" />;
    if (cat.includes('PREMIUM') || cat.includes('PAYMENT')) return <CreditCard className="w-4 h-4" />;
    if (cat.includes('HEALTH')) return <Heart className="w-4 h-4" />;
    if (cat.includes('LIFE')) return <Users className="w-4 h-4" />;
    return <HelpCircle className="w-4 h-4" />;
  };

  // Build dynamic category list
  const categoriesSet = new Set<string>();
  faqs.forEach(faq => {
    categoriesSet.add(faq.category || 'General');
  });
  const categoriesList = ['All Questions', ...Array.from(categoriesSet)];

  const getQuestionCount = (category: string) => {
    if (category === 'All Questions') return faqs.length;
    return faqs.filter(faq => (faq.category || 'General') === category).length;
  };

  const formatCount = (count: number) => {
    return count < 10 ? `0${count}` : `${count}`;
  };

  // Filtered FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All Questions' || (faq.category || 'General') === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchVal);
  };

  return (
    <div className="space-y-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-colors duration-300">
      
      {/* 1. Header with Search & Illustration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/50 dark:bg-slate-900/10 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-900/50">
        <div className="lg:col-span-7 space-y-6 text-left">
          <AnimatedReveal className="space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary-green dark:text-emerald-400 block">
              {ui.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {ui.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-550 dark:text-slate-400 font-semibold leading-relaxed">
              {ui.desc}
            </p>
          </AnimatedReveal>

          {/* Search Form */}
          <AnimatedReveal delay={0.15}>
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-450" />
                <input
                  type="text"
                  placeholder={ui.searchPlaceholder}
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary-green/20 dark:focus:ring-emerald-500/20 text-slate-850 dark:text-slate-150 transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-sm font-bold rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {ui.searchBtn}
              </button>
            </form>
          </AnimatedReveal>
        </div>

        {/* 3D Illustration on the right */}
        <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
          <div className="relative w-full max-w-[340px] aspect-[4/3]">
            <Image
              src="/faq_header.png"
              alt="FAQ 3D Illustration"
              fill
              className="object-contain select-none"
              priority
            />
          </div>
        </div>
      </div>

      {/* 2. Main content area: Sidebar & FAQ List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Sidebar: Categories & Still Have Questions Card */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Categories card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="bg-[#002e6c] dark:bg-slate-950 px-6 py-5 text-left">
              <h2 className="text-lg font-black text-white tracking-wide">
                {ui.categoriesTitle}
              </h2>
            </div>
            <div className="p-3.5 space-y-1 text-left">
              {categoriesList.map((category) => {
                const isSelected = selectedCategory === category;
                const count = getQuestionCount(category);
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      // Expand first filtered item in that category
                      const matching = faqs.filter(f => category === 'All Questions' || (f.category || 'General') === category);
                      if (matching.length > 0) {
                        setExpandedId(matching[0].id);
                      }
                    }}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl font-bold transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-650 text-white shadow-md shadow-emerald-650/10' 
                        : 'text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                        {getCategoryIcon(category)}
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold tracking-wide">
                        {translateCategory(category)}
                      </span>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {formatCount(count)} {ui.questionsText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Graphic Illustration Card */}
          <div className="hidden lg:block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-center relative overflow-hidden">
            <div className="relative w-full max-w-[200px] h-[150px] mx-auto mb-2">
              <Image
                src="/faq_sofa.png"
                alt="Working on laptop on sofa illustration"
                fill
                className="object-contain select-none"
              />
            </div>
          </div>

          {/* Still Have Questions Card */}
          <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                {ui.stillHaveQuestions}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold">
                {ui.supportTeamText}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="flex items-center justify-center px-5 py-3.5 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-[#003275] dark:text-blue-400 text-xs font-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 mr-2" />
                {ui.contactUsBtn}
              </Link>
              <Link
                href="/quote"
                className="flex items-center justify-center px-5 py-3.5 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-emerald-600 dark:text-emerald-400 text-xs font-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4 mr-1.5" />
                {ui.getFreeQuoteBtn}
              </Link>
            </div>
          </div>

        </div>

        {/* Right side: Accordion FAQ List */}
        <div className="lg:col-span-8 space-y-4 text-left">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80">
              <HelpCircle className="w-12 h-12 text-slate-350 mx-auto mb-4" />
              <p className="text-base font-extrabold text-slate-500 dark:text-slate-400">
                {isTa ? 'கேள்விகள் எதுவும் கிடைக்கவில்லை.' : 'No questions found matching your criteria.'}
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.01)] transition-all duration-300 ${
                    isOpen 
                      ? 'border-emerald-100 dark:border-emerald-900/30 ring-2 ring-emerald-50 dark:ring-emerald-950/20' 
                      : 'border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Item Header */}
                  <button
                    onClick={() => setExpandedId(isOpen ? null : faq.id)}
                    className="flex justify-between items-center w-full px-6 py-5 text-left font-black gap-4 group cursor-pointer"
                  >
                    <span className={`text-sm sm:text-base tracking-wide transition-colors ${
                      isOpen 
                        ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' 
                        : 'text-slate-850 dark:text-slate-150 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isOpen 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : 'border-slate-200 dark:border-slate-700 text-slate-400 group-hover:border-emerald-500 group-hover:text-emerald-500'
                    }`}>
                      {isOpen ? <Minus className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>

                  {/* Item Answer (Animated) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-slate-50 dark:border-slate-800/40">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            {/* Left Text */}
                            <div className="md:col-span-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-bold">
                              {faq.answer}
                            </div>
                            {/* Right Image graphic */}
                            <div className="hidden md:flex md:col-span-4 justify-center">
                              <div className="relative w-full max-w-[120px] aspect-square rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30 p-2 border border-slate-100/50 dark:border-slate-800/30">
                                <Image
                                  src="/faq_umbrella.png"
                                  alt="Family protection illustration"
                                  fill
                                  className="object-contain p-1 select-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* 3. Bottom Section: Need More Help? */}
      <div className="bg-[#f7faf8] dark:bg-slate-900/30 border border-slate-100 dark:border-slate-900/50 rounded-3xl p-6 sm:p-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-primary-green dark:text-emerald-400 block">
                {ui.weAreHere}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {ui.needMoreHelp}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                {ui.expertTeamDesc}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Phone item */}
              <a href="tel:7598657990" className="flex items-center space-x-3.5 hover:-translate-y-0.5 transition-transform group">
                <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100/50 dark:border-emerald-900/20 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  7598657990
                </span>
              </a>

              {/* Email item */}
              <a href="mailto:friendsinsurancepoint@gmail.com" className="flex items-center space-x-3.5 hover:-translate-y-0.5 transition-transform group">
                <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100/50 dark:border-emerald-900/20 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors break-all">
                  friendsinsurancepoint@gmail.com
                </span>
              </a>

              {/* Working hours item */}
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100/50 dark:border-emerald-900/20">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  {ui.workingHours}
                </span>
              </div>

              {/* Address item */}
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100/50 dark:border-emerald-900/20 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 leading-relaxed max-w-xs">
                  {ui.address}
                </span>
              </div>
            </div>
          </div>

          {/* Middle Column: Support Rep Illustration */}
          <div className="hidden lg:flex lg:col-span-3 justify-center items-center relative">
            <div className="relative w-full max-w-[210px] aspect-square">
              <Image
                src="/faq_support.png"
                alt="Customer support assistant vector"
                fill
                className="object-contain select-none"
              />
            </div>
            {/* 24/7 Overlay badge */}
            <div className="absolute top-1/2 left-[20%] -translate-y-1/2 bg-white dark:bg-slate-900 rounded-2xl px-3 py-1.5 border border-slate-100 dark:border-slate-800 shadow-md flex items-center space-x-1.5 animate-bounce-slow">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[10px] font-black text-slate-800 dark:text-slate-200">24/7 Support</span>
            </div>
          </div>

          {/* Right Column: Quick assistance cards */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 dark:text-emerald-400">
              {ui.quickAssistance}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              
              {/* Call box */}
              <a
                href="tel:7598657990"
                className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-left flex flex-col justify-between space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.015)] hover:shadow-soft hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">
                    {ui.callUsTitle}
                  </h4>
                  <p className="text-[9px] font-bold text-slate-550 dark:text-slate-400 leading-tight">
                    {ui.callUsDesc}
                  </p>
                </div>
              </a>

              {/* Chat box */}
              <a
                href="https://wa.me/917598657990"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-left flex flex-col justify-between space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.015)] hover:shadow-soft hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">
                    {ui.liveChatTitle}
                  </h4>
                  <p className="text-[9px] font-bold text-slate-550 dark:text-slate-400 leading-tight">
                    {ui.liveChatDesc}
                  </p>
                </div>
              </a>

              {/* Email box */}
              <a
                href="mailto:friendsinsurancepoint@gmail.com"
                className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-left flex flex-col justify-between space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.015)] hover:shadow-soft hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">
                    {ui.emailUsTitle}
                  </h4>
                  <p className="text-[9px] font-bold text-slate-550 dark:text-slate-400 leading-tight">
                    {ui.emailUsDesc}
                  </p>
                </div>
              </a>

              {/* Callback box */}
              <Link
                href="/quote"
                className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-left flex flex-col justify-between space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.015)] hover:shadow-soft hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">
                    {ui.callbackTitle}
                  </h4>
                  <p className="text-[9px] font-bold text-slate-550 dark:text-slate-400 leading-tight">
                    {ui.callbackDesc}
                  </p>
                </div>
              </Link>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
