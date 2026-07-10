'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ArrowRight, User, Smartphone, Shield, Car, Check } from 'lucide-react';
import { contactSchema, ContactInput } from '@/schema/validation';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { TranslationType } from '@/locales/translate';

interface WhyChooseUsSectionProps {
  t: TranslationType;
  lang?: string;
}



export default function WhyChooseUsSection({ t, lang = 'en' }: WhyChooseUsSectionProps) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isTa = lang === 'ta';
  const formTitle = isTa ? 'இலவச இன்சூரன்ஸ் கட்டணத்தைப் பெறுங்கள்' : 'Get Free Insurance Quote';
  const formSubtitle = isTa ? 'உங்கள் விவரங்களை உள்ளிடவும், நாங்கள் உங்களைத் தொடர்பு கொள்வோம்' : 'Fill in your details and we will get back to you';
  const privacyText = isTa ? 'உங்கள் தனியுரிமையை நாங்கள் மதிக்கிறோம். உங்கள் விவரங்கள் எங்களிடம் பாதுகாப்பாக இருக்கும்.' : 'We respect your privacy. Your information is safe with us.';
  const submitBtnText = isTa ? 'இலவசக் கட்டணத்தை இப்போது பெறுங்கள்' : 'Get Free Quote Now';

  // Combine items and grid for list of checkmarks
  const listItems = [
    ...t.whyChooseUs.items.map((item) => item.title),
    ...t.whyChooseUs.grid.map((item) => item.title),
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      vehicleNumber: '',
      insuranceType: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setErrorMsg(null);
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      router.push('/thank-you');
    } catch (error: any) {
      console.error('Enquiry Form Submit Error:', error);
      setErrorMsg(
        isTa
          ? 'முன்னறிவிக்கப்படாத பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.'
          : error.message || 'An unexpected error occurred. Please try again.'
      );
    }
  };

  const getErrorMessage = (field: keyof ContactInput, defaultMsg?: string) => {
    if (!defaultMsg) return undefined;
    if (!isTa) return defaultMsg;
    
    // Tamil error translations
    const messages: Record<string, string> = {
      name: 'பெயர் அவசியமானது (குறைந்தது 3 எழுத்துக்கள்)',
      phone: 'முறையான 10-இலக்க மொபைல் எண் தேவை',
      vehicleNumber: 'முறையான வாகன எண் தேவை (எ.கா. TN-74-A-1234)',
      insuranceType: 'இன்சூரன்ஸ் வகையைத் தேர்ந்தெடுக்கவும்',
    };
    return messages[field] || defaultMsg;
  };

  return (
    <section className="bg-slate-50/70 dark:bg-slate-900/10 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Card: Why Choose Us */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <AnimatedReveal className="space-y-3">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">
                  {t.whyChooseUs.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {t.whyChooseUs.title}
                </h2>
              </AnimatedReveal>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-8">
                {/* Checklist column */}
                <div className="md:col-span-7 space-y-3.5">
                  {listItems.map((item, index) => (
                    <AnimatedReveal
                      key={index}
                      direction="left"
                      delay={0.05 * index}
                      className="flex items-center space-x-3 text-slate-700 dark:text-slate-200"
                    >
                      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white">
                        <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                      </span>
                      <span className="text-sm font-semibold leading-normal">{item}</span>
                    </AnimatedReveal>
                  ))}
                </div>

                {/* Illustration column */}
                <div className="md:col-span-5 flex justify-center py-4">
                  <AnimatedReveal direction="right" delay={0.2} className="flex justify-center w-full">
                    <Image
                      src="/why.png"
                      alt="Why Choose Us"
                      width={320}
                      height={320}
                      className="w-full h-auto max-w-[260px] md:max-w-[320px] object-contain select-none"
                    />
                  </AnimatedReveal>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Quote Form */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <AnimatedReveal className="space-y-1.5 mb-8">
                <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">
                  {formTitle}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {formSubtitle}
                </p>
              </AnimatedReveal>

              {errorMsg && (
                <div className="p-3 mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Name Input */}
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-500">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      placeholder={t.contactForm.nameLabel}
                      {...register('name')}
                      className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-white dark:bg-slate-955 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/60'
                          : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="pl-2 text-xs font-bold text-rose-500">{getErrorMessage('name', errors.name.message)}</p>
                  )}
                </div>

                {/* Mobile Number Input */}
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-500">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      placeholder={t.contactForm.phoneLabel}
                      {...register('phone')}
                      className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-white dark:bg-slate-955 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/60'
                          : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="pl-2 text-xs font-bold text-rose-500">{getErrorMessage('phone', errors.phone.message)}</p>
                  )}
                </div>

                {/* Insurance Type Dropdown */}
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-500">
                      <Shield className="w-5 h-5" />
                    </div>
                    <select
                      id="insuranceType"
                      {...register('insuranceType')}
                      className={`w-full pl-11 pr-10 py-3.5 rounded-xl border bg-white dark:bg-slate-955 text-slate-700 dark:text-slate-300 text-sm font-bold focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                        errors.insuranceType
                          ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/60'
                          : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500'
                      }`}
                    >
                      <option value="" disabled>{isTa ? 'இன்சூரன்ஸ் வகையைத் தேர்ந்தெடுக்கவும்' : 'Select Insurance Type'}</option>
                      <option value="Bike Insurance">{isTa ? 'பைக் இன்சூரன்ஸ்' : 'Bike Insurance'}</option>
                      <option value="Car Insurance">{isTa ? 'கார் இன்சூரன்ஸ்' : 'Car Insurance'}</option>
                      <option value="Auto Insurance">{isTa ? 'ஆட்டோ இன்சூரன்ஸ்' : 'Auto Insurance'}</option>
                      <option value="Bus Insurance">{isTa ? 'பஸ் இன்சூரன்ஸ்' : 'Bus Insurance'}</option>
                      <option value="Heavy Vehicle Insurance">{isTa ? 'கனரக வாகன இன்சூரன்ஸ்' : 'Heavy Vehicle Insurance'}</option>
                      <option value="Life Insurance">{isTa ? 'ஆயுள் காப்பீடு (Life)' : 'Life Insurance'}</option>
                      <option value="Health Insurance">{isTa ? 'ஆரோக்கிய காப்பீடு (Health)' : 'Health Insurance'}</option>
                      <option value="Travel Insurance">{isTa ? 'பயண காப்பீடு (Travel)' : 'Travel Insurance'}</option>
                      <option value="Accident Insurance">{isTa ? 'விபத்து காப்பீடு' : 'Accident Insurance'}</option>
                      <option value="OPD Insurance">{isTa ? 'OPD இன்சூரன்ஸ்' : 'OPD Insurance'}</option>
                      <option value="Fire Insurance">{isTa ? 'தீ விபத்து காப்பீடு' : 'Fire Insurance'}</option>
                      <option value="Group Mediclaim Insurance">{isTa ? 'குழு மருத்துவ காப்பீடு' : 'Group Mediclaim Insurance'}</option>
                      <option value="Others">{isTa ? 'இதர பிரிவுகள்' : 'Others'}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.insuranceType && (
                    <p className="pl-2 text-xs font-bold text-rose-500">{getErrorMessage('insuranceType', errors.insuranceType.message)}</p>
                  )}
                </div>

                {/* Vehicle Number Input */}
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-500">
                      <Car className="w-5 h-5" />
                    </div>
                    <input
                      id="vehicleNumber"
                      type="text"
                      placeholder={isTa ? 'வாகன எண் (விருப்பத்திற்குரியது)' : 'Vehicle Number (Optional)'}
                      {...register('vehicleNumber')}
                      className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-white dark:bg-slate-955 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 transition-all ${
                        errors.vehicleNumber
                          ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/60'
                          : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500'
                      }`}
                    />
                  </div>
                  {errors.vehicleNumber && (
                    <p className="pl-2 text-xs font-bold text-rose-500">{getErrorMessage('vehicleNumber', errors.vehicleNumber.message)}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center py-4 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-base font-bold rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {isTa ? 'சமர்ப்பிக்கப்படுகிறது...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      {submitBtnText}
                      <ArrowRight className="w-5 h-5 ml-2 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Privacy note */}
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-8 font-semibold">
              {privacyText}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
