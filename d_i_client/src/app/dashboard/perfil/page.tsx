import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import ProfileEditor from './ProfileEditor';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/iniciar-sesion');

  const profile = await prisma.healthProfile.findUnique({
    where: { userId: session.user.id },
  });

  return (
    <ProfileEditor
      profile={profile ? {
        age: profile.age,
        sex: profile.sex,
        weight: profile.weight,
        height: profile.height,
        goal: profile.goal,
        activityLevel: profile.activityLevel,
        conditions: profile.conditions as string[] | null,
        preferences: profile.preferences as string[] | null,
        freeText: profile.freeText,
      } : null}
    />
  );
}
