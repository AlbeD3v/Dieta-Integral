"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Target, Activity, HeartPulse, Sparkles, Scale,
  TrendingUp, BookOpen, ArrowRight, Zap, Moon,
} from 'lucide-react';

/* ── Types ──────────────────────────────────── */
interface Props {
  user: { name: string; email: string; image: string };
  profile: {
    age: number | null;
    sex: string | null;
    weight: number | null;
    height: number | null;
    goal: string | null;
    activityLevel: string | null;
    conditions: string[] | null;
    preferences: string[] | null;
  } | null;
  recentLogs: {
    date: string;
    weight: number | null;
    energy: number | null;
    mood: number | null;
  }[];
  latestArticles: {
    slug: string;
    title: string;
    summary: string;
    image: string | null;
  }[];
}

/* ── Label maps ─────────────────────────────── */
const goalLabels: Record<string, string> = {
  lose: 'Bajar de peso',
  gain: 'Subir de peso',
  maintain: 'Mantener peso',
  energy: 'Más energía',
  health: 'Mejorar salud',
};
const activityLabels: Record<string, string> = {
  sedentary: 'Sedentario',
  light: 'Ligeramente activo',
  moderate: 'Moderadamente activo',
  active: 'Muy activo',
  athlete: 'Atleta',
};

/* ── Component ──────────────────────────────── */
export default function DashboardHome({ user, profile, recentLogs, latestArticles }: Props) {
  const firstName = user.name.split(' ')[0];
  const [greeting, setGreeting] = useState('Hola');
  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches');
  }, []);

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-[#475569] mt-1">Tu resumen personalizado de salud integral.</p>
      </div>

      {/* Quick stats */}
      {profile && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Target className="w-5 h-5" />}
            label="Objetivo"
            value={goalLabels[profile.goal || ''] || '—'}
            color="emerald"
          />
          <StatCard
            icon={<Activity className="w-5 h-5" />}
            label="Actividad"
            value={activityLabels[profile.activityLevel || ''] || '—'}
            color="blue"
          />
          <StatCard
            icon={<Scale className="w-5 h-5" />}
            label="Peso actual"
            value={profile.weight ? `${profile.weight} kg` : '—'}
            color="amber"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="IMC"
            value={profile.weight && profile.height
              ? (profile.weight / ((profile.height / 100) ** 2)).toFixed(1)
              : '—'}
            color="purple"
          />
        </div>
      )}

      {!profile && (
        <div className="rounded-2xl border border-[#1B4332]/15 bg-[#1B4332]/5 p-6 text-center space-y-3">
          <h3 className="font-semibold text-[#0F172A]">Completa tu perfil de salud</h3>
          <p className="text-sm text-[#475569]">Aún no has completado el cuestionario. Complétalo para recibir recomendaciones personalizadas.</p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1B4332] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2D6A4F] transition-all"
          >
            Completar perfil <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Progress section */}
        <section className="rounded-2xl border border-black/8 bg-white p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[#0F172A] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#1B4332]" /> Progreso reciente
            </h2>
            <Link href="/dashboard/progreso" className="text-xs font-semibold text-[#1B4332] hover:text-[#2D6A4F] flex items-center gap-1">
              Ver todo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentLogs.length === 0 ? (
            <div className="text-center py-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#F7F6F2] flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-[#94A3B8]" />
              </div>
              <p className="text-sm text-[#475569]">Aún no tienes registros de progreso.</p>
              <Link
                href="/dashboard/progreso"
                className="text-xs font-semibold text-[#1B4332] hover:text-[#2D6A4F]"
              >
                Registrar mi primer día →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recentLogs.slice(0, 5).map((log, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-[#F7F6F2] px-4 py-2.5">
                  <span className="text-xs font-medium text-[#94A3B8]">
                    {new Date(log.date).toLocaleDateString('es', { day: 'numeric', month: 'short' })}
                  </span>
                  <div className="flex items-center gap-4 text-sm">
                    {log.weight && (
                      <span className="flex items-center gap-1 text-[#475569]">
                        <Scale className="w-3.5 h-3.5" /> {log.weight} kg
                      </span>
                    )}
                    {log.energy && (
                      <span className="flex items-center gap-1 text-[#475569]">
                        <Zap className="w-3.5 h-3.5" /> {log.energy}/5
                      </span>
                    )}
                    {log.mood && (
                      <span className="flex items-center gap-1 text-[#475569]">
                        <Moon className="w-3.5 h-3.5" /> {log.mood}/5
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Interests / recommendations */}
        <section className="rounded-2xl border border-black/8 bg-white p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[#0F172A] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#1B4332]" /> Tus intereses
            </h2>
            <Link href="/dashboard/perfil" className="text-xs font-semibold text-[#1B4332] hover:text-[#2D6A4F] flex items-center gap-1">
              Editar <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {profile?.preferences && (profile.preferences as string[]).length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {(profile.preferences as string[]).map(p => (
                <span key={p} className="rounded-full bg-[#1B4332]/8 px-3 py-1.5 text-xs font-medium text-[#1B4332]">
                  {preferenceLabel(p)}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#94A3B8]">No has seleccionado intereses aún.</p>
          )}

          {profile?.conditions && (profile.conditions as string[]).length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8] flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5" /> Condiciones
              </p>
              <div className="flex flex-wrap gap-2">
                {(profile.conditions as string[]).map(c => (
                  <span key={c} className="rounded-full bg-amber-50 border border-amber-200/60 px-3 py-1.5 text-xs font-medium text-amber-700">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Latest articles */}
      {latestArticles.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[#0F172A] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#1B4332]" /> Artículos recomendados
            </h2>
            <Link href="/articulos" className="text-xs font-semibold text-[#1B4332] hover:text-[#2D6A4F] flex items-center gap-1">
              Ver blog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {latestArticles.map(a => (
              <Link
                key={a.slug}
                href={`/articulos/${a.slug}`}
                className="rounded-2xl border border-black/8 bg-white p-5 hover:shadow-md hover:border-black/12 transition-all space-y-2 group"
              >
                <h3 className="text-sm font-semibold text-[#0F172A] group-hover:text-[#1B4332] transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-xs text-[#475569] line-clamp-2">{a.summary}</p>
                <span className="text-xs font-semibold text-[#1B4332] flex items-center gap-1">
                  Leer <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ── StatCard ────────────────────────────────── */
const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
  purple: 'bg-purple-50 text-purple-700 border-purple-100',
};

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className={`rounded-2xl border p-4 space-y-2 ${colorMap[color] || colorMap.emerald}`}>
      <div className="flex items-center gap-2 opacity-70">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────── */
const prefMap: Record<string, string> = {
  fasting: 'Ayuno intermitente',
  ancestral: 'Dieta ancestral',
  sleep: 'Mejorar sueño',
  circadian: 'Ritmos circadianos',
  recipes: 'Recetas saludables',
  movement: 'Rutinas de movimiento',
  stress: 'Manejo de estrés',
  supplements: 'Suplementación',
};

function preferenceLabel(key: string) {
  return prefMap[key] || key;
}
