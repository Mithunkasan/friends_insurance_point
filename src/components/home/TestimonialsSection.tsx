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
  const isTa = lang === 'ta';
  const sectionTag = isTa ? 'எங்கள் வாடிக்கையாளர்கள் கூறுவது' : 'WHAT OUR CUSTOMERS SAY';
  const sectionTitle = isTa ? '1000+ மகிழ்ச்சியான வாடிக்கையாளர்களால் நம்பப்படுகிறது' : 'Trusted By 1000+ Happy Customers';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-colors duration-300">
      <AnimatedReveal className="text-center space-y-2 mb-12">
        <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
          {sectionTag}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {sectionTitle}
        </h2>
      </AnimatedReveal>

      <TestimonialCarousel testimonials={testimonials} lang={lang} />
    </section>
  );
}
