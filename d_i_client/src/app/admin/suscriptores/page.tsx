import Container from '@/shared/ui/Container';
import SectionHeader from '@/shared/ui/SectionHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import Link from 'next/link';

type SubscribersResponse = {
  total: number;
  items: { id: number; email: string; createdAt: string; verified: boolean }[];
  page: number;
  pageSize: number;
};

async function fetchSubscribers(page: number, pageSize: number): Promise<SubscribersResponse | null> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const url = `${base}/api/newsletter?page=${page}&pageSize=${pageSize}`;
  const res = await fetch(url, { cache: 'no-store' }).catch(() => null);
  if (!res || !res.ok) {
    // Fallback a ruta relativa
    const rel = await fetch(`/api/newsletter?page=${page}&pageSize=${pageSize}`, { cache: 'no-store' }).catch(() => null);
    if (!rel || !rel.ok) return null;
    return (await rel.json()) as SubscribersResponse;
  }
  return (await res.json()) as SubscribersResponse;
}

export const metadata = {
  title: 'Admin · Suscriptores — Dieta Integral',
  description: 'Panel mínimo para ver y paginar suscriptores de la newsletter.',
};

export default async function AdminSuscriptoresPage({ searchParams }: { searchParams?: { page?: string; pageSize?: string } }) {
  const page = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const pageSize = Math.min(50, Math.max(5, parseInt(searchParams?.pageSize || '10', 10) || 10));

  const data = await fetchSubscribers(page, pageSize);
  const total = data?.total ?? 0;
  const items = data?.items ?? [];
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Container className="py-16 md:py-24">
      <SectionHeader
        title="Suscriptores"
        subtitle="Listado paginado con fecha y estado de verificación."
        align="center"
      />

      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Listado</CardTitle>
            <CardDescription>
              Total: {total} · Página {page} de {totalPages}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr className="border-b">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Creado</th>
                    <th className="py-2 pr-4">Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-muted-foreground">Sin registros</td>
                    </tr>
                  ) : (
                    items.map((s) => (
                      <tr key={s.id} className="border-b last:border-0">
                        <td className="py-2 pr-4">{s.id}</td>
                        <td className="py-2 pr-4">{s.email}</td>
                        <td className="py-2 pr-4">{new Date(s.createdAt).toLocaleString()}</td>
                        <td className="py-2 pr-4">{s.verified ? 'Sí' : 'No'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link
                href={`?page=${Math.max(1, page - 1)}&pageSize=${pageSize}`}
                className="text-sm text-muted-foreground hover:text-foreground"
                aria-disabled={page <= 1}
              >
                ← Anterior
              </Link>
              <div className="text-xs text-muted-foreground">Página {page} de {totalPages}</div>
              <Link
                href={`?page=${Math.min(totalPages, page + 1)}&pageSize=${pageSize}`}
                className="text-sm text-muted-foreground hover:text-foreground"
                aria-disabled={page >= totalPages}
              >
                Siguiente →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
