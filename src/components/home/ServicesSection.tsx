import Link from 'next/link';
import type { ComponentType, SVGProps } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

type Translation = ReturnType<typeof getTranslation>;

export interface HomeService {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  benefits: string[];
}

interface ServicesSectionProps {
  services: HomeService[];
  t: Pick<Translation, 'homeServices' | 'common'>;
}

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const iconMap = Icons as unknown as Record<string, ComponentType<SVGProps<SVGSVGElement>>>;
  const LucideIcon = iconMap[name];
  if (!LucideIcon) return <Icons.Shield className={className} />;
  return <LucideIcon className={className} />;
}

export default function ServicesSection({ services, t }: ServicesSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AnimatedReveal className="text-center space-y-4 mb-16">
        <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">
          {t.homeServices.tag}
        </h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.homeServices.title}
        </p>
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-semibold">
          {t.homeServices.description}
        </p>
      </AnimatedReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <AnimatedReveal
            key={service.id}
            direction="up"
            delay={0.05 * (index % 3)}
            className="group relative flex flex-col items-center justify-between p-8 bg-white dark:bg-slate-900 rounded-[20px] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center w-full flex-grow">
              <div className="flex items-center justify-center w-20 h-20 mb-6">
                <ServiceIcon name={service.icon} className="w-16 h-16 text-primary-blue dark:text-primary-blue-light transition-transform duration-300 group-hover:scale-105" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {service.name}
              </h3>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-semibold max-w-[240px] mx-auto">
                {service.description}
              </p>
            </div>

            <div className="mt-4">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center text-sm font-bold text-primary-green hover:text-primary-green-hover transition-colors group/link"
              >
                {t.common.viewDetails}
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </AnimatedReveal>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/services"
          className="inline-flex items-center justify-center px-6 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-850 shadow-xs transition-colors"
        >
          {t.homeServices.viewAll}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </section>
  );
}
