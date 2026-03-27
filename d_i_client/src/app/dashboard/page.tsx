import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import DashboardHome from './DashboardHome';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/iniciar-sesion');

  const profile = await prisma.healthProfile.findUnique({
    where: { userId: session.user.id },
  });

  const recentLogs = await prisma.progressLog.findMany({
    where: { userId: session.user.id },
    orderBy: { date: 'desc' },
    take: 7,
  });

  const latestArticles = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publicationDate: 'desc' },
    take: 3,
    select: { slug: true, title: true, summary: true, images: true, publicationDate: true },
  });

  return (
    <DashboardHome
      user={{
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || '',
      }}
      profile={profile ? {
        age: profile.age,
        sex: profile.sex,
        weight: profile.weight,
        height: profile.height,
        goal: profile.goal,
        activityLevel: profile.activityLevel,
        conditions: profile.conditions as string[] | null,
        preferences: profile.preferences as string[] | null,
      } : null}
      recentLogs={recentLogs.map(l => ({
        date: l.date.toISOString(),
        weight: l.weight,
        energy: l.energy,
        mood: l.mood,
      }))}
      latestArticles={latestArticles.map(a => ({
        slug: a.slug,
        title: a.title,
        summary: a.summary,
        image: Array.isArray(a.images) && a.images[0] ? String(a.images[0]) : null,
      }))}
    />
  );
}
