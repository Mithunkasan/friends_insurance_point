import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/home/Hero';
import StatsCounter from '@/components/home/StatsCounter';
import BottomCtaSection from '@/components/home/BottomCtaSection';
import FaqSection from '@/components/home/FaqSection';
import PartnersSection from '@/components/home/PartnersSection';
import ProcessSection from '@/components/home/ProcessSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import { getTranslation } from '@/locales/translate';


// Fallback Services in case DB is empty or connection fails
const FALLBACK_SERVICES = [
  { id: '1', slug: 'bike-insurance', name: 'Bike Insurance', description: 'Get your two-wheeler insured instantly. Protect against accidents, fire, theft, and liabilities.', icon: 'Bike', category: 'MOTOR', benefits: ['Instant policy copy in 10 mins', 'Up to 70% discount', 'Optional zero-depreciation cover'] },
  { id: '2', slug: 'car-insurance', name: 'Car Insurance', description: 'Protect your car with India\'s top plans. Cashless garage network and immediate roadside assistance.', icon: 'Car', category: 'MOTOR', benefits: ['Cashless claims at 5000+ garages', '24/7 roadside assistance support', 'No Claim Bonus (NCB) transfer'] },
  { id: '3', slug: 'auto-insurance', name: 'Auto Insurance', description: 'Custom insurance policies for auto-rickshaws and passenger three-wheelers, safeguarding your daily livelihood.', icon: 'Gauge', category: 'MOTOR', benefits: ['Cover for passenger liabilities', 'Protection against accidental damages', 'Competitive commercial premiums'] },
  { id: '4', slug: 'bus-insurance', name: 'Bus Insurance', description: 'Comprehensive coverage for school buses, staff buses, and commercial tour operators.', icon: 'Bus', category: 'MOTOR', benefits: ['Accident cover for driver & helpers', 'High sum liability protection', 'Flexible depreciation waiver'] },
  { id: '5', slug: 'heavy-vehicle-insurance', name: 'Heavy Vehicle Insurance', description: 'Tailored commercial vehicle insurance for trucks, tractors, trailers, and construction equipment.', icon: 'Truck', category: 'MOTOR', benefits: ['Fleet rates for commercial trucks', 'Towing coverage add-on', 'Dedicated claims supervisor'] },
  { id: '6', slug: 'health-insurance', name: 'Health Insurance', description: 'Cover medical expenses, surgeries, and critical illnesses for your family with cashless hospital stays.', icon: 'ShieldAlert', category: 'HEALTH', benefits: ['Cashless treatment network', 'Tax benefit under 80D', 'Pre & post hospitalization cover'] },
];

type ServiceType = typeof FALLBACK_SERVICES[number];

// Tamil dynamic mapping for database services
const translateService = (service: ServiceType, lang: string): ServiceType => {
  if (lang !== 'ta') return service;
  
  const mapping: Record<string, { name: string; description: string; benefits: string[] }> = {
    'bike-insurance': {
      name: 'பைக் இன்சூரன்ஸ்',
      description: 'உங்கள் இருசக்கர வாகனத்திற்கு உடனே இன்சூரன்ஸ் பெறுங்கள். விபத்து, தீ, திருட்டு மற்றும் மூன்றாம் தரப்பு பொறுப்புகளுக்கு எதிரான பாதுகாப்பு.',
      benefits: ['10 நிமிடத்தில் பாலிசி நகல்', '70% வரை பிரீமியம் தள்ளுபடி', 'எளிதான ஆன்லைன் புதுப்பித்தல்', 'தேய்மானம் இல்லா கவரேஜ்', 'மூன்றாம் தரப்பு & விரிவான பாலிசிகள்']
    },
    'car-insurance': {
      name: 'கார் இன்சூரன்ஸ்',
      description: 'இந்தியாவின் முன்னணி கார் காப்பீட்டுத் திட்டங்கள் மூலம் உங்கள் காரைப் பாதுகாக்கவும். கேஷ்லெஸ் கேரேஜ் நெட்வொர்க் மற்றும் அவசர சாலை உதவி.',
      benefits: ['10+ முன்னணி நிறுவனங்களின் ஒப்பீடு', '5000+ கேரேஜ்களில் கேஷ்லெஸ் வசதி', '24/7 அவசர சாலை உதவி', 'நோ-கிளைம் போனஸ் (NCB) மாற்றம்', 'தேய்மானம் இல்லா கவரேஜ்']
    },
    'auto-insurance': {
      name: 'ஆட்டோ இன்சூரன்ஸ்',
      description: 'ஆட்டோ ரிக்‌ஷாக்கள் மற்றும் பயணிகள் மூன்று சக்கர வாகனங்களுக்கான காப்பீடு, உங்கள் அன்றாட வாழ்வாதாரத்தைப் பாதுகாக்கிறது.',
      benefits: ['பயணிகள் பொறுப்பு காப்பீடு', 'விபத்து சேதங்கள் பாதுகாப்பு', 'வாழ்வாதாரப் பாதுகாப்பு கூடுதல் கவர்கள்', 'மலிவான வணிக வாகன பிரீமியம்', 'விரைவான கிளைம் சேவை']
    },
    'bus-insurance': {
      name: 'பஸ் இன்சூரன்ஸ்',
      description: 'பள்ளி பேருந்துகள், ஊழியர் பேருந்துகள் மற்றும் வணிக பேருந்துகள் ஆகியவற்றுக்கான விரிவான கவரேஜ் மற்றும் பயணிகள் பொறுப்பு காப்பீடு.',
      benefits: ['மூன்றாம் தரப்பு பொறுப்பு கவரேஜ்', 'ஓட்டுநர் & உதவியாளர் விபத்து காப்பீடு', 'பள்ளி/கார்ப்பரேட் வாகன கவரேஜ்', 'நெகிழ்வான தேய்மானம் இல்லா திட்டங்கள்', '24 மணி நேர கிளைம் வழிகாட்டுதல்']
    },
    'heavy-vehicle-insurance': {
      name: 'கனரக வாகன இன்சூரன்ஸ்',
      description: 'டிரக்குகள், டிராக்டர்கள், டிரெய்லர்கள் மற்றும் கட்டுமான உபகரணங்களுக்கான வணிக வாகன இன்சூரன்ஸ்.',
      benefits: ['விரிவான சொந்த சேத கவரேஜ்', 'மூன்றாம் தரப்பு சொத்து சேத பாதுகாப்பு', 'தனிப்பயனாக்கப்பட்ட லோடு பாதுகாப்பு', 'சிறப்பு வணிக வாகன கட்டணங்கள்', 'விரைவான கிளைம் அனுமதிகள்']
    },
    'life-insurance': {
      name: 'ஆயுள் காப்பீடு (Life)',
      description: 'உங்கள் குடும்பத்தின் நிதிப் பாதுகாப்பை உறுதி செய்யுங்கள். டேர்ம் இன்சூரன்ஸ் மற்றும் சேமிப்புத் திட்டங்கள்.',
      benefits: ['குறைந்த கட்டணத்தில் அதிக கவரேஜ்', 'பிரிவு 80C இன் கீழ் வரி சேமிப்பு', 'சார்ந்திருப்பவர்களின் பாதுகாப்பான எதிர்காலம்', 'இக்கட்டான நோய் பாதுகாப்பு கூடுதல் கவர்கள்', 'எளிதான பாலிசி தொகை செட்டில்மென்ட்']
    },
    'health-insurance': {
      name: 'ஆரோக்கிய காப்பீடு (Health)',
      description: 'உங்களுக்கும் உங்கள் குடும்பத்திற்கும் மருத்துவச் செலவுகள், அறுவை சிகிச்சைகள் மற்றும் தீவிர நோய்களுக்கான கவரேஜ். கேஷ்லெஸ் மருத்துவமனை சிகிச்சை.',
      benefits: ['கேஷ்லெஸ் மருத்துவமனை சிகிச்சை', 'பிரிவு 80D இன் கீழ் வரி சேமிப்பு', '45 வயது வரை மருத்துவ பரிசோதனை இல்லை', 'மருத்துவமனைக்கு முந்தைய & பிந்தைய செலவுகள்', 'மகப்பேறு & பிறந்த குழந்தை கவரேஜ்']
    },
    'travel-insurance': {
      name: 'பயண காப்பீடு (Travel)',
      description: 'சர்வதேச மற்றும் உள்நாட்டுப் பயணங்களின் போது பாதுகாப்பாக இருங்கள். அவசர சிகிச்சை, லக்கேஜ் இழப்பு மற்றும் பயண ரத்து பாதுகாப்பு.',
      benefits: ['அவசர மருத்துவ கவரேஜ்', 'இழந்த/தாமதமான லக்கேஜ் இழப்பீடு', 'பாஸ்போர்ட் மற்றும் ஆவணங்கள் இழப்பு உதவி', 'பயண ரத்து மற்றும் தடை பாதுகாப்பு', 'செஞ்சன் விசா அங்கீகரிக்கப்பட்ட பாலிசி']
    },
    'accident-insurance': {
      name: 'விபத்து காப்பீடு',
      description: 'விபத்தினால் ஏற்படும் மரணம், பகுதி/நிரந்தர ஊனம் மற்றும் மருத்துவமனை கட்டணங்களுக்கு எதிரான முழுமையான நிதிப் பாதுகாப்பு.',
      benefits: ['விபத்து மரணத்திற்கு 100% பாலிசி தொகை', 'நிரந்தர முழு ஊன கவரேஜ்', 'குழந்தைகள் கல்வி நல உதவி', 'வாராந்திர வருமான இழப்பு கவரேஜ்', '24/7 உலகளாவிய பாதுகாப்பு']
    },
    'opd-insurance': {
      name: 'OPD இன்சூரன்ஸ்',
      description: 'டாக்டர் கட்டணம், பல் பரிசோதனை, மருந்துக் கடை பில்கள் மற்றும் பரிசோதனை செலவுகள் போன்ற அன்றாட மருத்துவ செலவுகளைப் பாதுகாக்கும்.',
      benefits: ['டாக்டர் ஆலோசனை கட்டண கவரேஜ்', 'மருந்து பில்கள் திரும்பப் பெறுதல்', 'லேப் டெஸ்டுகள் & பரிசோதனை கவரேஜ்', 'கிளைமிற்கு மருத்துவமனையில் அனுமதிக்க தேவையலை', 'பல் மற்றும் கண் பரிசோதனை கவரேஜ்']
    },
    'fire-insurance': {
      name: 'தீ விபத்து காப்பீடு',
      description: 'வணிகக் கட்டிடங்கள், தொழிற்சாலைகள், அலுவலகங்கள் மற்றும் இருப்புகளை தீ விபத்து, புயல் மற்றும் வெடிப்பு ஆகியவற்றிலிருந்து பாதுகாக்கவும்.',
      benefits: ['கட்டிட சொத்துக்கள் பாதுகாப்பு', 'சரக்குகள், மூலப்பொருட்கள் & இயந்திரங்கள் கவர்', 'வணிகத் தடை இழப்பு கவரேஜ்', 'நிலநடுக்கம் & இயற்கை சீற்ற பாதுகாப்பு', 'விரைவான சேத மதிப்பீடு & கிளைம் தீர்வு']
    },
    'group-mediclaim-insurance': {
      name: 'குழு மருத்துவ காப்பீடு',
      description: 'நிறுவனத்தின் ஊழியர்களைப் பாதுகாக்க வடிவமைக்கப்பட்ட குழு மருத்துவ காப்பீட்டுத் திட்டம்.',
      benefits: ['முதல் நாள் முதலே இருக்கும் நோய்களுக்கான கவரேஜ்', 'மகப்பேறு நன்மைகள் & நிறுவன பஃபர்', 'ஊழியர் தக்கவைப்பு மற்றும் ஊக்கத்தை அதிகரிக்கும்', 'ஊழியர்களுக்கான கேஷ்லெஸ் வசதி', 'தனிப்பயனாக்கப்பட்ட குழு கட்டண தள்ளுபடி']
    }
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

export default async function Home() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = getTranslation(lang);

  let services = FALLBACK_SERVICES;
  let faqs: { id: string; question: string; answer: string; category?: string }[] = [];
  let testimonials: { id: string; name: string; role: string; review: string; rating: number }[] = [];
  let partners: { name: string }[] = [];

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

    const dbFaqs = await prisma.fAQ.findMany({ where: { active: true }, take: 6 });
    if (dbFaqs.length > 0) {
      faqs = dbFaqs.map(f => ({
        id: f.id,
        question: lang === 'ta' ? (f.question.includes('10 Mins') || f.question.includes('10 minutes') ? 'பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்டில் எனது வாகன காப்பீட்டை எவ்வளவு விரைவாக புதுப்பிக்க முடியும்?' : f.question) : f.question, // Fallback check
        answer: f.answer,
        category: f.category
      }));
    }

    const dbTestimonials = await prisma.testimonial.findMany({ where: { active: true } });
    if (dbTestimonials.length > 0) {
      testimonials = dbTestimonials.map(t => ({
        id: t.id,
        name: t.name,
        role: t.role,
        review: t.review,
        rating: t.rating
      }));
    }

    const dbPartners = await prisma.insurancePartner.findMany({ where: { active: true }, orderBy: { orderIndex: 'asc' } });
    if (dbPartners.length > 0) {
      partners = dbPartners.map(p => ({
        name: p.name
      }));
    }
  } catch (error) {
    console.error('Database fetch error in Home page, using fallback data:', error);
  }

  // Fallback lists if DB is not empty but we need basic schema
  if (faqs.length === 0) {
    faqs = [
      { id: '1', question: lang === 'en' ? 'How quickly can I get my vehicle insurance renewed at Friends Insurance Point?' : 'பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்டில் எனது வாகன காப்பீட்டை எவ்வளவு விரைவாக புதுப்பிக்க முடியும்?', answer: lang === 'en' ? 'At Friends Insurance Point, we promise instant policy issuance. In most cases, if you share the required vehicle details (RC copy and previous policy copy), we will generate and deliver your active insurance policy in just 10 minutes.' : 'பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்டில், உடனடி பாலிசி வழங்குவதாக உறுதியளிக்கிறோம். பெரும்பாலான சந்தர்ப்பங்களில், தேவையான வாகன விவரங்களை (RC மற்றும் முந்தைய பாலிசி நகல்) பகிர்ந்து கொண்டால், வெறும் 10 நிமிடங்களில் உங்கள் பாலிசியை உங்களுக்கு வழங்குவோம்.' },
      { id: '2', question: lang === 'en' ? 'What documents are required to buy or renew car/bike insurance?' : 'கார்/பைக் இன்சூரன்ஸ் வாங்க அல்லது புதுப்பிக்க என்ன ஆவணங்கள் தேவை?', answer: lang === 'en' ? 'You only need to provide two main documents: 1) Your vehicle\'s Registration Certificate (RC Book Copy) and 2) Your previous year\'s policy copy (if renewing). No additional physical paperwork is required.' : 'நீங்கள் இரண்டு முக்கிய ஆவணங்களை மட்டுமே வழங்க வேண்டும்: 1) உங்கள் வாகனத்தின் பதிவுச் சான்றிதழ் (RC புக் நகல்) மற்றும் 2) முந்தைய வருடத்தின் பாலிசி நகல் (புதுப்பிப்பதாக இருந்தால்).' },
      { id: '3', question: lang === 'en' ? 'What is Third-Party Insurance vs. Comprehensive Insurance?' : 'தேர்ட் பார்ட்டி இன்சூரன்ஸ் vs விரிவான (Comprehensive) இன்சூரன்ஸ் என்றால் என்ன?', answer: lang === 'en' ? 'Third-Party Insurance is mandatory by law in India; it covers damages, death, or injury caused to a third party. Comprehensive Insurance is highly recommended; it covers third-party liabilities PLUS damage/theft of your own vehicle.' : 'தேர்ட் பார்ட்டி இன்சூரன்ஸ் சட்டப்படி கட்டாயமாகும்; இது மூன்றாம் தரப்பினருக்கு ஏற்படும் சேதங்கள் அல்லது காயங்களை உள்ளடக்கும். விரிவான கவரேஜ் சொந்த வாகனச் சேதங்களையும் உள்ளடக்கும்.' }
    ];
  }

  if (testimonials.length === 0) {
    testimonials = [
      { id: '1', name: 'Rajesh Kumar', role: lang === 'en' ? 'Commercial Tourist Bus Owner, Nagercoil' : 'வணிக சுற்றுலா பஸ் உரிமையாளர், நாகர்கோவில்', review: lang === 'en' ? 'I have 5 tourist buses and got all of them insured through Friends Insurance Point. They gave me the best price comparison and sent the policy copies in 10 minutes.' : 'என்னிடம் 5 சுற்றுலா பேருந்துகள் உள்ளன, அவை அனைத்திற்கும் பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்ட் மூலம் காப்பீடு செய்தேன். சிறந்த ஒப்பீட்டுக் கட்டணத்தை வழங்கி 10 நிமிடங்களில் பாலிசி நகலை அனுப்பினர்.', rating: 5 },
      { id: '2', name: 'Maria Josephine', role: lang === 'en' ? 'IT Professional, Vadasery' : 'ஐடி நிபுணர், வடசேரி', review: lang === 'en' ? 'Renewed my Honda Activa insurance over WhatsApp. I sent the RC copy, made the payment, and got the policy PDF on my phone within 7 minutes! Highly recommended!' : 'எனது ஹோண்டா ஆக்டிவா இன்சூரன்ஸை வாட்ஸ்அப் மூலம் புதுப்பித்தேன். RC நகலை அனுப்பி, பணம் செலுத்தி, 7 நிமிடங்களுக்குள் பாலிசி PDF-ஐப் பெற்றேன்!', rating: 5 }
    ];
  }

  if (partners.length === 0) {
    partners = [{ name: 'TATA AIG' }, { name: 'United India Insurance' }, { name: 'National Insurance' }, { name: 'Royal Sundaram' }, { name: 'IFFCO Tokio' }, { name: 'Chola MS' }, { name: 'The New India Assurance Co. Ltd.' }];
  }

  // Apply Tamil mappings for dynamic DB services
  const translatedServices = services.map(s => translateService(s, lang));

  return (
    <div className="space-y-24 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Hero lang={lang} />
      <StatsCounter lang={lang} />
      <ServicesSection services={translatedServices} t={t} />
      <WhyChooseUsSection t={t} />
      <PartnersSection partners={partners} t={t} />
      <ProcessSection t={t} />
      <TestimonialsSection lang={lang} testimonials={testimonials} t={t} />
      <FaqSection faqs={faqs} t={t} />
      <BottomCtaSection t={t} />
    </div>
  );
}
