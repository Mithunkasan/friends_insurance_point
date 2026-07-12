import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Friends Insurance Point | Vehicle Insurance in 10 Minutes | Nagercoil',
    template: '%s | Friends Insurance Point',
  },
  description:
    'Compare plans and get car, bike, and commercial vehicle insurance in just 10 minutes at Friends Insurance Point, Nagercoil. Authorized agency offering best premiums and claims assistance.',
  keywords: [
    'Bike Insurance in Nagercoil',
    'Car Insurance in Nagercoil',
    'Vehicle Insurance Near Me',
    'Insurance Agency in Nagercoil',
    'Health Insurance Nagercoil',
    'Life Insurance Nagercoil',
    'Insurance Renewal',
    '10 Minute Insurance',
    'Vadasery',
    'Tamil Nadu',
  ],
  authors: [{ name: 'Friends Insurance Point' }],
  creator: 'Friends Insurance Point',
  publisher: 'Friends Insurance Point',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'Friends Insurance Point | Vehicle Insurance in 10 Minutes',
    description:
      'Compare plans and get car, bike, and commercial vehicle insurance in just 10 minutes at Friends Insurance Point, Nagercoil.',
    siteName: 'Friends Insurance Point',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Friends Insurance Point | Vehicle Insurance in 10 Minutes',
    description:
      'Compare plans and get car, bike, and commercial vehicle insurance in just 10 minutes at Friends Insurance Point, Nagercoil.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';

  // Local Business & Organization JSON-LD Schemas
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'http://localhost:3000/#organization',
        'name': 'Friends Insurance Point',
        'url': 'http://localhost:3000',
        'logo': {
          '@type': 'ImageObject',
          '@id': 'http://localhost:3000/#logo',
          'url': 'http://localhost:3000/logo.png',
          'caption': 'Friends Insurance Point Logo',
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+91-7598657990',
          'contactType': 'sales and support',
          'areaServed': 'IN',
          'availableLanguage': ['English', 'Tamil'],
        },
      },
      {
        '@type': 'InsuranceAgency',
        '@id': 'http://localhost:3000/#localbusiness',
        'name': 'Friends Insurance Point',
        'image': 'http://localhost:3000/logo.png',
        'url': 'http://localhost:3000',
        'telephone': '7598657990',
        'priceRange': '$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '72/132, Arattu Road, Krishnancoil, Vadasery',
          'addressLocality': 'Nagercoil',
          'addressRegion': 'Tamil Nadu',
          'postalCode': '629001',
          'addressCountry': 'IN',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '8.1882',
          'longitude': '77.4294',
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '09:00',
            'closes': '20:30',
          },
        ],
        'sameAs': [
          'https://wa.me/917598657990',
        ],
      },
    ],
  };

  return (
    <html lang={lang} className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-primary-blue-light selection:text-primary-blue transition-colors duration-300">
        <Navbar lang={lang} />
        <main className="flex-grow dark:bg-slate-950">{children}</main>
        <Footer lang={lang} />
        <WhatsAppButton lang={lang} />
      </body>
    </html>
  );
}
