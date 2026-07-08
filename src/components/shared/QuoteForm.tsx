'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Calculator } from 'lucide-react';
import { quoteSchema, QuoteInput } from '@/schema/validation';
import { getTranslation } from '@/locales/translate';

interface QuoteFormProps {
  lang?: string;
}

export default function QuoteForm({ lang = 'en' }: QuoteFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = getTranslation(lang);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      vehicleType: '',
      vehicleMake: '',
      vehicleModel: '',
      registrationYear: new Date().getFullYear(),
      insuranceType: '',
      previousPolicyExpiry: '',
      message: '',
    },
  });

  // Pre-fill type if it exists in the query parameters
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam) {
      const typeLower = typeParam.toLowerCase();
      if (typeLower.includes('car') || typeLower.includes('கார்')) {
        setValue('vehicleType', 'Car');
        setValue('insuranceType', 'Comprehensive');
      } else if (typeLower.includes('bike') || typeLower.includes('பைக்')) {
        setValue('vehicleType', 'Bike');
        setValue('insuranceType', 'Comprehensive');
      } else if (typeLower.includes('bus') || typeLower.includes('பஸ்')) {
        setValue('vehicleType', 'Bus');
        setValue('insuranceType', 'Comprehensive');
      } else if (typeLower.includes('heavy') || typeLower.includes('truck') || typeLower.includes('கனரக')) {
        setValue('vehicleType', 'Heavy Vehicle');
        setValue('insuranceType', 'Comprehensive');
      } else if (typeLower.includes('auto') || typeLower.includes('ஆட்டோ')) {
        setValue('vehicleType', 'Auto');
        setValue('insuranceType', 'Comprehensive');
      } else {
        setValue('vehicleType', 'Others');
        setValue('insuranceType', 'Others');
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: QuoteInput) => {
    setErrorMsg(null);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit quote request');
      }

      router.push('/thank-you');
    } catch (error: any) {
      console.error('Quote Form Submit Error:', error);
      setErrorMsg(
        lang === 'ta'
          ? 'முன்னறிவிக்கப்படாத பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.'
          : error.message || 'An unexpected error occurred. Please try again.'
      );
    }
  };

  const getErrorMessage = (field: keyof QuoteInput, defaultMsg?: string) => {
    if (!defaultMsg) return undefined;
    if (lang !== 'ta') return defaultMsg;
    
    // Tamil error translations
    const messages: Record<string, string> = {
      name: 'பெயர் அவசியமானது (குறைந்தது 3 எழுத்துக்கள்)',
      phone: 'முறையான 10-இலக்க மொபைல் எண் தேவை',
      vehicleType: 'வாகன வகையைத் தேர்ந்தெடுக்கவும்',
      vehicleMake: 'தயாரிப்பு / பிராண்ட் பெயர் தேவை',
      vehicleModel: 'மாடல் பெயர் தேவை',
      registrationYear: 'முறையான பதிவு ஆண்டை உள்ளிடவும்',
      insuranceType: 'காப்பீடு வகையைத் தேர்ந்தெடுக்கவும்',
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

      {/* Customer Info Section Header */}
      <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary-blue dark:text-primary-blue-light border-l-2 border-primary-blue pl-2.5">
        {t.quoteForm.personalHeader}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all ${
              errors.name
                ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/65'
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
              className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all ${
                errors.phone
                  ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/65'
                  : 'border-slate-200 dark:border-slate-800 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1.5 text-xs font-bold text-rose-500">{getErrorMessage('phone', errors.phone.message)}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {t.quoteForm.emailLabel} <span className="text-slate-400">({lang === 'en' ? 'Optional' : 'விருப்பத்திற்குரியது'})</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder={t.quoteForm.emailPlaceholder}
            {...register('email')}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all ${
              errors.email
                ? 'border-rose-305 focus:ring-rose-100 dark:border-rose-900/65'
                : 'border-slate-200 dark:border-slate-800 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue'
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-bold text-rose-500">{errors.email.message}</p>
          )}
        </div>

        {/* Vehicle Type Selection */}
        <div>
          <label htmlFor="vehicleType" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {t.quoteForm.categoryLabel} <span className="text-rose-500">*</span>
          </label>
          <select
            id="vehicleType"
            {...register('vehicleType')}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-955 text-slate-705 dark:text-slate-300 text-sm font-bold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all appearance-none cursor-pointer ${
              errors.vehicleType
                ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/65'
                : 'border-slate-200 dark:border-slate-800 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue'
            }`}
          >
            <option value="" disabled>{t.quoteForm.categoryPlaceholder}</option>
            <option value="Bike">{lang === 'en' ? 'Two-Wheeler (Bike / Scooter)' : 'இருசக்கர வாகனம் (பைக் / ஸ்கூட்டர்)'}</option>
            <option value="Car">{lang === 'en' ? 'Four-Wheeler (Car)' : 'நான்கு சக்கர வாகனம் (கார்)'}</option>
            <option value="Auto">{lang === 'en' ? 'Auto-Rickshaw' : 'ஆட்டோ ரிக்‌ஷா'}</option>
            <option value="Bus">{lang === 'en' ? 'Bus' : 'பஸ் (பேருந்து)'}</option>
            <option value="Heavy Vehicle">{lang === 'en' ? 'Heavy Truck / Lorry / Fleet' : 'கனரக வாகனம் / டிரக் / லாரி'}</option>
            <option value="Others">{lang === 'en' ? 'Others (Health / Life)' : 'இதர பிரிவுகள் (ஆரோக்கியம் / ஆயுள்)'}</option>
          </select>
          {errors.vehicleType && (
            <p className="mt-1.5 text-xs font-bold text-rose-500">{getErrorMessage('vehicleType', errors.vehicleType.message)}</p>
          )}
        </div>
      </div>

      {/* Vehicle Info Section Header */}
      <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary-blue dark:text-primary-blue-light border-l-2 border-primary-blue pl-2.5 pt-4">
        {t.quoteForm.vehicleHeader}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Vehicle Brand / Make */}
        <div>
          <label htmlFor="vehicleMake" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {t.quoteForm.brandLabel} <span className="text-rose-500">*</span>
          </label>
          <input
            id="vehicleMake"
            type="text"
            placeholder={t.quoteForm.brandPlaceholder}
            {...register('vehicleMake')}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all ${
              errors.vehicleMake
                ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/65'
                : 'border-slate-200 dark:border-slate-800 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue'
            }`}
          />
          {errors.vehicleMake && (
            <p className="mt-1.5 text-xs font-bold text-rose-500">{getErrorMessage('vehicleMake', errors.vehicleMake.message)}</p>
          )}
        </div>

        {/* Model Name */}
        <div>
          <label htmlFor="vehicleModel" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {t.quoteForm.modelLabel} <span className="text-rose-500">*</span>
          </label>
          <input
            id="vehicleModel"
            type="text"
            placeholder={t.quoteForm.modelPlaceholder}
            {...register('vehicleModel')}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all ${
              errors.vehicleModel
                ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/65'
                : 'border-slate-200 dark:border-slate-800 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue'
            }`}
          />
          {errors.vehicleModel && (
            <p className="mt-1.5 text-xs font-bold text-rose-500">{getErrorMessage('vehicleModel', errors.vehicleModel.message)}</p>
          )}
        </div>

        {/* Registration Year */}
        <div>
          <label htmlFor="registrationYear" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {t.quoteForm.yearLabel} <span className="text-rose-500">*</span>
          </label>
          <input
            id="registrationYear"
            type="number"
            {...register('registrationYear', { valueAsNumber: true })}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all ${
              errors.registrationYear
                ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/65'
                : 'border-slate-200 dark:border-slate-800 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue'
            }`}
          />
          {errors.registrationYear && (
            <p className="mt-1.5 text-xs font-bold text-rose-500">{getErrorMessage('registrationYear', errors.registrationYear.message)}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insurance Coverage Preference */}
        <div>
          <label htmlFor="insuranceType" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {t.quoteForm.coverageLabel} <span className="text-rose-500">*</span>
          </label>
          <select
            id="insuranceType"
            {...register('insuranceType')}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-955 text-slate-705 dark:text-slate-300 text-sm font-bold focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all appearance-none cursor-pointer ${
              errors.insuranceType
                ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-900/65'
                : 'border-slate-200 dark:border-slate-800 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue'
            }`}
          >
            <option value="" disabled>{t.quoteForm.coveragePlaceholder}</option>
            <option value="Comprehensive">{lang === 'en' ? 'Comprehensive (Own Damage + Third Party)' : 'விரிவான கவரேஜ் (சொந்த சேதம் + மூன்றாம் நபர்)'}</option>
            <option value="Zero Depreciation">{lang === 'en' ? 'Zero Depreciation Add-on (Zero-Dep)' : 'பூஜ்ஜிய தேய்மானம் (Zero-Dep) கூடுதல் கவர்'}</option>
            <option value="Third Party Only">{lang === 'en' ? 'Third Party Insurance Only (Mandatory Cover)' : 'மூன்றாம் நபர் காப்பீடு மட்டும் (சட்டபூர்வ பாலிசி)'}</option>
            <option value="Others">{lang === 'en' ? 'Others' : 'இதர பிரிவுகள்'}</option>
          </select>
          {errors.insuranceType && (
            <p className="mt-1.5 text-xs font-bold text-rose-500">{getErrorMessage('insuranceType', errors.insuranceType.message)}</p>
          )}
        </div>

        {/* Previous Expiry */}
        <div>
          <label htmlFor="previousPolicyExpiry" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {t.quoteForm.expiryLabel} <span className="text-slate-400">({lang === 'en' ? 'If expired/applicable' : 'காலாவதி தேதி'})</span>
          </label>
          <input
            id="previousPolicyExpiry"
            type="text"
            placeholder={t.quoteForm.expiryPlaceholder}
            {...register('previousPolicyExpiry')}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue focus:bg-white dark:focus:bg-slate-900 transition-all"
          />
        </div>
      </div>

      {/* Message Box */}
      <div>
        <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          {t.quoteForm.messageLabel} <span className="text-slate-400">({lang === 'en' ? 'Optional' : 'விருப்பத்திற்குரியது'})</span>
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder={t.quoteForm.messagePlaceholder}
          {...register('message')}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-blue-light dark:focus:ring-primary-blue/30 focus:border-primary-blue focus:bg-white dark:focus:bg-slate-900 transition-all resize-none"
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
            {t.quoteForm.submittingBtn}
          </>
        ) : (
          <>
            <Calculator className="w-4.5 h-4.5 mr-2" />
            {t.quoteForm.submitBtn}
          </>
        )}
      </button>
    </form>
  );
}
