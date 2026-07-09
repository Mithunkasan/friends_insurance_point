import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';
import TestimonialCarousel from './TestimonialCarousel';

type Translation = ReturnType<typeof getTranslation>;

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
}

interface TestimonialsSectionProps {
  lang: string;
  testimonials: Testimonial[];
  t: Pick<Translation, 'testimonials'>;
}

export default function TestimonialsSection({ lang, testimonials, t }: TestimonialsSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AnimatedReveal className="text-center space-y-4 mb-12">
        <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">
          {t.testimonials.tag}
        </h2>
        <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.testimonials.title}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto">
          {t.testimonials.description}
        </p>
      </AnimatedReveal>

      <TestimonialCarousel testimonials={testimonials} lang={lang} />
    </section>
  );
}
