"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users, UserCheck, Crown, FileText, TrendingUp,
  Bookmark, ArrowRight, Loader2,
} from 'lucide-react';

interface Stats {
  users: { total: number; last30d: number; last7d: number; onboarded: number; free: number; premium: number };
  articles: { total: number; published: number };
  activity: { totalLogs: number; logsLast7d: number; totalBookmarks: number };
  recentUsers: { id: string; name: string | null; email: string | null; image: string | null; createdAt: string; plan: string }[];
}

export default function AdminDashboard({ clientBase }: { clientBase: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${clientBase}/api/admin/stats`, { credentials: 'include' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (data && data.users) setStats(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [clientBase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          No se pudo cargar las estadísticas. Verifica que el cliente esté corriendo.
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    { label: 'Usuarios totales', value: stats.users.total, sub: `+${stats.users.last7d} esta semana`, icon: Users, color: 'text-blue-600' },
    { label: 'Onboarding completo', value: stats.users.onboarded, sub: `${stats.users.total ? Math.round((stats.users.onboarded / stats.users.total) * 100) : 0}% del total`, icon: UserCheck, color: 'text-emerald-600' },
    { label: 'Premium', value: stats.users.premium, sub: `${stats.users.free} free`, icon: Crown, color: 'text-amber-600' },
    { label: 'Artículos publicados', value: stats.articles.published, sub: `${stats.articles.total} total`, icon: FileText, color: 'text-purple-600' },
    { label: 'Registros progreso', value: stats.activity.totalLogs, sub: `+${stats.activity.logsLast7d} esta semana`, icon: TrendingUp, color: 'text-rose-600' },
    { label: 'Bookmarks', value: stats.activity.totalBookmarks, sub: 'artículos guardados', icon: Bookmark, color: 'text-cyan-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/articles">
            <Button size="sm">Crear artículo</Button>
          </Link>
          <Link href="/users">
            <Button size="sm" variant="outline">Ver usuarios</Button>
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map(s => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                    <p className="text-3xl font-bold mt-1">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
                  </div>
                  <div className={`p-2.5 rounded-xl bg-muted/50 ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent users + Quick links */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Usuarios recientes</CardTitle>
              <Link href="/users" className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
                Ver todos <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentUsers.map(u => (
                <Link
                  key={u.id}
                  href={`/users/${u.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {u.image ? (
                    <img src={u.image} alt="" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                      {(u.name || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{u.name || 'Sin nombre'}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      u.plan === 'premium' ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground'
                    }`}>
                      {u.plan}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString('es', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </Link>
              ))}
              {stats.recentUsers.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Sin usuarios aún.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preview del cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border overflow-hidden">
              <iframe
                title="Preview Home"
                src={`${clientBase}/`}
                className="w-full h-[300px] rounded-xl"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
              {['/', '/blog', '/sobre-mi', '/contacto'].map(p => (
                <a
                  key={p}
                  href={`${clientBase}${p}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border px-3 py-1 hover:border-foreground/30 transition-colors"
                >
                  {p === '/' ? 'Home' : p.replace('/', '')}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
