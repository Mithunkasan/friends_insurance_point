import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const routes = [
    '',
    '/about',
    '/services',
    '/partners',
    '/faq',
    '/contact',
    '/quote',
    '/privacy-policy',
    '/terms-and-conditions',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const services = [
    'bike-insurance',
    'car-insurance',
    'auto-insurance',
    'bus-insurance',
    'heavy-vehicle-insurance',
    'life-insurance',
    'health-insurance',
    'travel-insurance',
    'accident-insurance',
    'opd-insurance',
    'fire-insurance',
    'group-mediclaim-insurance',
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...services];
}
