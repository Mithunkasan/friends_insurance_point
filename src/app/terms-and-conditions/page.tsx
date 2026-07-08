import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Friends Insurance Point',
  description: 'Read the terms and conditions of Friends Insurance Point. Understand policy booking rules and premium structures.',
};

export default async function TermsPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';

  const isTa = lang === 'ta';

  return (
    <div className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 space-y-8 bg-white dark:bg-slate-950 text-slate-650 dark:text-slate-350 transition-colors duration-300">
      <AnimatedReveal className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isTa ? 'விதிமுறைகள் மற்றும் நிபந்தனைகள் (Terms & Conditions)' : 'Terms & Conditions'}
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
          {isTa ? 'கடைசியாக புதுப்பிக்கப்பட்டது: ஜூலை 08, 2026' : 'Last Updated: July 08, 2026'}
        </p>
      </AnimatedReveal>

      <AnimatedReveal delay={0.1} className="space-y-6 text-sm sm:text-base leading-relaxed font-semibold">
        <p>
          {isTa 
            ? 'பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்டிற்கு உங்களை வரவேற்கிறோம். இந்த விதிமுறைகள் மற்றும் நிபந்தனைகள் எங்கள் இணையதளம் மற்றும் முகமை மூலமாக வழங்கப்படும் சேவைகளுக்கான விதிகள் மற்றும் நெறிமுறைகளை வரையறுக்கின்றன.'
            : 'Welcome to Friends Insurance Point. These terms and conditions outline the rules and regulations for the use of Friends Insurance Point\'s services, both online via our website and offline through our agency.'}
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '1. சேவையின் நோக்கம்' : '1. Scope of Service'}
        </h3>
        <p>
          {isTa 
            ? 'பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்ட் என்பது நாகர்கோவிலில் அமைந்துள்ள ஒரு அங்கீகரிக்கப்பட்ட காப்பீட்டு முகமையாகும். நாங்கள் ஒரு இடைத்தரகராக செயல்பட்டு, அங்கீகரிக்கப்பட்ட காப்பீட்டு நிறுவனங்களின் பிரீமியங்களை ஒப்பிட்டு பாலிசி எடுக்க உதவுகிறோம். நாங்கள் நேரடியாக காப்பீட்டுத் தொகையை வழங்குவதில்லை.'
            : 'Friends Insurance Point is an authorized insurance agency based in Nagercoil, India. We act as an intermediary, comparing premiums and facilitating policy booking across authorized general insurance providers. We do not underwrite insurance risk directly.'}
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '2. பிரீமியம் கணக்கீடு & கட்டணங்கள்' : '2. Premium Calculations & Quotes'}
        </h3>
        <p>
          {isTa 
            ? 'எங்கள் ஆலோசகர்களால் கணக்கிடப்படும் அனைத்து பிரீமியம் தொகைகளும், தள்ளுபடிகளும் IRDAI (இந்திய காப்பீட்டு ஒழுங்குமுறை மற்றும் வளர்ச்சி முகமை) மற்றும் காப்பீட்டு நிறுவனங்களின் விதிமுறைகளுக்கு உட்பட்டவை. வாகன ஆய்வு முடிவுகள் அல்லது முந்தைய கிளைம்களின் உண்மைத்தன்மையை பொறுத்து கட்டணங்கள் மாறலாம்.'
            : 'All premium amounts, discounts (own damage discounts), and add-on rates quoted by our advisors are calculated in accordance with the tariff guidelines of the participating insurance companies and IRDAI (Insurance Regulatory and Development Authority of India). Premiums are subject to changes based on vehicle inspection results or verification of previous policy claims.'}
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '3. வாடிக்கையாளர் தரவின் உண்மைத்தன்மை' : '3. Accuracy of Customer Data'}
        </h3>
        <p>
          {isTa 
            ? 'வாடிக்கையாளர்கள் சரியான வாகன ஆவணங்களையும் (RC மற்றும் முந்தைய பாலிசி நகல்) முந்தைய கிளைம் விவரங்களையும் உண்மையாக சமர்ப்பிக்க வேண்டும். தவறான தகவல்கள் சமர்ப்பிக்கப்பட்டால், காப்பீட்டு நிறுவனம் பாலிசியை ரத்து செய்யவோ அல்லது கிளைம்களை நிராகரிக்கவோ முழு அதிகாரம் கொண்டுள்ளது.'
            : 'Customers must supply authentic vehicle documents (Registration Certificate copy and previous policy copy) and declare accurate past claim details. If any information supplied is found to be false or inaccurate, the insurance company reserve the right to void the policy, reject claim payouts, or adjust the premium.'}
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '4. பாலிசி வழங்கும் கால அளவு' : '4. Policy Delivery Timeline'}
        </h3>
        <p>
          {isTa 
            ? 'நாங்கள் 10 நிமிடங்களில் பாலிசி வழங்குவதாக உறுதியளித்தாலும், நிறுவனங்களின் சர்வர் செயலிழப்பு, பணம் செலுத்தும் நுழைவாயில் (Payment Gateway) தாமதம் அல்லது வாகன ஆய்வு தேவைப்படும் பட்சத்தில் கால தாமதம் ஏற்படலாம். அவ்வாறான சூழ்நிலைகளில் நாங்கள் உங்களுக்குத் தெரியப்படுத்துவோம்.'
            : 'While we promise a policy copy within 10 minutes, certain situations such as network downtime on the insurance company server, payment gateway delays, or required physical/digital vehicle inspections for expired policies can delay the final issuance. We will keep you updated in such circumstances.'}
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '5. சட்டம் மற்றும் அதிகார வரம்பு' : '5. Contact and Governance'}
        </h3>
        <p>
          {isTa 
            ? 'இந்த விதிமுறைகள் இந்திய சட்டங்களுக்கு உட்பட்டவை. எங்களது சேவைகள் தொடர்பான ஏதேனும் சர்ச்சைகள் நாகர்கோவில், தமிழ்நாடு நீதிமன்றங்களின் பிரத்யேக அதிகார வரம்பிற்கு உட்பட்டது.'
            : 'These terms are governed by the laws of India. Any disputes arising out of services provided will be subject to the exclusive jurisdiction of the courts in Nagercoil, Tamil Nadu, India.'}
        </p>
      </AnimatedReveal>
    </div>
  );
}
