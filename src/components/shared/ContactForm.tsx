'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2 } from 'lucide-react';
import { contactSchema, ContactInput } from '@/schema/validation';
import { getTranslation } from '@/locales/translate';

interface ContactFormProps {
  lang?: string;
}

export default function ContactForm({ lang = 'en' }: ContactFormProps) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const t = getTranslation(lang);

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
      console.error('Contact Form Submit Error:', error);
      setErrorMsg(
        lang === 'ta'
          ? 'முன்னறிவிக்கப்படாத பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.'
          : error.message || 'An unexpected error occurred. Please try again.'
      );
    }
  };

  const getErrorMessage = (field: keyof ContactInput, defaultMsg?: string) => {
    if (!defaultMsg) return undefined;
    if (lang !== 'ta') return defaultMsg;
    
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-bold">
          {errorMsg}
        </div>
      )}

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          {t.contactForm.nameLabel} <span className="text-rose-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder={t.contactForm.namePlaceholder}
          {...register('name')}
          className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all ${
            errors.name
              ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/60'
              : 'border-slate-200 dark:border-slate-800 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue'
          }`}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs font-bold text-rose-500">{getErrorMessage('name', errors.name.message)}</p>
        )}
      </div>

      {/* Phone Input */}
      <div>
        <label htmlFor="phone" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          {t.contactForm.phoneLabel} <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 font-extrabold text-sm">
            +91
          </div>
          <input
            id="phone"
            type="tel"
            placeholder={t.contactForm.phonePlaceholder}
            {...register('phone')}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all ${
              errors.phone
                ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/60'
                : 'border-slate-200 dark:border-slate-800 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue'
            }`}
          />
        </div>
        {errors.phone && (
          <p className="mt-1.5 text-xs font-bold text-rose-500">{getErrorMessage('phone', errors.phone.message)}</p>
        )}
      </div>

      {/* Vehicle Number (Optional) */}
      <div>
        <label htmlFor="vehicleNumber" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          {t.contactForm.vehicleLabel} <span className="text-slate-400">({lang === 'en' ? 'Optional' : 'விருப்பத்திற்குரியது'})</span>
        </label>
        <input
          id="vehicleNumber"
          type="text"
          placeholder={t.contactForm.vehiclePlaceholder}
          {...register('vehicleNumber')}
          className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all ${
            errors.vehicleNumber
              ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/60'
              : 'border-slate-200 dark:border-slate-800 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue'
          }`}
        />
        {errors.vehicleNumber && (
          <p className="mt-1.5 text-xs font-bold text-rose-500">{getErrorMessage('vehicleNumber', errors.vehicleNumber.message)}</p>
        )}
      </div>

      {/* Insurance Type Dropdown */}
      <div>
        <label htmlFor="insuranceType" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          {t.contactForm.typeLabel} <span className="text-rose-500">*</span>
        </label>
        <select
          id="insuranceType"
          {...register('insuranceType')}
          className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-sm font-bold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all appearance-none cursor-pointer ${
            errors.insuranceType
              ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/60'
              : 'border-slate-200 dark:border-slate-800 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue'
          }`}
        >
          <option value="" disabled>{t.contactForm.typePlaceholder}</option>
          <option value="Bike Insurance">{lang === 'en' ? 'Bike Insurance' : 'பைக் இன்சூரன்ஸ்'}</option>
          <option value="Car Insurance">{lang === 'en' ? 'Car Insurance' : 'கார் இன்சூரன்ஸ்'}</option>
          <option value="Auto Insurance">{lang === 'en' ? 'Auto Insurance' : 'ஆட்டோ இன்சூரன்ஸ்'}</option>
          <option value="Bus Insurance">{lang === 'en' ? 'Bus Insurance' : 'பஸ் இன்சூரன்ஸ்'}</option>
          <option value="Heavy Vehicle Insurance">{lang === 'en' ? 'Heavy Vehicle Insurance' : 'கனரக வாகன இன்சூரன்ஸ்'}</option>
          <option value="Life Insurance">{lang === 'en' ? 'Life Insurance' : 'ஆயுள் காப்பீடு (Life)'}</option>
          <option value="Health Insurance">{lang === 'en' ? 'Health Insurance' : 'ஆரோக்கிய காப்பீடு (Health)'}</option>
          <option value="Travel Insurance">{lang === 'en' ? 'Travel Insurance' : 'பயண காப்பீடு (Travel)'}</option>
          <option value="Accident Insurance">{lang === 'en' ? 'Accident Insurance' : 'விபத்து காப்பீடு'}</option>
          <option value="OPD Insurance">{lang === 'en' ? 'OPD Insurance' : 'OPD இன்சூரன்ஸ்'}</option>
          <option value="Fire Insurance">{lang === 'en' ? 'Fire Insurance' : 'தீ விபத்து காப்பீடு'}</option>
          <option value="Group Mediclaim Insurance">{lang === 'en' ? 'Group Mediclaim Insurance' : 'குழு மருத்துவ காப்பீடு'}</option>
          <option value="Others">{lang === 'en' ? 'Others' : 'இதர பிரிவுகள்'}</option>
        </select>
        {errors.insuranceType && (
          <p className="mt-1.5 text-xs font-bold text-rose-500">{getErrorMessage('insuranceType', errors.insuranceType.message)}</p>
        )}
      </div>

      {/* Message Input */}
      <div>
        <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          {t.contactForm.messageLabel} <span className="text-slate-400">({lang === 'en' ? 'Optional' : 'விருப்பத்திற்குரியது'})</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder={t.contactForm.messagePlaceholder}
          {...register('message')}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue focus:bg-white dark:focus:bg-slate-900 transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-primary-blue to-primary-blue-hover text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 transform hover:-translate-y-0.5 disabled:hover:transform-none transition-all cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {t.contactForm.submittingBtn}
          </>
        ) : (
          <>
            <Send className="w-4.5 h-4.5 mr-2" />
            {t.contactForm.submitBtn}
          </>
        )}
      </button>
    </form>
  );
}
