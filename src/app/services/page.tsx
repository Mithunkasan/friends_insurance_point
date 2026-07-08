import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

export const metadata: Metadata = {
  title: 'Our Insurance Services | Friends Insurance Point',
  description:
    'Browse our comprehensive selection of insurance plans in Nagercoil including Car, Bike, Auto, Bus, Heavy Commercial Truck, Life, Health, OPD, Fire, and Group Mediclaim policy comparisons.',
};

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) return <Icons.Shield className={className} />;
  return <LucideIcon className={className} />;
}

const FALLBACK_SERVICES = [
  { id: '1', slug: 'bike-insurance', name: 'Bike Insurance', description: 'Get your two-wheeler insured instantly. Protect against accidents, fire, theft, and liabilities.', icon: 'Bike', category: 'MOTOR', benefits: ['Instant policy copy in 10 mins', 'Up to 70% discount', 'Optional zero-depreciation cover'] },
  { id: '2', slug: 'car-insurance', name: 'Car Insurance', description: 'Protect your car with India\'s top plans. Cashless garage network and immediate roadside assistance.', icon: 'Car', category: 'MOTOR', benefits: ['Cashless claims at 5000+ garages', '24/7 roadside assistance support', 'No Claim Bonus (NCB) transfer'] },
  { id: '3', slug: 'auto-insurance', name: 'Auto Insurance', description: 'Custom insurance policies for auto-rickshaws and passenger three-wheelers, safeguarding your daily livelihood.', icon: 'Gauge', category: 'MOTOR', benefits: ['Cover for passenger liabilities', 'Protection against accidental damages', 'Competitive commercial premiums'] },
  { id: '4', slug: 'bus-insurance', name: 'Bus Insurance', description: 'Comprehensive coverage for school buses, staff buses, and commercial tour operators.', icon: 'Bus', category: 'MOTOR', benefits: ['Accident cover for driver & helpers', 'High sum liability protection', 'Flexible depreciation waiver'] },
  { id: '5', slug: 'heavy-vehicle-insurance', name: 'Heavy Vehicle Insurance', description: 'Tailored commercial vehicle insurance for trucks, tractors, trailers, and construction equipment.', icon: 'Truck', category: 'MOTOR', benefits: ['Fleet rates for commercial trucks', 'Towing coverage add-on', 'Dedicated claims supervisor'] },
  { id: '6', slug: 'life-insurance', name: 'Life Insurance', description: 'Ensure financial security for your family. Choose from term insurance, savings-oriented endowment plans, and children plans.', icon: 'HeartHandshake', category: 'LIFE', benefits: ['High sum assured at lowest rates', 'Tax savings under Section 80C', 'Secured future for dependents'] },
  { id: '7', slug: 'health-insurance', name: 'Health Insurance', description: 'Cover medical expenses, surgeries, and critical illnesses for your family with cashless hospital stays.', icon: 'ShieldAlert', category: 'HEALTH', benefits: ['Cashless treatment network', 'Tax benefit under 80D', 'Pre & post hospitalization cover'] },
  { id: '8', slug: 'travel-insurance', name: 'Travel Insurance', description: 'Stay secured during your international and domestic travels. Covers medical emergencies, flight delays, and baggage loss.', icon: 'Plane', category: 'TRAVEL', benefits: ['Emergency medical evacuation', 'Compensation for lost baggage', 'Schengen visa approved policies'] },
  { id: '9', slug: 'accident-insurance', name: 'Accident Insurance', description: 'Personal accident policy offering financial security against accidental death, partial/permanent disability, and hospital bills.', icon: 'Activity', category: 'HEALTH', benefits: ['100% payout for accidental death', 'Permanent total disability cover', 'Worldwide coverage active 24/7'] },
  { id: '10', slug: 'opd-insurance', name: 'OPD Insurance', description: 'Saves your pocket from day-to-day medical expenses like doctor consultations, dental checks, pharmacy bills, and diagnostics.', icon: 'Stethoscope', category: 'HEALTH', benefits: ['Covers regular doctor consulting fees', 'Medicines & pharmacy bill refunds', 'Diagnostics & lab tests cover'] },
  { id: '11', slug: 'fire-insurance', name: 'Fire Insurance', description: 'Safeguard your commercial buildings, factories, offices, and inventories against fire hazards, storms, and explosions.', icon: 'Flame', category: 'FIRE', benefits: ['Protects structure & building assets', 'Inventory & machinery cover', 'Business interruption coverage'] },
  { id: '12', slug: 'group-mediclaim-insurance', name: 'Group Mediclaim Insurance', description: 'Specially designed employee health benefits for small, medium, and corporate businesses to keep the team protected.', icon: 'Users', category: 'HEALTH', benefits: ['Pre-existing disease cover from day 1', 'Maternity benefits extension', 'Cashless network access'] }
];

type ServiceType = typeof FALLBACK_SERVICES[number];

const translateService = (service: ServiceType, lang: string): ServiceType => {
  if (lang !== 'ta') return service;
  
  const mapping: Record<string, { name: string; description: string; benefits: string[] }> = {
    'bike-insurance': { name: 'பைக் இன்சூரன்ஸ்', description: 'உங்கள் இருசக்கர வாகனத்திற்கு உடனே இன்சூரன்ஸ் பெறுங்கள். விபத்து, தீ, திருட்டு மற்றும் மூன்றாம் தரப்பு பொறுப்புகளுக்கு எதிரான பாதுகாப்பு.', benefits: ['10 நிமிடத்தில் பாலிசி நகல்', '70% வரை பிரீமியம் தள்ளுபடி', 'எளிதான ஆன்லைன் புதுப்பித்தல்', 'தேய்மானம் இல்லா கவரேஜ்', 'மூன்றாம் தரப்பு & விரிவான பாலிசிகள்'] },
    'car-insurance': { name: 'கார் இன்சூரன்ஸ்', description: 'இந்தியாவின் முன்னணி கார் காப்பீட்டுத் திட்டங்கள் மூலம் உங்கள் காரைப் பாதுகாக்கவும். கேஷ்லெஸ் கேரேஜ் நெட்வொர்க் மற்றும் அவசர சாலை உதவி.', benefits: ['10+ முன்னணி நிறுவனங்களின் ஒப்பீடு', '5000+ கேரேஜ்களில் கேஷ்லெஸ் வசதி', '24/7 அவசர சாலை உதவி', 'நோ-கிளைம் போனஸ் (NCB) மாற்றம்', 'தேய்மானம் இல்லா கவரேஜ்'] },
    'auto-insurance': { name: 'ஆட்டோ இன்சூரன்ஸ்', description: 'ஆட்டோ ரிக்‌ஷாக்கள் மற்றும் பயணிகள் மூன்று சக்கர வாகனங்களுக்கான காப்பீடு, உங்கள் அன்றாட வாழ்வாதாரத்தைப் பாதுகாக்கிறது.', benefits: ['பயணிகள் பொறுப்பு காப்பீடு', 'விபத்து சேதங்கள் பாதுகாப்பு', 'வாழ்வாதாரப் பாதுகாப்பு கூடுதல் கவர்கள்', 'மலிவான வணிக வாகன பிரீமியம்', 'விரைவான கிளைம் சேவை'] },
    'bus-insurance': { name: 'பஸ் இன்சூரன்ஸ்', description: 'பள்ளி பேருந்துகள், ஊழியர் பேருந்துகள் மற்றும் வணிக பேருந்துகள் ஆகியவற்றுக்கான விரிவான கவரேஜ் மற்றும் பயணிகள் பொறுப்பு காப்பீடு.', benefits: ['மூன்றாம் தரப்பு பொறுப்பு கவரேஜ்', 'ஓட்டுநர் & உதவியாளர் விபத்து காப்பீடு', 'பள்ளி/கார்ப்பரேட் வாகன கவரேஜ்', 'நெகிழ்வான தேய்மானம் இல்லா திட்டங்கள்', '24 மணி நேர கிளைம் வழிகாட்டுதல்'] },
    'heavy-vehicle-insurance': { name: 'கனரக வாகன இன்சூரன்ஸ்', description: 'டிரக்குகள், டிராக்டர்கள், டிரெய்லர்கள் மற்றும் கட்டுமான உபகரணங்களுக்கான வணிக வாகன இன்சூரன்ஸ்.', benefits: ['விரிவான சொந்த சேத கவரேஜ்', 'மூன்றாம் தரப்பு சொத்து சேத பாதுகாப்பு', 'தனிப்பயனாக்கப்பட்ட லோடு பாதுகாப்பு', 'சிறப்பு வணிக வாகன கட்டணங்கள்', 'விரைவான கிளைம் அனுமதிகள்'] },
    'life-insurance': { name: 'ஆயுள் காப்பீடு (Life)', description: 'உங்கள் குடும்பத்தின் நிதிப் பாதுகாப்பை உறுதி செய்யுங்கள். டேர்ம் இன்சூரன்ஸ் மற்றும் சேமிப்புத் திட்டங்கள்.', benefits: ['குறைந்த கட்டணத்தில் அதிக கவரேஜ்', 'பிரிவு 80C இன் கீழ் வரி சேமிப்பு', 'சார்ந்திருப்பவர்களின் பாதுகாப்பான எதிர்காலம்', 'இக்கட்டான நோய் பாதுகாப்பு கூடுதல் கவர்கள்', 'எளிதான பாலிசி தொகை செட்டில்மென்ட்'] },
    'health-insurance': { name: 'ஆரோக்கிய காப்பீடு (Health)', description: 'உங்களுக்கும் உங்கள் குடும்பத்திற்கும் மருத்துவச் செலவுகள், அறுவை சிகிச்சைகள் மற்றும் தீவிர நோய்களுக்கான கவரேஜ். கேஷ்லெஸ் மருத்துவமனை சிகிச்சை.', benefits: ['கேஷ்லெஸ் மருத்துவமனை சிகிச்சை', 'பிரிவு 80D இன் கீழ் வரி சேமிப்பு', '45 வயது வரை மருத்துவ பரிசோதனை இல்லை', 'மருத்துவமனைக்கு முந்தைய & பிந்தைய செலவுகள்', 'மகப்பேறு & பிறந்த குழந்தை கவரேஜ்'] },
    'travel-insurance': { name: 'பயண காப்பீடு (Travel)', description: 'சர்வதேச மற்றும் உள்நாட்டுப் பயணங்களின் போது பாதுகாப்பாக இருங்கள். அவசர சிகிச்சை, லக்கேஜ் இழப்பு மற்றும் பயண ரத்து பாதுகாப்பு.', benefits: ['அவசர மருத்துவ கவரேஜ்', 'இழந்த/தாமதமான லக்கேஜ் இழப்பீடு', 'பாஸ்போர்ட் மற்றும் ஆவணங்கள் இழப்பு உதவி', 'பயண ரத்து மற்றும் தடை பாதுகாப்பு', 'செஞ்சன் விசா அங்கீகரிக்கப்பட்ட பாலிசி'] },
    'accident-insurance': { name: 'விபத்து காப்பீடு', description: 'விபத்தினால் ஏற்படும் மரணம், பகுதி/நிரந்தர ஊனம் மற்றும் மருத்துவமனை கட்டணங்களுக்கு எதிரான முழுமையான நிதிப் பாதுகாப்பு.', benefits: ['விபத்து மரணத்திற்கு 100% பாலிசி தொகை', 'நிரந்தர முழு ஊன கவரேஜ்', 'குழந்தைகள் கல்வி நல உதவி', 'வாராந்திர வருமான இழப்பு கவரேஜ்', '24/7 உலகளாவிய பாதுகாப்பு'] },
    'opd-insurance': { name: 'OPD இன்சூரன்ஸ்', description: 'டாக்டர் கட்டணம், பல் பரிசோதனை, மருந்துக் கடை பில்கள் மற்றும் பரிசோதனை செலவுகள் போன்ற அன்றாட மருத்துவ செலவுகளைப் பாதுகாக்கும்.', benefits: ['டாக்டர் ஆலோசனை கட்டண கவரேஜ்', 'மருந்து பில்கள் திரும்பப் பெறுதல்', 'லேப் டெஸ்டுகள் & பரிசோதனை கவரேஜ்', 'கிளைமிற்கு மருத்துவமனையில் அனுமதிக்க தேவையலை', 'பல் மற்றும் கண் பரிசோதனை கவரேஜ்'] },
    'fire-insurance': { name: 'தீ விபத்து காப்பீடு', description: 'வணிகக் கட்டிடங்கள், தொழிற்சாலைகள், அலுவலகங்கள் மற்றும் இருப்புகளை தீ விபத்து, புயல் மற்றும் வெடிப்பு ஆகியவற்றிலிருந்து பாதுகாக்கவும்.', benefits: ['கட்டிட சொத்துக்கள் பாதுகாப்பு', 'சரக்குகள், மூலப்பொருட்கள் & இயந்திரங்கள் கவர்', 'வணிகத் தடை இழப்பு கவரேஜ்', 'நிலநடுக்கம் & இயற்கை சீற்ற பாதுகாப்பு', 'விரைவான சேத மதிப்பீடு & கிளைம் தீர்வு'] },
    'group-mediclaim-insurance': { name: 'குழு மருத்துவ காப்பீடு', description: 'நிறுவனத்தின் ஊழியர்களைப் பாதுகாக்க வடிவமைக்கப்பட்ட குழு மருத்துவ காப்பீட்டுத் திட்டம்.', benefits: ['முதல் நாள் முதலே இருக்கும் நோய்களுக்கான கவரேஜ்', 'மகப்பேறு நன்மைகள் & நிறுவன பஃபர்', 'ஊழியர் தக்கவைப்பு மற்றும் ஊக்கத்தை அதிகரிக்கும்', 'ஊழியர்களுக்கான கேஷ்லெஸ் வசதி', 'தனிப்பயனாக்கப்பட்ட குழு கட்டண தள்ளுபடி'] }
  };

  const map = mapping[service.slug];
  if (!map) return service;
  
  return {
    ...service,
    name: map.name,
    description: map.description,
    benefits: map.benefits
  };
};

export default async function ServicesPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = getTranslation(lang);

  let services = FALLBACK_SERVICES;

  try {
    const dbServices = await prisma.insuranceService.findMany({ where: { active: true } });
    if (dbServices.length > 0) {
      services = dbServices.map(s => ({
        id: s.id,
        slug: s.slug,
        name: s.name,
        description: s.description,
        icon: s.icon,
        category: s.category,
        benefits: s.benefits
      }));
    }
  } catch (error) {
    console.error('Database fetch error in Services page:', error);
  }

  const translatedServices = services.map(s => translateService(s, lang));

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 animate-fade-in">
      <AnimatedReveal className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">
          {t.homeServices.tag}
        </h1>
        <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.homeServices.title}
        </p>
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
          {t.homeServices.description}
        </p>
      </AnimatedReveal>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {translatedServices.map((service, index) => (
          <AnimatedReveal
            key={service.id}
            direction="up"
            delay={0.05 * (index % 3)}
            className="group flex flex-col justify-between p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm hover:shadow-soft hover:-translate-y-1 transition-all duration-300 glass-card"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-blue-light dark:bg-primary-blue/20 text-primary-blue dark:text-primary-blue-light group-hover:bg-primary-blue group-hover:text-white transition-all duration-350 shadow-xs">
                  <ServiceIcon name={service.icon} className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded-full border border-slate-100/50 dark:border-slate-800">
                  {service.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-primary-blue dark:group-hover:text-primary-blue-light transition-colors">
                {service.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-semibold">
                {service.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-2 mb-8">
                {service.benefits.map((benefit, bIndex) => (
                  <li key={bIndex} className="flex items-center text-xs text-slate-600 dark:text-slate-300 font-bold">
                    <Check className="w-4 h-4 mr-2 text-primary-green shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-primary-blue group-hover:bg-primary-blue hover:text-white group-hover:text-white dark:hover:text-white text-slate-700 dark:text-slate-200 text-sm font-bold border border-slate-150 dark:border-slate-850 transition-all duration-300 shadow-xs cursor-pointer"
              >
                {t.common.applyNow}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </div>
  );
}
