import { MetadataRoute } from 'next'
import { getAllArticles } from '@/data/articles'

function formatUrl(path: string): string {
  const baseUrl = 'https://dietaintegral.com'
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/+/g, '/')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Obtener todos los artículos
  const articles = await getAllArticles()
  const articleUrls = articles.map((article) => ({
    url: formatUrl(`/articulos/${article.slug}`),
    lastModified: new Date(),
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))

  // Rutas estáticas principales
  const mainRoutes = [
    {
      url: formatUrl('/'),
      lastModified: new Date(),
      changefreq: 'daily' as const,
      priority: 1,
    },
    {
      url: formatUrl('/articulos'),
      lastModified: new Date(),
      changefreq: 'daily' as const,
      priority: 0.9,
    },
    {
      url: formatUrl('/acerca-de'),
      lastModified: new Date(),
      changefreq: 'monthly' as const,
      priority: 0.7,
    },
  ]

  return [...mainRoutes, ...articleUrls]
}
