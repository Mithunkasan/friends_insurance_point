import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import Accordion from '@/components/ui/Accordion';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Friends Insurance Point',
  description:
    'Find answers to all your insurance questions including policy renewal speeds, No Claim Bonus transfers, accident claims, zero depreciation cover, and more.',
};

const FALLBACK_FAQS = [
  { id: '1', question: 'How quickly can I get my vehicle insurance renewed at Friends Insurance Point?', answer: 'At Friends Insurance Point, we promise instant policy issuance. In most cases, if you share the required vehicle details (RC copy and previous policy copy), we will generate and deliver your active insurance policy in just 10 minutes.', category: 'GENERAL' },
  { id: '2', question: 'What documents are required to buy or renew car/bike insurance?', answer: 'You only need to provide two main documents: 1) Your vehicle\'s Registration Certificate (RC Book Copy) and 2) Your previous year\'s policy copy (if renewing). No additional physical paperwork is required.', category: 'DOCUMENTS' },
  { id: '3', question: 'What is Third-Party Insurance vs. Comprehensive Insurance?', answer: 'Third-Party Insurance is mandatory by law in India; it covers damages, death, or injury caused to a third party. Comprehensive Insurance is highly recommended; it covers third-party liabilities PLUS damage/theft of your own vehicle.', category: 'POLICY' }
];

const translateFaq = (faq: any, lang: string) => {
  if (lang !== 'ta') return faq;
  
  const mapping: Record<string, { q: string; a: string }> = {
    'How quickly can I get my vehicle insurance renewed at Friends Insurance Point?': {
      q: 'பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்டில் எனது வாகன காப்பீட்டை எவ்வளவு விரைவாக புதுப்பிக்க முடியும்?',
      a: 'பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்டில், உடனடி பாலிசி வழங்குவதாக நாங்கள் உறுதியளிக்கிறோம். பெரும்பாலான சந்தர்ப்பங்களில், தேவையான வாகன விவரங்களை (முந்தைய பாலிசி மற்றும் RC நகல்) வாட்ஸ்அப் அல்லது தொலைபேசி மூலம் பகிர்ந்து கொண்டால், வெறும் 10 நிமிடங்களில் உங்களது புதிய காப்பீட்டு பாலிசியை உங்களுக்கு வழங்குவோம்.'
    },
    'What documents are required to buy or renew car/bike insurance?': {
      q: 'கார் அல்லது பைக் இன்சூரன்ஸ் வாங்க அல்லது புதுப்பிக்க என்ன ஆவணங்கள் தேவை?',
      a: 'நீங்கள் இரண்டு முக்கிய ஆவணங்களை மட்டுமே வழங்க வேண்டும்: 1) உங்கள் வாகனத்தின் பதிவுச் சான்றிதழ் (RC புக் நகல்) மற்றும் 2) உங்கள் முந்தைய ஆண்டின் பாலிசி நகல் (புதுப்பிப்பதாக இருந்தால்). வேறு எந்த ஆவணப் பணிகளும் தேவையில்லை.'
    },
    'What is Third-Party Insurance vs. Comprehensive Insurance?': {
      q: 'தேர்ட் பார்ட்டி இன்சூரன்ஸ் மற்றும் விரிவான (Comprehensive) இன்சூரன்ஸ் இடையேயான வித்தியாசம் என்ன?',
      a: 'தேர்ட் பார்ட்டி இன்சூரன்ஸ் இந்தியாவில் சட்டப்படி கட்டாயமாகும்; இது விபத்தில் மூன்றாம் தரப்பினருக்கு ஏற்படும் சேதங்கள், மரணம் அல்லது காயங்களை மட்டுமே உள்ளடக்கும். விரிவான (Comprehensive) இன்சூரன்ஸ் என்பது மூன்றாம் தரப்பு பொறுப்புகள் மற்றும் உங்கள் சொந்த வாகனத்திற்கு ஏற்படும் விபத்துச் சேதங்கள், இயற்கை சீற்றங்கள், தீ மற்றும் திருட்டு ஆகியவற்றிற்கும் பாதுகாப்பு வழங்கும்.'
    },
    'Can I transfer my No Claim Bonus (NCB) from my previous insurance company?': {
      q: 'எனது முந்தைய இன்சூரன்ஸ் நிறுவனத்திடமிருந்து நோ கிளைம் போனஸை (NCB) மாற்ற முடியுமா?',
      a: 'ஆம், கண்டிப்பாக! முந்தைய பாலிசி காலாவதியாகி 90 நாட்களுக்குள் புதிய பாலிசி எடுத்தால், உங்கள் நோ கிளைம் போனஸை (20% முதல் 50% வரை) புதிய நிறுவனத்திற்கு எளிதாக மாற்றிக் கொள்ளலாம். இதற்கு முந்தைய பாலிசி நகல் மட்டுமே போதுமானது.'
    },
    'How do I file an insurance claim in case of an accident?': {
      q: 'விபத்து ஏற்பட்டால் நான் எவ்வாறு இன்சூரன்ஸ் கிளைம் செய்வது?',
      a: 'விபத்து ஏற்பட்டால் உடனடியாக எங்களை 7373723019 என்ற எண்ணில் தொடர்பு கொள்ளுங்கள். நாங்கள் உங்களுக்கு வழிகாட்டி, கேஷ்லெஸ் பழுதுபார்ப்பிற்கான நெட்வொர்க் கேரேஜை கண்டறிந்து, காப்பீட்டு நிறுவனத்தில் கிளைம் செய்ய தேவையான அனைத்து உதவிகளையும் செய்வோம்.'
    },
    'What is a Zero-Depreciation cover?': {
      q: 'ஜீரோ-டெப்ரிசியேஷன் (Zero-Depreciation) கவரேஜ் என்றால் என்ன?',
      a: 'ஜீரோ-டெப்ரிசியேஷன் அல்லது நில்-டெப்ரிசியேஷன் என்பது மோட்டார் இன்சூரன்ஸில் ஒரு கூடுதல் கவரேஜ் ஆகும். கிளைம் செய்யும் போது கண்ணாடி, பிளாஸ்டிக், நைலான் மற்றும் ரப்பர் போன்ற பாகங்களின் தேய்மான மதிப்பைக் கழிக்காமல், பாலிசி தொகையை முழுமையாகப் பெற இது உதவும்.'
    },
    'Do you offer cashless garage facilities in Nagercoil?': {
      q: 'நாகர்கோவிலில் கேஷ்லெஸ் கேரேஜ் வசதி உள்ளதா?',
      a: 'ஆம்! நாங்கள் ஒப்பிட்டு வழங்கும் அனைத்து முன்னணி காப்பீட்டு நிறுவனங்களும் நாகர்கோவிலில் உள்ள பெரும்பாலான அங்கீகரிக்கப்பட்ட கார் மற்றும் பைக் சர்வீஸ் சென்டர்களில் கேஷ்லெஸ் (பணம் செலுத்த தேவையில்லாத) நெட்வொர்க் கேரேஜ் வசதியை வழங்குகின்றன.'
    },
    'What happens if my vehicle insurance policy has already expired?': {
      q: 'எனது வாகன இன்சூரன்ஸ் பாலிசி ஏற்கனவே காலாவதியாகிவிட்டால் என்ன செய்வது?',
      a: 'உங்கள் பாலிசி காலாவதியாகிவிட்டாலும் கவலைப்பட வேண்டாம். எங்களை தொடர்பு கொள்ளுங்கள்; சில நிறுவனங்களில் வாகன ஆய்வு (Inspection) தேவையின்றி உடனடியாக காப்பீடு பெற்றுத்தர முடியும், அல்லது எங்களது ஆலோசகர்கள் விரைவாக வாகன ஆய்வை முடித்து வெறும் 10 நிமிடங்களில் பாலிசியை புதுப்பித்து தருவார்கள்.'
    },
    'Is physical paperwork required to get a policy issued?': {
      q: 'பாலிசி பெற நேரில் வர வேண்டுமா அல்லது ஆவணங்களை நேரில் சமர்ப்பிக்க வேண்டுமா?',
      a: 'தேவையில்லை. எங்கள் செயல்முறை 100% காகிதமில்லாத டிஜிட்டல் செயல்முறையாகும். உங்கள் RC மற்றும் முந்தைய பாலிசி நகலை வாட்ஸ்அப்பில் அனுப்பினால் போதும். நாங்கள் பாலிசியை ஆன்லைனில் போட்டு, அதன் அசல் PDF கோப்பை உங்கள் வாட்ஸ்அப்பிற்கே அனுப்பி வைப்போம்.'
    },
    'How do I pay the premium amount for my policy?': {
      q: 'பாலிசி பிரீமியம் தொகையை நான் எவ்வாறு செலுத்துவது?',
      a: 'பிரீமியம் தொகையை காப்பீட்டு நிறுவனத்தின் அதிகாரப்பூர்வ பாதுகாப்பான இணையதளம் மூலமாகவே நேரடியாக செலுத்தலாம். UPI (GPay, PhonePe, Paytm), நெட் பேங்கிங், கிரெடிட் கார்டு அல்லது டெபிட் கார்டு மூலம் பாதுகாப்பாக செலுத்தலாம்.'
    },
    'Do you charge any extra fee or brokerage for comparing and issuing policies?': {
      q: 'பாலிசிகளை ஒப்பிடுவதற்கும் வழங்குவதற்கும் நீங்கள் ஏدهனும் கூடுதல் கட்டணம் அல்லது கமிஷன் வசூலிக்கிறீர்களா?',
      a: 'இல்லை, பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்டின் சேவைகள் வாடிக்கையாளர்களுக்கு 100% முற்றிலும் இலவசம். நீங்கள் காப்பீட்டு நிறுவனம் நிர்ணயிக்கும் அசல் பிரீமியம் தொகையை மட்டுமே செலுத்துவீர்கள். எங்களிடம் எந்த மறைமுக கட்டணமும் இல்லை.'
    },
    'What is the price range for bike and car insurance?': {
      q: 'பைக் மற்றும் கார் இன்சூரன்ஸ் கட்டண வரம்பு என்ன?',
      a: 'பாலிசி கட்டணம் என்பது உங்கள் வாகனத்தின் மாடல், சிசி (CC), பதிவு செய்த ஆண்டு மற்றும் நீங்கள் தேர்ந்தெடுக்கும் கவரேஜை பொறுத்தது. பைக் இன்சூரன்ஸ் குறைந்தபட்சம் ₹714* முதலும், கார் இன்சூரன்ஸ் ₹2,094* முதலும் தொடங்குகிறது.'
    },
    'How can I check the status of my active policy or download it later?': {
      q: 'எனது பாலிசி நிலையை எவ்வாறு சரிபார்ப்பது அல்லது பின்னர் பதிவிறக்கம் செய்வது எப்படி?',
      a: 'எங்களை எப்போது வேண்டுமானாலும் தொடர்பு கொண்டு உங்கள் பாலிசி நகலை பெற்றுக்கொள்ளலாம். அல்லது காப்பீட்டு நிறுவனத்தின் போர்ட்டல் அல்லது அரசாங்கத்தின் "mParivahan" மற்றும் "DigiLocker" செயலிகளில் உங்கள் வாகன எண்ணைப் பதிவிட்டு எப்போது வேண்டுமானாலும் பதிவிறக்கம் செய்யலாம்.'
    },
    'Do you assist with Health and Life insurance policy selections?': {
      q: 'ஆரோக்கியம் மற்றும் ஆயுள் காப்பீட்டு திட்டங்களைத் தேர்வு செய்ய உதவுகிறீர்களா?',
      a: 'ஆம், நாங்கள் மோட்டார் இன்சூரன்ஸ் மட்டுமின்றி ஆரோக்கிய காப்பீடு (Health Insurance) மற்றும் ஆயுள் காப்பீடு (Life Insurance) திட்டங்களையும் ஒப்பிட்டு, உங்கள் குடும்பத்தின் தேவைக்கேற்ற சிறந்த திட்டங்களை தேர்வு செய்ய இலவச ஆலோசனை வழங்குகிறோம்.'
    },
    'Can I cancel a policy after purchasing it?': {
      q: 'பாலிசி வாங்கிய பிறகு அதை ரத்து செய்ய முடியுமா?',
      a: 'ஆம், காப்பீட்டு நிறுவனங்களின் விதிமுறைகளின்படி, பாலிசி வாங்கிய 14 நாட்களுக்குள் (Free-look period) அல்லது வேறு நிறுவனத்தில் பாலிசி எடுத்ததற்கான ஆதாரம் சமர்ப்பித்தால் பாலிசியை ரத்து செய்து பணத்தை திரும்பப் பெறலாம்.'
    },
    'Where is your office located? Can I visit in person?': {
      q: 'உங்கள் அலுவலகம் எங்கு உள்ளது? நான் நேரில் வர முடியுமா?',
      a: 'ஆம், நீங்கள் தாராளமாக வரலாம்! எங்களது அலுவலகம் நாகர்கோவில் வடசேரி, கிருஷ்ணன்கோவில், அரசு போக்குவரத்து கழக பணிமனை அருகில், ஆராட்டு ரோடு எண் 72/132-ல் அமைந்துள்ளது.'
    }
  };

  // Find exact or closest matching key
  const matchKey = Object.keys(mapping).find(
    k => k === faq.question || faq.question.toLowerCase().includes(k.substring(0, 15).toLowerCase())
  );

  if (matchKey) {
    return {
      ...faq,
      question: mapping[matchKey].q,
      answer: mapping[matchKey].a
    };
  }

  return faq;
};

export default async function FAQPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = getTranslation(lang);

  let faqs = FALLBACK_FAQS;

  try {
    const dbFaqs = await prisma.fAQ.findMany({
      where: { active: true },
      orderBy: { id: 'asc' },
    });
    if (dbFaqs.length > 0) {
      faqs = dbFaqs.map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
        category: f.category,
      }));
    }
  } catch (error) {
    console.error('Database fetch error in FAQ page:', error);
  }

  const translatedFaqs = faqs.map((f) => translateFaq(f, lang));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': translatedFaqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 space-y-16 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AnimatedReveal className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">{t.faqSection.tag}</h1>
        <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.faqSection.title}
        </p>
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
          {t.faqSection.description}
        </p>
      </AnimatedReveal>

      {/* Accordion Component */}
      <AnimatedReveal direction="up" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft glass-card">
        <Accordion items={translatedFaqs} />
      </AnimatedReveal>
    </div>
  );
}
