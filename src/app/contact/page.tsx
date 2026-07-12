import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/shared/ContactForm';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

export const metadata: Metadata = {
  title: 'Contact Us | Friends Insurance Point',
  description:
    'Have questions or need a quick insurance quote renewal? Get in touch with Friends Insurance Point in Krishnancoil, Vadasery, Nagercoil. Call 7598657990.',
};

export default async function ContactPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = getTranslation(lang);

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 animate-fade-in">
      <AnimatedReveal className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">{t.nav.contact}</h1>
        <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lang === 'en' ? 'Get In Touch' : 'எங்களைத் தொடர்பு கொள்ளவும்'}
        </p>
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
          {lang === 'en'
            ? 'Have questions about policy renewal or coverage? Reach out to our local Nagercoil advisors.'
            : 'பாலிசி புதுப்பித்தல் அல்லது கவரேஜ் பற்றி கேள்விகள் உள்ளதா? எங்களது நாகர்கோவில் ஆலோசகர்களைத் தொடர்பு கொள்ளவும்.'}
        </p>
      </AnimatedReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Contact Info Widget */}
        <div className="lg:col-span-5 space-y-8 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800/60 shadow-xs">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              {lang === 'en' ? 'Office Contact Details' : 'அலுவலக தொடர்பு விவரங்கள்'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-405 leading-relaxed font-semibold">
              {t.about.visitDesc}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-primary-blue dark:text-primary-blue-light shrink-0 shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                <h4 className="font-extrabold text-slate-900 dark:text-white mb-1">
                  {lang === 'en' ? 'Office Location' : 'அலுவலக முகவரி'}
                </h4>
                <p className="leading-relaxed font-bold">
                  72/132, Arattu Road, <br />
                  Krishnancoil, Vadasery, <br />
                  Nagercoil – 629001, Tamil Nadu, India.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-primary-green shrink-0 shadow-xs">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                <h4 className="font-extrabold text-slate-900 dark:text-white mb-1">
                  {lang === 'en' ? 'Call Directly' : 'அழைப்பு எண்'}
                </h4>
                <p className="font-bold text-base text-slate-800 dark:text-white">+91 7598657990</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-primary-blue dark:text-primary-blue-light shrink-0 shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                <h4 className="font-extrabold text-slate-900 dark:text-white mb-1">
                  {lang === 'en' ? 'Email Address' : 'மின்னஞ்சல் முகவரி'}
                </h4>
                <p className="font-bold">info@friendsinsurancepoint.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-primary-blue dark:text-primary-blue-light shrink-0 shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                <h4 className="font-extrabold text-slate-900 dark:text-white mb-1">
                  {lang === 'en' ? 'Working Hours' : 'வேலை நேரம்'}
                </h4>
                <p className="font-bold">{t.about.visitHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Box */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-8 sm:p-12 shadow-soft glass-card">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
            {t.contactForm.title}
          </h3>
          <ContactForm lang={lang} />
        </div>
      </div>
    </div>
  );
}
