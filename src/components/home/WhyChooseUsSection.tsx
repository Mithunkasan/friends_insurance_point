import { Award, Clock, ShieldCheck } from 'lucide-react';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

type Translation = ReturnType<typeof getTranslation>;

interface WhyChooseUsSectionProps {
  t: Pick<Translation, 'whyChooseUs'>;
}

export default function WhyChooseUsSection({ t }: WhyChooseUsSectionProps) {
  const iconsMap = [
    <Clock key="1" className="w-5 h-5" />,
    <Award key="2" className="w-5 h-5" />,
    <ShieldCheck key="3" className="w-5 h-5" />,
  ];

  return (
    <section className="bg-slate-50/50 dark:bg-slate-900/10 py-20 border-y border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <AnimatedReveal className="space-y-4">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary-blue dark:text-primary-blue-light">
                {t.whyChooseUs.tag}
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {t.whyChooseUs.title}
              </p>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                {t.whyChooseUs.description}
              </p>
            </AnimatedReveal>

            <div className="space-y-4 pt-4">
              {t.whyChooseUs.items.map((item, index) => (
                <AnimatedReveal key={index} direction="left" delay={0.1 * index} className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-primary-blue dark:text-primary-blue-light shrink-0 shadow-xs">
                    {iconsMap[index] || <ShieldCheck className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">{item.desc}</p>
                  </div>
                </AnimatedReveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.whyChooseUs.grid.map((card, index) => (
              <AnimatedReveal
                key={index}
                direction="up"
                delay={0.15 * index}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-soft border border-slate-100/50 dark:border-slate-800/40 hover:border-primary-green/30 dark:hover:border-primary-green/30 transition-all duration-300"
              >
                <h4 className="text-base font-bold text-slate-800 dark:text-white mb-2 flex items-center">
                  <span className="w-1.5 h-6 rounded-full bg-primary-green mr-2.5 inline-block" />
                  {card.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-bold">{card.desc}</p>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
