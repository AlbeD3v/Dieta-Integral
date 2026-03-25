"use client";

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Search, ChevronLeft, ChevronRight, Loader2,
  UserCheck, UserX, Crown, User as UserIcon,
} from 'lucide-react';

interface UserRow {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  plan: string;
  onboardingComplete: boolean;
  createdAt: string;
  _count: { progressLogs: number; bookmarks: number };
}

export default function UsersList({ clientBase }: { clientBase: string }) {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const pageSize = 15;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (search) params.set('q', search);
      if (planFilter) params.set('plan', planFilter);
      const res = await fetch(`${clientBase}/api/admin/users?${params}`);
      const data = await res.json();
      setUsers(data.users || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  }, [clientBase, page, search, planFilter, pageSize]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <span className="text-sm text-muted-foreground">{total} usuario{total !== 1 ? 's' : ''}</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar por nombre o email..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2">
          {['', 'free', 'premium'].map(p => (
            <Button
              key={p}
              size="sm"
              variant={planFilter === p ? 'default' : 'outline'}
              onClick={() => { setPlanFilter(p); setPage(1); }}
            >
              {p === '' ? 'Todos' : p === 'free' ? 'Free' : 'Premium'}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <UserIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No se encontraron usuarios.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Onboarding</TableHead>
                  <TableHead className="text-center">Progreso</TableHead>
                  <TableHead className="text-center">Guardados</TableHead>
                  <TableHead>Registro</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(u => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {u.image ? (
                          <img src={u.image} alt="" className="w-8 h-8 rounded-full" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                            {(u.name || 'U')[0].toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate max-w-[180px]">{u.name || 'Sin nombre'}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[180px]">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                        u.plan === 'premium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {u.plan === 'premium' && <Crown className="w-3 h-3" />}
                        {u.plan}
                      </span>
                    </TableCell>
                    <TableCell>
                      {u.onboardingComplete ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                          <UserCheck className="w-3.5 h-3.5" /> Completo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <UserX className="w-3.5 h-3.5" /> Pendiente
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-sm">{u._count.progressLogs}</TableCell>
                    <TableCell className="text-center text-sm">{u._count.bookmarks}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/users/${u.id}`}>
                        <Button size="sm" variant="outline">Ver detalle</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Página {page} de {totalPages}
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="w-4 h-4" /> Anterior
            </Button>
            <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
              Siguiente <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
