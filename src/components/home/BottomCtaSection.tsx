import Link from 'next/link';
import { Phone } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

type Translation = ReturnType<typeof getTranslation>;

interface BottomCtaSectionProps {
  t: Pick<Translation, 'bottomCta' | 'common'>;
}

export default function BottomCtaSection({ t }: BottomCtaSectionProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
      <AnimatedReveal
        direction="up"
        className="relative rounded-3xl bg-gradient-to-r from-primary-blue to-primary-blue-hover text-white p-8 sm:p-12 overflow-hidden shadow-xl text-center space-y-6"
      >
        <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-white/5 rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 bg-primary-green/20 rounded-full blur-xl" />

        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {t.bottomCta.title}
        </h3>
        <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed font-bold">
          {t.bottomCta.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/quote"
            className="flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-white text-primary-blue hover:bg-slate-50 text-sm font-bold rounded-xl transition-all shadow-md"
          >
            {t.common.getQuote}
          </Link>
          <a
            href="tel:7598657990"
            className="flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-primary-green hover:bg-primary-green-hover text-white text-sm font-bold rounded-xl transition-all shadow-md"
          >
            <Phone className="w-4.5 h-4.5 mr-2" />
            {t.common.callNow} (7598657990)
          </a>
        </div>
      </AnimatedReveal>
    </section>
  );
}
