import AnimatedReveal from '@/components/shared/AnimatedReveal';
import { getTranslation } from '@/locales/translate';

type Translation = ReturnType<typeof getTranslation>;

interface ProcessSectionProps {
  t: Pick<Translation, 'process'>;
}

export default function ProcessSection({ t }: ProcessSectionProps) {
  return (
    <section className="bg-slate-900 dark:bg-slate-950 text-white py-20 border-y border-slate-955 dark:border-slate-900 overflow-hidden relative transition-colors duration-300">
      <div className="absolute top-0 left-1/4 -z-10 w-80 h-80 rounded-full bg-primary-blue/10 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedReveal className="text-center space-y-4 mb-16">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary-green">
            {t.process.tag}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t.process.title}</p>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-semibold">
            {t.process.description}
          </p>
        </AnimatedReveal>

        <div className="relative">
          <div className="hidden lg:block absolute top-[52px] left-8 right-8 h-0.5 bg-slate-800 dark:bg-slate-900" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {t.process.steps.map((item, index) => (
              <AnimatedReveal
                key={item.step}
                direction="up"
                delay={0.1 * index}
                className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-blue to-primary-blue-hover text-white font-extrabold text-base shadow-md border border-slate-700 dark:border-slate-800 relative">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
