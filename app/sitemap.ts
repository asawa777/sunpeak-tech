import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.sunpeak.tech'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/news-resources',
    '/careers',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/professional-services',
    '/innovation-rnd',
    '/industries'
  ]
  
  // Extract dynamic routes from config if needed, or hardcode known high-level dynamic paths
  // For a static export-friendly sitemap without DB, we map known structures.
  // Ideally, we'd fetch all dynamic slugs here. For now, we'll map the main navigation structure.

  const navRoutes = siteConfig.mainNav.flatMap((nav: any) => {
     if (!nav.items) return [nav.href]
     return [nav.href, ...nav.items.flatMap((item: any) => {
        // Handle deep nesting for solutions
        if (item.items) {
            return [item.href, ...item.items.map((sub: any) => sub.href)]
        }
        return [item.href]
     })]
  })

  // Deduplicate
  const allRoutes = Array.from(new Set([...routes, ...navRoutes])).filter(r => r.startsWith('/'))

  const entries: MetadataRoute.Sitemap = []

  allRoutes.forEach(route => {
     // Add English
     entries.push({
        url: `${baseUrl}/en${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8
     })
     // Add Thai
     entries.push({
        url: `${baseUrl}/th${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8
     })
  })

  return entries
}
