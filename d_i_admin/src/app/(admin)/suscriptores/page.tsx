"use client";
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Subscriber = { id: string; email: string; createdAt: string; verified: boolean };

function SuscriptoresContent() {
  const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000';
  const search = useSearchParams();
  const router = useRouter();

  const [q, setQ] = useState<string>(search.get('q') ?? '');
  const [verified, setVerified] = useState<string>(
    search.get('verified') === 'true' || search.get('verified') === 'false' ? (search.get('verified') as string) : 'all'
  );
  const page = Math.max(1, parseInt(search.get('page') ?? '1', 10) || 1);
  const pageSize = 10;

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);

  const qs = useMemo(() => {
    const p = new URLSearchParams();
    p.set('page', String(page));
    p.set('pageSize', String(pageSize));
    if (q.trim()) p.set('q', q.trim());
    if (verified === 'true' || verified === 'false') p.set('verified', verified);
    return p.toString();
  }, [page, pageSize, q, verified]);

  useEffect(() => {
    setLoading(true);
    fetch(`${base}/api/newsletter?${qs}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        setRows(data.items ?? []);
        setTotal(data.total ?? 0);
      })
      .finally(() => setLoading(false));
  }, [base, qs]);

  const onApplyFilters = () => {
    const p = new URLSearchParams();
    p.set('page', '1');
    if (q.trim()) p.set('q', q.trim());
    if (verified === 'true' || verified === 'false') p.set('verified', verified);
    router.push(`?${p.toString()}`);
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function go(n: number) {
    const p = new URLSearchParams(search.toString());
    p.set('page', String(n));
    router.push(`?${p.toString()}`);
  }

  function exportCSV() {
    const header = ['email', 'createdAt', 'verified'];
    const lines = [header.join(',')].concat(
      rows.map(r => [r.email, new Date(r.createdAt).toISOString(), String(r.verified)].join(','))
    );
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suscriptores_p${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Suscriptores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground">Buscar por email</label>
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="usuario@correo.com" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Estado</label>
              <Select value={verified} onValueChange={setVerified}>
                <SelectTrigger className="w-[160px]"><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="true">Verificado</SelectItem>
                  <SelectItem value="false">No verificado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={onApplyFilters}>Aplicar</Button>
              <Button variant="outline" onClick={exportCSV} disabled={!rows.length}>Export CSV</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Verificado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={3}>Cargando…</TableCell></TableRow>
                ) : rows.length ? (
                  rows.map(r => (
                    <TableRow key={r.id}>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{r.verified ? 'Sí' : 'No'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={3}>Sin resultados</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Página {page} de {totalPages} ({total} total)</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => go(1)} disabled={page === 1}>« Primero</Button>
              <Button variant="outline" size="sm" onClick={() => go(Math.max(1, page-1))} disabled={page === 1}>‹ Anterior</Button>
              <Button variant="outline" size="sm" onClick={() => go(Math.min(totalPages, page+1))} disabled={page >= totalPages}>Siguiente ›</Button>
              <Button variant="outline" size="sm" onClick={() => go(totalPages)} disabled={page >= totalPages}>Último »</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuscriptoresPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Cargando…</div>}>
      <SuscriptoresContent />
    </Suspense>
  );
}
