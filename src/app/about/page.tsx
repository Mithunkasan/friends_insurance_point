import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Award, ShieldCheck, HeartHandshake, MapPin, Phone, Mail, Clock } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

export const metadata: Metadata = {
  title: 'About Us | Friends Insurance Point',
  description:
    'Learn more about Friends Insurance Point. We are experienced insurance consultants in Vadasery, Nagercoil, providing motor, health, life, and fire insurance comparisons.',
};

export default async function AboutPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = getTranslation(lang);

  return (
    <div className="py-16 sm:py-24 space-y-24 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Intro Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <AnimatedReveal className="space-y-4">
              <h1 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">{t.about.tag}</h1>
              <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {t.about.title}
              </p>
              <p className="text-base sm:text-lg text-slate-650 dark:text-slate-300 leading-relaxed font-bold">
                {t.about.subtitle}
              </p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.2} className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed space-y-4 font-bold">
              <p>{t.about.description1}</p>
              <p>{t.about.description2}</p>
            </AnimatedReveal>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            {/* Visual Brand Card */}
            <AnimatedReveal direction="none" delay={0.3} className="w-full max-w-md aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary-blue to-primary-green p-8 text-white relative shadow-xl overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 -z-10 w-48 h-48 bg-white/10 rounded-full blur-xl" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full border border-white/20">
                  {t.about.cardTag}
                </span>
                <h3 className="text-3xl font-extrabold mt-6">{t.about.cardTitle}</h3>
              </div>
              <div>
                <p className="text-xs text-blue-100 font-bold mb-2">{t.about.cardSubtitle}</p>
                <div className="flex items-center space-x-2 text-sm font-bold bg-white/15 px-4 py-2.5 rounded-xl border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-primary-green shrink-0" />
                  <span>{t.about.cardBadge}</span>
                </div>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 dark:bg-slate-900/10 py-20 border-y border-slate-100 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedReveal className="text-center space-y-4 mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">{t.about.strengthsTag}</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.about.strengthsTitle}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold max-w-lg mx-auto">
              {t.about.strengthsDesc}
            </p>
          </AnimatedReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.about.strengthsItems.map((value, idx) => {
              const iconsMap = [
                <Award key="1" className="w-6 h-6" />,
                <ShieldCheck key="2" className="w-6 h-6" />,
                <HeartHandshake key="3" className="w-6 h-6" />
              ];
              return (
                <AnimatedReveal
                  key={value.title}
                  direction="up"
                  delay={0.1 * idx}
                  className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm text-center space-y-4"
                >
                  <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-blue-light dark:bg-primary-blue/20 text-primary-blue dark:text-primary-blue-light">
                    {iconsMap[idx] || <Award className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">{value.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-bold">{value.desc}</p>
                </AnimatedReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map & Office Address */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Address Details */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatedReveal className="space-y-4">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">{t.about.visitTag}</h2>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.about.visitTitle}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">
                {t.about.visitDesc}
              </p>
            </AnimatedReveal>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-305 font-bold">
                <MapPin className="w-5 h-5 text-primary-blue shrink-0 mt-0.5" />
                <span className="leading-relaxed font-bold">
                  72/132, Arattu Road, <br />
                  Krishnancoil, Vadasery, <br />
                  Nagercoil – 629001, Tamil Nadu, India.
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-305 font-bold">
                <Phone className="w-5 h-5 text-primary-green shrink-0" />
                <span>+91 7373723019</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-305 font-bold">
                <Mail className="w-5 h-5 text-primary-blue shrink-0" />
                <span>info@friendsinsurancepoint.com</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-305 font-bold">
                <Clock className="w-5 h-5 text-primary-blue shrink-0 mt-0.5" />
                <span>{t.about.visitHours}</span>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-7 h-96 w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
            <iframe
              title="Friends Insurance Point Office Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.5772412852233!2d77.4282421!3d8.1965193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f141d2d9b7fd%3A0x814b2bf59ec75b42!2sJP+PAINTS!5e0!3m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
