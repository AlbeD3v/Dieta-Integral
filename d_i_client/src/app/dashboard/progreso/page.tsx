import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import ProgressTracker from './ProgressTracker';

export default async function ProgressPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/iniciar-sesion');

  const logs = await prisma.progressLog.findMany({
    where: { userId: session.user.id },
    orderBy: { date: 'desc' },
    take: 30,
  });

  return (
    <ProgressTracker
      logs={logs.map(l => ({
        id: l.id,
        date: l.date.toISOString(),
        weight: l.weight,
        energy: l.energy,
        mood: l.mood,
        notes: l.notes,
      }))}
    />
  );
}
