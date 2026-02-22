import Container from '@/shared/ui/Container';
import SectionHeader from '@/shared/ui/SectionHeader';
import Link from 'next/link';

const routes = [
  { label: 'Home', path: '/' },
  { label: 'Planes', path: '/planes' },
  { label: 'Recetas', path: '/recetas' },
  { label: 'Artículos', path: '/articulos' },
  { label: 'Sobre mí', path: '/sobre-mi' },
  { label: 'Minimal', path: '/minimal' },
];

export const metadata = {
  title: 'Admin · Preview — Dieta Integral',
  description: 'Visualiza el cliente desde admin para observar cambios en vivo.',
};

export default async function AdminPreviewPage({ searchParams }: { searchParams?: { path?: string } }) {
  const currentPath = (searchParams?.path && searchParams.path.startsWith('/')) ? searchParams.path : '/';

  return (
    <Container className="py-10 md:py-16">
      <SectionHeader
        title="Vista previa del cliente"
        subtitle="Selecciona una ruta para visualizarla dentro de admin."
        align="center"
      />

      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {routes.map((r) => (
          <Link
            key={r.path}
            href={`?path=${encodeURIComponent(r.path)}`}
            className={`text-sm rounded-full border px-3 py-1 hover:border-foreground/40 ${
              currentPath === r.path ? 'bg-[linear-gradient(130deg,#1B4332_0%,#2D6A4F_25%,#40916C_50%,#2D6A4F_75%,#1B4332_100%)] text-white border-transparent' : 'text-muted-foreground'
            }`}
          >
            {r.label}
          </Link>
        ))}
      </div>

      <div className="rounded-xl border bg-card">
        <iframe
          title={`Preview ${currentPath}`}
          src={currentPath}
          className="w-full h-[80vh] rounded-xl"
        />
      </div>
    </Container>
  );
}
