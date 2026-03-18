import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://dietaintegral.fit';

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE_URL}/articulos`,  lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${BASE_URL}/servicios`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/sobre-mi`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/planes`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/contacto`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articleRoutes: MetadataRoute.Sitemap = [];
  let categoryRoutes: MetadataRoute.Sitemap = [];

  try {
    const articles = await prisma.article.findMany({
      where: { status: 'published' },
      select: { slug: true, publicationDate: true },
      orderBy: { publicationDate: 'desc' },
    });

    articleRoutes = articles.map((a) => ({
      url: `${BASE_URL}/articulos/${a.slug}`,
      lastModified: a.publicationDate ? new Date(String(a.publicationDate)) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const categories = await prisma.category.findMany({
      select: { slug: true },
    });

    categoryRoutes = categories.map((c) => ({
      url: `${BASE_URL}/articulos/categoria/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch {
    // Si la DB no está disponible, devuelve solo rutas estáticas
  }

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes];
}
