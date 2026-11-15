import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://moneyviora.com';
  const now = new Date();

  const routes = [
    { url: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { url: '/home-loan', changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: '/compare', changeFrequency: 'daily' as const, priority: 0.9 },
    { url: '/calculators', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/affordability', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/projects', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/instant-sanction', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/branches', changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: '/forms', changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: '/variants/balance-transfer', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/contact', changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
