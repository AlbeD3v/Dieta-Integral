import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import ContentHub from './ContentHub';

export default async function ContentPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/iniciar-sesion');

  const [profile, categories, articles, bookmarks] = await Promise.all([
    prisma.healthProfile.findUnique({
      where: { userId: session.user.id },
      select: { preferences: true },
    }),
    prisma.category.findMany({
      orderBy: { order: 'asc' },
      select: { slug: true, name: true, color: true },
    }),
    prisma.article.findMany({
      where: { status: 'published' },
      orderBy: { publicationDate: 'desc' },
      take: 30,
      select: {
        id: true, slug: true, title: true, summary: true, images: true,
        publicationDate: true, category: true,
        categoryRef: { select: { name: true, slug: true, color: true } },
      },
    }),
    prisma.bookmark.findMany({
      where: { userId: session.user.id },
      select: { articleId: true },
    }),
  ]);

  return (
    <ContentHub
      preferences={(profile?.preferences as string[]) || []}
      categories={categories}
      articles={articles.map(a => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        summary: a.summary,
        image: Array.isArray(a.images) && a.images[0] ? String(a.images[0]) : null,
        date: a.publicationDate?.toISOString() || null,
        category: a.categoryRef
          ? { name: a.categoryRef.name, slug: a.categoryRef.slug, color: a.categoryRef.color }
          : a.category ? { name: a.category, slug: a.category.toLowerCase(), color: null } : null,
      }))}
      bookmarkedIds={bookmarks.map(b => b.articleId)}
    />
  );
}
