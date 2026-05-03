import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const baseUrl = 'https://starling.jerkeyray.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/why-starling`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  const docsRoutes: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: page.url === '/docs' ? 0.95 : 0.8,
  }));

  return [...staticRoutes, ...docsRoutes];
}
