"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, Loader2, Crown, UserCheck, UserX,
  Scale, Zap, Smile, TrendingUp, Bookmark, FileText,
  Calendar, Mail, Shield,
} from 'lucide-react';

interface HealthProfile {
  age: number | null;
  sex: string | null;
  weight: number | null;
  height: number | null;
  activityLevel: string | null;
  goal: string | null;
  conditions: any;
  preferences: any;
  freeText: string | null;
}

interface ProgressLog {
  id: string;
  date: string;
  weight: number | null;
  energy: number | null;
  mood: number | null;
  notes: string | null;
}

interface BookmarkEntry {
  id: string;
  createdAt: string;
  article: { slug: string; title: string };
}

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  plan: string;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
  healthProfile: HealthProfile | null;
  progressLogs: ProgressLog[];
  bookmarks: BookmarkEntry[];
  _count: { progressLogs: number; bookmarks: number; sessions: number };
}

const goalLabels: Record<string, string> = {
  lose: 'Bajar de peso', gain: 'Subir de peso', maintain: 'Mantener peso',
  energy: 'Más energía', health: 'Mejorar salud',
};
const activityLabels: Record<string, string> = {
  sedentary: 'Sedentario', light: 'Ligero', moderate: 'Moderado',
  active: 'Activo', athlete: 'Atleta',
};
const moodEmoji = ['😞', '😐', '🙂', '😊', '🤩'];
const energyEmoji = ['🔋', '⚡', '⚡⚡', '🔥', '💥'];

export default function UserDetail({ userId, clientBase }: { userId: string; clientBase: string }) {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${clientBase}/api/admin/users/${userId}`)
      .then(r => r.json())
      .then(d => setUser(d.user || null))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [clientBase, userId]);

  const updateUser = async (data: Record<string, any>) => {
    setSaving(true);
    try {
      const res = await fetch(`${clientBase}/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const result = await res.json();
        setUser(prev => prev ? { ...prev, ...result.user } : prev);
      }
    } catch (err) {
      console.error('update error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Button>
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            Usuario no encontrado.
          </CardContent>
        </Card>
      </div>
    );
  }

  const hp = user.healthProfile;
  const bmi = hp?.weight && hp?.height
    ? (hp.weight / ((hp.height / 100) ** 2)).toFixed(1)
    : null;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back + header */}
      <div className="flex items-center gap-4">
        <Link href="/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1" /> Usuarios
          </Button>
        </Link>
      </div>

      {/* User card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 flex-wrap">
            {user.image ? (
              <img src={user.image} alt="" className="w-16 h-16 rounded-full ring-2 ring-border" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                {(user.name || 'U')[0].toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold">{user.name || 'Sin nombre'}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  user.plan === 'premium' ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground'
                }`}>
                  {user.plan === 'premium' && <Crown className="w-3 h-3" />}
                  {user.plan}
                </span>
                {user.onboardingComplete ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                    <UserCheck className="w-3.5 h-3.5" /> Onboarding completo
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <UserX className="w-3.5 h-3.5" /> Onboarding pendiente
                  </span>
                )}
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Registrado: {new Date(user.createdAt).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={user.plan === 'premium' ? 'outline' : 'default'}
                disabled={saving}
                onClick={() => updateUser({ plan: user.plan === 'premium' ? 'free' : 'premium' })}
              >
                <Crown className="w-3.5 h-3.5 mr-1" />
                {user.plan === 'premium' ? 'Quitar Premium' : 'Dar Premium'}
              </Button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl border p-3 text-center">
              <p className="text-2xl font-bold">{user._count.progressLogs}</p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" /> Registros
              </p>
            </div>
            <div className="rounded-xl border p-3 text-center">
              <p className="text-2xl font-bold">{user._count.bookmarks}</p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                <Bookmark className="w-3 h-3" /> Guardados
              </p>
            </div>
            <div className="rounded-xl border p-3 text-center">
              <p className="text-2xl font-bold">{user._count.sessions}</p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                <Shield className="w-3 h-3" /> Sesiones
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Health profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Perfil de salud</CardTitle>
          </CardHeader>
          <CardContent>
            {hp ? (
              <div className="space-y-3 text-sm">
                <Row label="Edad" value={hp.age ? `${hp.age} años` : '—'} />
                <Row label="Sexo" value={hp.sex === 'male' ? 'Masculino' : hp.sex === 'female' ? 'Femenino' : hp.sex || '—'} />
                <Row label="Peso" value={hp.weight ? `${hp.weight} kg` : '—'} />
                <Row label="Altura" value={hp.height ? `${hp.height} cm` : '—'} />
                {bmi && <Row label="IMC" value={bmi} />}
                <Row label="Objetivo" value={goalLabels[hp.goal || ''] || '—'} />
                <Row label="Actividad" value={activityLabels[hp.activityLevel || ''] || '—'} />
                {hp.conditions && Array.isArray(hp.conditions) && hp.conditions.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Condiciones</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(hp.conditions as string[]).map((c: string) => (
                        <span key={c} className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-medium text-amber-700">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
                {hp.preferences && Array.isArray(hp.preferences) && hp.preferences.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Intereses</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(hp.preferences as string[]).map((p: string) => (
                        <span key={p} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">{p}</span>
                      ))}
                    </div>
                  </div>
                )}
                {hp.freeText && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Notas</p>
                    <p className="text-xs text-muted-foreground">{hp.freeText}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">Sin perfil de salud.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Progreso reciente</CardTitle>
          </CardHeader>
          <CardContent>
            {user.progressLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Sin registros.</p>
            ) : (
              <div className="space-y-2">
                {user.progressLogs.slice(0, 10).map(log => (
                  <div key={log.id} className="flex items-center justify-between rounded-lg border px-3 py-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {new Date(log.date).toLocaleDateString('es', { day: 'numeric', month: 'short' })}
                    </span>
                    <div className="flex items-center gap-3 text-xs">
                      {log.weight != null && (
                        <span className="flex items-center gap-1"><Scale className="w-3 h-3" /> {log.weight}kg</span>
                      )}
                      {log.energy != null && (
                        <span>{energyEmoji[log.energy - 1]} {log.energy}/5</span>
                      )}
                      {log.mood != null && (
                        <span>{moodEmoji[log.mood - 1]} {log.mood}/5</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bookmarked articles */}
      {user.bookmarks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bookmark className="w-4 h-4" /> Artículos guardados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {user.bookmarks.map(b => (
                <div key={b.id} className="flex items-center justify-between rounded-lg border px-3 py-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm truncate">{b.article.title}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-3">
                    {new Date(b.createdAt).toLocaleDateString('es', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
