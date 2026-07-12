import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { ArrowLeft, CheckCircle2, Phone, FileText } from 'lucide-react';
import * as Icons from 'lucide-react';
import { prisma } from '@/lib/prisma';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

// Dynamic Icon loader helper
function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) return <Icons.Shield className={className} />;
  return <LucideIcon className={className} />;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const FALLBACK_SERVICES = [
  { slug: 'bike-insurance', name: 'Bike Insurance', description: 'Get your two-wheeler insured instantly. Protect against accidents, fire, theft, and third-party liabilities within minutes.', icon: 'Bike', category: 'MOTOR', benefits: ['Instant policy copy within 10 minutes', 'Up to 70% discount on premiums', 'Hassle-free online renewal', 'Optional zero depreciation cover', 'Third-party and comprehensive packages'] },
  { slug: 'car-insurance', name: 'Car Insurance', description: 'Protect your car with India\'s top car insurance plans. Cashless garage network and immediate roadside assistance during emergencies.', icon: 'Car', category: 'MOTOR', benefits: ['Quick comparison of top 10+ insurers', 'Cashless claims at 5000+ garages', '24/7 roadside assistance support', 'No Claim Bonus (NCB) transfer option', 'Add-ons like Engine Protect & Consumables Cover'] },
  { slug: 'auto-insurance', name: 'Auto Insurance', description: 'Custom insurance policies for auto-rickshaws and passenger three-wheelers, safeguarding your daily livelihood.', icon: 'Gauge', category: 'MOTOR', benefits: ['Cover for passenger liabilities', 'Protection against accidental damages', 'Livelihood protection cover options', 'Competitive commercial vehicle premiums', 'Express claims service'] },
  { slug: 'bus-insurance', name: 'Bus Insurance', description: 'Comprehensive coverage for school buses, staff buses, and commercial tour operators with legal passenger liability cover.', icon: 'Bus', category: 'MOTOR', benefits: ['High value third-party liability cover', 'Accident insurance for driver & helpers', 'Protection for school/corporate transport', 'Flexible depreciation waiver add-ons', 'Round-the-clock claim guidance'] },
  { slug: 'heavy-vehicle-insurance', name: 'Heavy Vehicle Insurance', description: 'Tailored commercial vehicle insurance for trucks, tractors, trailers, tippers, and construction equipment.', icon: 'Truck', category: 'MOTOR', benefits: ['Comprehensive own damage & towing coverage', 'Third-party property damage coverage', 'Customized transit & load protection', 'Special commercial fleet rates', 'Dedicated claim advisors for fast approval'] },
  { slug: 'life-insurance', name: 'Life Insurance', description: 'Ensure financial security for your family. Choose from term insurance, savings-oriented endowment plans, and children plans.', icon: 'HeartHandshake', category: 'LIFE', benefits: ['High sum assured term plans at lowest rates', 'Tax savings under Section 80C', 'Secured future for dependents', 'Add-on critical illness benefit riders', 'Assistance in selecting best payout options'] },
  { slug: 'health-insurance', name: 'Health Insurance', description: 'Cover medical expenses, surgeries, and critical illnesses for you and your family. Cashless hospital stays at premium hospitals.', icon: 'ShieldAlert', category: 'HEALTH', benefits: ['Cashless treatment at network hospitals', 'Tax benefit under section 80D', 'No medical tests required up to 45 years', 'Pre & post hospitalization charges cover', 'Maternity and newborn cover options'] },
  { slug: 'travel-insurance', name: 'Travel Insurance', description: 'Stay secured during your international and domestic travels. Covers medical emergencies, flight delays, and baggage loss.', icon: 'Plane', category: 'TRAVEL', benefits: ['Emergency medical evacuation coverage', 'Compensation for lost or delayed baggage', 'Passport and document loss assistance', 'Trip cancellation & interruption cover', 'Schengen visa approved policies'] },
  { slug: 'accident-insurance', name: 'Accident Insurance', description: 'Personal accident policy offering absolute financial security against accidental death, partial/permanent disability, and hospital bills.', icon: 'Activity', category: 'HEALTH', benefits: ['100% payout for accidental death', 'Permanent total disability cover', 'Children education benefit extension', 'Weekly accidental wage loss cover option', 'Worldwide coverage active 24/7'] },
  { slug: 'opd-insurance', name: 'OPD Insurance', description: 'Saves your pocket from day-to-day medical expenses like doctor consultations, dental checks, pharmacy bills, and diagnostics.', icon: 'Stethoscope', category: 'HEALTH', benefits: ['Covers regular doctor consulting fees', 'Reimbursements for medicines & pharmacy bills', 'Lab tests & diagnostic checkup covers', 'No hospitalization required for claims', 'Perfect add-on for corporate/family policies'] },
  { slug: 'fire-insurance', name: 'Fire Insurance', description: 'Safeguard your commercial buildings, factories, offices, and inventories against fire hazards, storms, and explosions.', icon: 'Flame', category: 'FIRE', benefits: ['Protects structural building assets', 'Inventory, raw materials & machinery cover', 'Loss of profits (business interruption) cover', 'Earthquake and atmospheric disturbance cover', 'Swift damage evaluation & claim processing'] },
  { slug: 'group-mediclaim-insurance', name: 'Group Mediclaim Insurance', description: 'Specially designed employee health benefits for small, medium, and corporate businesses to keep the team protected.', icon: 'Users', category: 'HEALTH', benefits: ['Pre-existing disease coverage from day one', 'Maternity benefits and corporate buffer', 'High employee retention and morale boost', 'Cashless network access for employees', 'Tailored group premium discounts'] }
];

const translateService = (service: any, lang: string) => {
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = FALLBACK_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Details' };
  
  return {
    title: `${service.name} | Friends Insurance Point`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = getTranslation(lang);

  let service = FALLBACK_SERVICES.find((s) => s.slug === slug);

  try {
    const dbService = await prisma.insuranceService.findUnique({
      where: { slug },
    });
    if (dbService) {
      service = {
        slug: dbService.slug,
        name: dbService.name,
        description: dbService.description,
        icon: dbService.icon,
        category: dbService.category,
        benefits: dbService.benefits,
      };
    }
  } catch (error) {
    console.error('Database fetch error in Service detail page:', error);
  }

  if (!service) {
    notFound();
  }

  const translatedService = translateService(service, lang);

  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Link
        href="/services"
        className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary-blue dark:hover:text-primary-blue-light mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {lang === 'en' ? 'Back to Services' : 'சேவைகளுக்குத் திரும்புக'}
      </Link>

      <div className="space-y-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-8 sm:p-12 shadow-soft glass-card">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-blue-light dark:bg-primary-blue/20 text-primary-blue dark:text-primary-blue-light shadow-xs">
              <ServiceIcon name={translatedService.icon} className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded-full border border-slate-100/50 dark:border-slate-800">
                {translatedService.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1.5 animate-slide-up">
                {translatedService.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Description Block */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            {lang === 'en' ? 'Coverage Description' : 'காப்பீடு கவரேஜ் விளக்கம்'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-bold">
            {translatedService.description}
          </p>
        </div>

        {/* Benefits Checklist Block */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            {lang === 'en' ? 'Key Benefits & Coverages' : 'முக்கிய நன்மைகள் & கவரேஜ்கள்'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {translatedService.benefits.map((benefit: string, idx: number) => (
              <AnimatedReveal
                key={idx}
                direction="up"
                delay={0.05 * idx}
                className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-105 dark:border-slate-850"
              >
                <CheckCircle2 className="w-5 h-5 text-primary-green shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">{benefit}</span>
              </AnimatedReveal>
            ))}
          </div>
        </div>

        {/* CTA Actions */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={`/quote?type=${encodeURIComponent(translatedService.name)}`}
            className="flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary-blue to-primary-blue-hover text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <FileText className="w-4.5 h-4.5 mr-2" />
            {t.common.getQuote}
          </Link>
          <a
            href="tel:7598657990"
            className="flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-850 transition-colors"
          >
            <Phone className="w-4.5 h-4.5 mr-2 text-primary-green" />
            {t.common.callNow}
          </a>
        </div>
      </div>
    </div>
  );
}
