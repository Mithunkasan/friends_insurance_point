import Image from 'next/image';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

type Translation = ReturnType<typeof getTranslation>;

export interface Partner {
  name: string;
}

interface PartnersSectionProps {
  partners: Partner[];
  t: Pick<Translation, 'partners'>;
}

const PARTNER_IMAGES = [
  { src: '/image1.png', alt: 'Insurance Partner 1' },
  { src: '/image2.png', alt: 'Insurance Partner 2' },
  { src: '/image3.png', alt: 'Insurance Partner 3' },
  { src: '/image4.png', alt: 'Insurance Partner 4' },
  { src: '/image5.png', alt: 'Insurance Partner 5' },
  { src: '/image6.png', alt: 'Insurance Partner 6' },
  { src: '/image7.png', alt: 'Insurance Partner 7' },
  { src: '/image8.png', alt: 'Insurance Partner 8' },
];

export default function PartnersSection({ partners, t }: PartnersSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AnimatedReveal className="text-center space-y-4 mb-12">
        <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">
          {t.partners.tag}
        </h2>
        <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.partners.title}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto">
          {t.partners.description}
        </p>
      </AnimatedReveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {PARTNER_IMAGES.map((img, index) => (
          <AnimatedReveal
            key={img.src}
            direction="up"
            delay={0.05 * index}
            className="relative w-full h-28 bg-white border border-slate-100 rounded-2xl shadow-xs hover:shadow-soft hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-3"
          >
            <div className="relative w-full h-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-contain"
                priority={index < 4}
              />
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
