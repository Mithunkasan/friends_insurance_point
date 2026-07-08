import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

export const metadata: Metadata = {
  title: 'Our Insurance Partners | Friends Insurance Point',
  description:
    'Compare policy benefits and premiums from India\'s top general insurance companies, including TATA AIG, United India Insurance, Royal Sundaram, National Insurance, and IFFCO Tokio.',
};

const FALLBACK_PARTNERS = [
  { name: 'TATA AIG General Insurance', description: 'Offering modern add-on covers, cashless garages, and fast claims processing for passenger cars and commercial vehicles.' },
  { name: 'United India Insurance Company', description: 'A trusted government general insurance giant providing highly affordable commercial vehicle rates.' },
  { name: 'National Insurance Company Ltd.', description: 'Government-owned insurer providing reliable, wide-reaching motor and crop cover networks across India.' },
  { name: 'Royal Sundaram General Insurance', description: 'Renowned for rapid cashless approvals, transparent claims, and zero-depreciation coverage packages.' },
  { name: 'IFFCO Tokio General Insurance', description: 'Excellent roadside assistance and quick settlement of motor own damage claims.' },
  { name: 'Chola MS General Insurance', description: 'Popular private insurer with highly competitive premiums and comprehensive passenger protection add-ons.' },
  { name: 'The New India Assurance Co. Ltd.', description: 'India\'s largest multinational general insurance company with a pristine claim settlement history.' }
];

// Tamil dynamic mapping for partners descriptions
const translatePartner = (partner: any, lang: string) => {
  if (lang !== 'ta') return partner;
  
  const mapping: Record<string, string> = {
    'TATA AIG': 'கார்கள் மற்றும் வணிக வாகனங்களுக்கு நவீன கூடுதல் கவர்கள், கேஷ்லெஸ் கேரேஜ்கள் மற்றும் விரைவான கிளைம் செட்டில்மென்ட்களை வழங்குகிறது.',
    'United India Insurance': 'மிகவும் மலிவான வணிக வாகன காப்பீடுகளை வழங்கும் நம்பகமான பொதுத்துறை காப்பீட்டு நிறுவனம்.',
    'National Insurance': 'இந்தியா முழுவதும் பரவலான நெட்வொர்க்கை கொண்டுள்ள நம்பகமான அரசு காப்பீட்டு நிறுவனம்.',
    'Royal Sundaram': 'விரைவான கேஷ்லெஸ் ஒப்புதல்கள், வெளிப்படையான கிளைம்கள் மற்றும் தேய்மானம் இல்லா பாலிசிகளுக்கு பெயர் பெற்றது.',
    'IFFCO Tokio': 'மோட்டார் ஓன் டேமேஜ் கிளைம்களை விரைவாகத் தீர்க்கும் சிறந்த அவசர சாலை உதவி சேவையை வழங்குகிறது.',
    'Chola MS': 'மிகவும் போட்டித்தன்மை வாய்ந்த பாலிசி கட்டணங்கள் மற்றும் விரிவான பயணிகள் பாதுகாப்புடன் கூடிய தனியார் காப்பீட்டு நிறுவனம்.',
    'The New India Assurance Co. Ltd.': 'தூய்மையான கிளைம் செட்டில்மென்ட் வரலாற்றைக் கொண்ட இந்தியாவின் மிகப்பெரிய பொதுத்துறை காப்பீட்டு நிறுவனம்.'
  };

  const desc = mapping[partner.name];
  if (!desc) return partner;
  return { ...partner, description: desc };
};

export default async function PartnersPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = getTranslation(lang);

  let partners = FALLBACK_PARTNERS;

  try {
    const dbPartners = await prisma.insurancePartner.findMany({
      where: { active: true },
      orderBy: { orderIndex: 'asc' },
    });
    if (dbPartners.length > 0) {
      partners = dbPartners.map((p) => {
        const fallback = FALLBACK_PARTNERS.find((fp) => fp.name.startsWith(p.name) || p.name.startsWith(fp.name));
        return {
          name: p.name,
          description: fallback ? fallback.description : 'Trusted general insurance partner supplying customized policy coverages.',
        };
      });
    }
  } catch (error) {
    console.error('Database fetch error in Partners page:', error);
  }

  const translatedPartners = partners.map(p => translatePartner(p, lang));

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 animate-fade-in">
      <AnimatedReveal className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">{t.partners.tag}</h1>
        <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.partners.title}
        </p>
        <p className="text-base sm:text-lg text-slate-550 dark:text-slate-450 font-semibold leading-relaxed">
          {t.partners.description}
        </p>
      </AnimatedReveal>

      {/* Partners Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {translatedPartners.map((partner, index) => (
          <AnimatedReveal
            key={partner.name}
            direction="up"
            delay={0.05 * (index % 3)}
            className="group p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl shadow-sm hover:shadow-soft hover:border-primary-blue/20 dark:hover:border-primary-blue/30 transition-all duration-300 glass-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-2 text-primary-blue dark:text-primary-blue-light mb-4">
                <ShieldCheck className="w-6 h-6 text-primary-blue dark:text-primary-blue-light group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded-full border border-slate-100 dark:border-slate-800">
                  {lang === 'en' ? 'Authorized Partner' : 'அங்கீகரிக்கப்பட்ட கூட்டாளி'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 group-hover:text-primary-blue dark:group-hover:text-primary-blue-light transition-colors">
                {partner.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                {partner.description}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-55/80 dark:border-slate-800 flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <span>{lang === 'en' ? 'Own Damage + Third Party' : 'சொந்த விபத்து + மூன்றாம் நபர்'}</span>
              <span className="text-primary-green">{lang === 'en' ? 'Cashless Network' : 'கேஷ்லெஸ் நெட்வொர்க்'}</span>
            </div>
          </AnimatedReveal>
        ))}
      </div>

      {/* Trust Banner block */}
      <AnimatedReveal
        direction="up"
        className="rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-4 max-w-2xl">
          <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            {t.partners.compareTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-450 leading-relaxed font-bold">
            {t.partners.compareDesc}
          </p>
        </div>
        <div className="shrink-0 w-full md:w-auto">
          <Link
            href="/quote"
            className="flex items-center justify-center px-6 py-4 bg-primary-blue hover:bg-primary-blue-hover text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            {t.partners.compareButton}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </AnimatedReveal>
    </div>
  );
}
