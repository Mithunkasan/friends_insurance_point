import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import Accordion from '@/components/ui/Accordion';
import { getTranslation } from '@/locales/translate';

type Translation = ReturnType<typeof getTranslation>;

export interface HomeFaq {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FaqSectionProps {
  faqs: HomeFaq[];
  t: Pick<Translation, 'faqSection'>;
}

export default function FaqSection({ faqs, t }: FaqSectionProps) {
  return (
    <section className="bg-slate-50/50 dark:bg-slate-900/5 py-20 border-y border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedReveal className="text-center space-y-4 mb-16">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">
            {t.faqSection.tag}
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.faqSection.title}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto">
            {t.faqSection.description}
          </p>
        </AnimatedReveal>

        <AnimatedReveal direction="up">
          <Accordion items={faqs} />
        </AnimatedReveal>

        <div className="text-center mt-12">
          <Link
            href="/faq"
            className="inline-flex items-center text-sm font-bold text-primary-blue dark:text-primary-blue-light hover:text-primary-blue-hover"
          >
            {t.faqSection.viewAll}
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
