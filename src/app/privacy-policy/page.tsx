import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

export const metadata: Metadata = {
  title: 'Privacy Policy | Friends Insurance Point',
  description: 'Read the privacy policy of Friends Insurance Point. Learn how we handle and protect your personal and vehicle details.',
};

export default async function PrivacyPolicyPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';

  const isTa = lang === 'ta';

  return (
    <div className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 space-y-8 bg-white dark:bg-slate-950 text-slate-650 dark:text-slate-350 transition-colors duration-300">
      <AnimatedReveal className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isTa ? 'தனியுரிமைக் கொள்கை (Privacy Policy)' : 'Privacy Policy'}
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
          {isTa ? 'கடைசியாக புதுப்பிக்கப்பட்டது: ஜூலை 08, 2026' : 'Last Updated: July 08, 2026'}
        </p>
      </AnimatedReveal>

      <AnimatedReveal delay={0.1} className="space-y-6 text-sm sm:text-base leading-relaxed font-semibold">
        <p>
          {isTa 
            ? 'பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்டில், எங்களது முக்கிய முன்னுரிமைகளில் ஒன்று எங்களது பார்வையாளர்களின் தனியுரிமை ஆகும். இந்தத் தனியுரிமைக் கொள்கை ஆவணம் பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்டால் சேகரிக்கப்படும் மற்றும் பதிவு செய்யப்படும் தகவல்களின் வகைகளையும், அதை நாங்கள் எவ்வாறு பயன்படுத்துகிறோம் என்பதையும் கொண்டுள்ளது.'
            : 'At Friends Insurance Point, accessible from our website and office in Nagercoil, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Friends Insurance Point and how we use it.'}
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '1. நாங்கள் சேகரிக்கும் தகவல்கள்' : '1. Information We Collect'}
        </h3>
        <p>
          {isTa 
            ? 'நீங்கள் இன்சூரன்ஸ் கட்டண ஒப்பீடு கோரும்போது அல்லது எங்களை அணுகும்போது, பாலிசி தயாரிக்க தேவையான பின்வரும் தகவல்களை நாங்கள் சேகரிக்கிறோம்:'
            : 'When you request an insurance quote or send an enquiry (either via our website forms, email, phone, or WhatsApp), we collect information necessary to compute and issue your policy, including:'}
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{isTa ? 'தனிப்பட்ட விவரங்கள்: பெயர், தொலைபேசி எண், மின்னஞ்சல் முகவரி.' : 'Personal details: Name, phone number, email address.'}</li>
          <li>{isTa ? 'வாகன விவரங்கள்: பதிவுச் சான்றிதழ் (RC) நகல், வாகன தயாரிப்பு / மாடல், பதிவு செய்த ஆண்டு, என்ஜின் எண், சேசிஸ் எண்.' : 'Vehicle details: Registration Certificate (RC) copy, vehicle make/model, registration year, engine number, chassis number.'}</li>
          <li>{isTa ? 'முந்தைய பாலிசி விவரங்கள்: முந்தைய பாலிசி நகல், விபத்து கிளைம் வரலாறு, நோ கிளைம் போனஸ் (NCB) விவரங்கள்.' : 'Previous policy details: Expiry date, previous claim history, No Claim Bonus (NCB) data.'}</li>
        </ul>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '2. உங்கள் தகவலை நாங்கள் எவ்வாறு பயன்படுத்துகிறோம்' : '2. How We Use Your Information'}
        </h3>
        <p>{isTa ? 'சேகரிக்கப்பட்ட தகவலை பின்வரும் வழிகளில் பயன்படுத்துகிறோம்:' : 'We use the collected information in the following ways:'}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{isTa ? 'உங்களுக்கு மிகக் குறைந்த விலையைக் கண்டறிய எங்களது கூட்டாளர் காப்பீட்டு நிறுவனங்கள் மூலம் பிரீமியங்களை ஒப்பிட.' : 'To compare premiums across our partner insurance companies (e.g., TATA AIG, United India, National Insurance, etc.) to get you the best price.'}</li>
          <li>{isTa ? '10 நிமிடங்களுக்குள் உங்களது அசல் இன்சூரன்ஸ் பாலிசி நகலைத் தயாரிக்க.' : 'To compile and generate your insurance policy document within 10 minutes.'}</li>
          <li>{isTa ? 'பாலிசி புதுப்பித்தல் நினைவூட்டல், கிளைம் உதவி மற்றும் பாலிசி அப்டேட்டுகளுக்கு உங்களைத் தொடர்பு கொள்ள.' : 'To contact you regarding renewal reminders, claims filing assistance, and policy updates.'}</li>
          <li>{isTa ? 'மோசடி கிளைம்கள் அல்லது தவறான உள்ளீடுகளைத் தவிர்க்க.' : 'To prevent fraudulent claims or inputs.'}</li>
        </ul>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '3. தரவுப் பாதுகாப்பு' : '3. Data Security'}
        </h3>
        <p>
          {isTa 
            ? 'உங்கள் தனிப்பட்ட விவரங்கள் மற்றும் வாகன ஆவணங்களைப் பாதுகாக்க தொழில்துறை தர பாதுகாப்பு நடவடிக்கைகளை நாங்கள் செயல்படுத்துகிறோம். உங்களது தகவல்களை எந்தவொரு மூன்றாம் தரப்பு விளம்பர நிறுவனங்களுக்கும் நாங்கள் விற்கவோ அல்லது பகிரவோ மாட்டோம். பாலிசி போடுவதற்காக மட்டுமே அதிகாரப்பூர்வ நிறுவனங்களுடன் விவரங்கள் பகிரப்படும்.'
            : 'We implement industry-standard security measures to safeguard your personal details and vehicle documents. We do not sell, rent, or trade your personal information to third-party marketing companies. Your details are shared solely with authorized insurance companies for the explicit purpose of generating your policy copy.'}
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '4. எங்களைத் தொடர்பு கொள்ள' : '4. Contact Us'}
        </h3>
        <p>
          {isTa 
            ? 'எங்கள் தனியுரிமைக் கொள்கை பற்றி கூடுதல் கேள்விகள் இருந்தால், எங்களது அலுவலகத்தை நேரில் அல்லது 7373723019 என்ற எண்ணில் தொடர்பு கொள்ளவும்.'
            : 'If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at our office or call us at 7373723019.'}
        </p>
      </AnimatedReveal>
    </div>
  );
}
