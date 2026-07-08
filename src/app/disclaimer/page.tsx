import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

export const metadata: Metadata = {
  title: 'Disclaimer | Friends Insurance Point',
  description: 'Read the legal disclaimer of Friends Insurance Point. Clarifies underwriting terms and policy guarantees.',
};

export default async function DisclaimerPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';

  const isTa = lang === 'ta';

  return (
    <div className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 space-y-8 bg-white dark:bg-slate-950 text-slate-650 dark:text-slate-350 transition-colors duration-300">
      <AnimatedReveal className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isTa ? 'பொறுப்புத் துறப்பு (Disclaimer)' : 'Legal Disclaimer'}
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
          {isTa ? 'கடைசியாக புதுப்பிக்கப்பட்டது: ஜூலை 08, 2026' : 'Last Updated: July 08, 2026'}
        </p>
      </AnimatedReveal>

      <AnimatedReveal delay={0.1} className="space-y-6 text-sm sm:text-base leading-relaxed font-semibold">
        <p>
          {isTa 
            ? 'இந்த இணையதளத்தில் உள்ள தகவல்கள் பொதுவான தகவல் மற்றும் ஒப்பீட்டு நோக்கங்களுக்காக மட்டுமே வழங்கப்படுகின்றன.'
            : 'The information contained on this website is for general informational and comparison purposes only.'}
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '1. இடைத்தரகர் பங்கு மட்டுமே' : '1. Intermediary Role Only'}
        </h3>
        <p>
          {isTa 
            ? 'பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்ட் ஒரு காப்பீட்டு முகமையாக மட்டுமே செயல்படுகிறது. நாங்கள் பிரீமியங்களை ஒப்பிடவும், காப்பீட்டு நிறுவனங்களிடம் இருந்து பாலிசி எடுக்கவும் உதவுகிறோம். கிளைம்களை ஏற்பது அல்லது நிராகரிப்பது தொடர்பான முடிவுகள் சம்பந்தப்பட்ட இன்சூரன்ஸ் நிறுவனத்தால் மட்டுமே எடுக்கப்படும். கிளைம் நிராகரிப்பு அல்லது சர்ச்சைகளுக்கு பிரண்ட்ஸ் இன்சூரன்ஸ் பாயிண்ட் பொறுப்பல்ல.'
            : 'Friends Insurance Point operates as an insurance agency. We offer premium comparisons and help customers acquire policies from various general insurance companies. Underwriting, risk assumption, and claim settlement decisions are made solely by the respective insurance company. Friends Insurance Point is not responsible for claim rejections or disputes between the policyholder and the insurer.'}
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '2. பிரீமியம் மற்றும் கட்டண மதிப்பீடுகள்' : '2. Quotes and Premium Estimates'}
        </h3>
        <p>
          {isTa 
            ? 'இணையதளத்தில் காட்டப்படும் பிரீமியம் மதிப்பீடுகள் மற்றும் பலன்கள் அனைத்தும் காப்பீட்டு நிறுவனங்களின் விதிமுறைகளுக்கு உட்பட்டவை. முந்தைய கிளைம்கள், நோ கிளைம் போனஸ் (NCB) மாற்றம் அல்லது வாகன ஆய்வுகளின் அடிப்படையில் அசல் பாலிசி கட்டணங்கள் மாறுபடலாம்.'
            : 'Premium estimates, benefits, and coverage features displayed are subject to changes based on the final underwriting guidelines of the insurance company. The actual premium can vary depending on correct NCB transfer, previous claim history verification, or vehicle inspection results.'}
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '3. வெளி இணைப்புகள் & வரைபடங்கள்' : '3. External Links & Maps'}
        </h3>
        <p>
          {isTa 
            ? 'இணையதளத்தில் உள்ள வெளி இணைப்புகள் மற்றும் வரைபடங்கள் (Google Maps போன்றவை) வாடிக்கையாளரின் வசதிக்காக மட்டுமே வழங்கப்பட்டுள்ளன. அவற்றின் செயல்பாடுகள் அல்லது உள்ளடக்கங்களுக்கு நாங்கள் பொறுப்பல்ல.'
            : 'Any external links or embedded content (like Google Maps) are for customer convenience. We do not control or endorse the content, policies, or availability of these external services.'}
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-205 pt-4">
          {isTa ? '4. இணக்கத்தன்மை' : '4. Compliance'}
        </h3>
        <p>
          {isTa 
            ? 'காப்பீடு என்பது கோரிக்கையின் உட்பட்டது. பாலிசி வாங்குவதற்கு முன், விதிமுறைகள், நிபந்தனைகள் மற்றும் விலக்குகளைப் பற்றி சம்பந்தப்பட்ட நிறுவனத்தின் பாலிசி ஆவணங்களை கவனமாகப் படியுங்கள்.'
            : 'Insurance is the subject matter of solicitation. For detailed terms and conditions, exclusions, and limits, please read the specific policy prospectus and policy terms issued by the respective insurance company carefully before completing your purchase.'}
        </p>
      </AnimatedReveal>
    </div>
  );
}
