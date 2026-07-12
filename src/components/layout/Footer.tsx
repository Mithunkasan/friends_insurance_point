import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import { getTranslation } from '@/locales/translate';

interface FooterProps {
  lang?: string;
}

export default function Footer({ lang = 'en' }: FooterProps) {
  const t = getTranslation(lang);

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 dark:border-slate-900 transition-colors duration-300">
      {/* Top Footer Widgets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Promise */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white flex items-center justify-center border border-slate-800 shadow-xs shrink-0">
                <Image
                  src="/logo.png"
                  alt="Friends Insurance Point logo"
                  width={38}
                  height={38}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">
                  Friends <span className="text-primary-green">Insurance</span>
                </span>
                <span className="text-[10px] font-bold text-primary-blue uppercase tracking-widest mt-0.5">
                  Point
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">
              {t.about.visitDesc}
            </p>
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450">Our Promises:</h4>
              <ul className="text-xs space-y-1.5 text-slate-400 font-bold">
                <li className="flex items-center">
                  <span className="text-primary-green mr-2">✔</span> {t.hero.bullets.instant}
                </li>
                <li className="flex items-center">
                  <span className="text-primary-green mr-2">✔</span> {t.hero.bullets.compare}
                </li>
                <li className="flex items-center">
                  <span className="text-primary-green mr-2">✔</span> {t.hero.bullets.claim}
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-base tracking-wide border-l-4 border-primary-green pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3.5 text-sm font-bold">
              <li>
                <Link href="/about" className="hover:text-white hover:translate-x-1 transition-all flex items-center">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 text-primary-green" />
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white hover:translate-x-1 transition-all flex items-center">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 text-primary-green" />
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-white hover:translate-x-1 transition-all flex items-center">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 text-primary-green" />
                  {t.nav.partners}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white hover:translate-x-1 transition-all flex items-center">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 text-primary-green" />
                  {t.nav.faq}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all flex items-center">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 text-primary-green" />
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-white hover:translate-x-1 transition-all flex items-center text-primary-green font-extrabold">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 text-primary-green animate-pulse" />
                  {t.nav.getQuote}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Reach Us */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-base tracking-wide border-l-4 border-primary-blue pl-3">
              Reach Us
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-400 font-bold">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary-blue shrink-0 mt-0.5" />
                <span className="leading-relaxed font-semibold">
                  72/132, Arattu Road, <br />
                  Krishnancoil, Vadasery, <br />
                  Nagercoil – 629001, Tamil Nadu.
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary-green shrink-0" />
                <a href="tel:7598657990" className="hover:text-white transition-colors font-bold text-base text-slate-350">
                  7598657990
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary-blue shrink-0" />
                <a href="mailto:info@friendsinsurancepoint.com" className="hover:text-white transition-colors text-slate-350">
                  info@friendsinsurancepoint.com
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-primary-blue shrink-0 mt-0.5" />
                <span className="font-semibold">
                  {t.about.visitHours}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Location Map */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-base tracking-wide border-l-4 border-primary-green pl-3">
              Our Location
            </h3>
            <div className="w-full h-40 rounded-xl overflow-hidden shadow-md border border-slate-800 bg-slate-950 relative">
              <iframe
                title="Friends Insurance Point Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.5772412852233!2d77.4282421!3d8.1965193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f141d2d9b7fd%3A0x814b2bf59ec75b42!2sJP+PAINTS!5e0!3m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a
              href="https://wa.me/917598657990"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition-all shadow-md transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {t.common.whatsappChat}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Links */}
      <div className="border-t border-slate-850 dark:border-slate-900 bg-slate-950 py-6 text-xs text-slate-500 font-bold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Friends Insurance Point. All Rights Reserved. Designed for premium trust.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-350 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-350 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/disclaimer" className="hover:text-slate-350 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
