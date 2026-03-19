import Link from 'next/link';
import { getClientBaseUrl } from '../../utils/env';

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

export default async function AdminPreviewPage({ searchParams }: { searchParams?: { path?: string; w?: string } }) {
  const base = getClientBaseUrl();
  const currentPath = (searchParams?.path && searchParams.path.startsWith('/')) ? searchParams.path : '/';
  const src = `${base}${currentPath}`;

  const presets = [
    { key: 'full', label: 'Full', width: null as number | null },
    { key: 'mobile', label: 'Mobile', width: 375 },
    { key: 'tablet', label: 'Tablet', width: 768 },
    { key: 'laptop', label: 'Laptop', width: 1024 },
    { key: 'desktop', label: 'Desktop', width: 1280 },
  ];
  const currentW = searchParams?.w ?? 'full';
  const active = presets.find(p => p.key === currentW) ?? presets[0];
  const frameStyle = active.width ? { width: `${active.width}px` } : { width: '100%' };

  return (
    <div className="px-6 py-10 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Vista previa del cliente</h1>
          <p className="text-sm text-gray-500 mt-2">Selecciona una ruta para visualizarla dentro de admin.</p>
        </div>

        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          {routes.map((r) => (
            <Link
              key={r.path}
              href={`?path=${encodeURIComponent(r.path)}&w=${encodeURIComponent(currentW)}`}
              className={`text-sm rounded-full border px-3 py-1 hover:border-black/40 ${
                currentPath === r.path ? 'bg-black text-white border-transparent' : 'text-gray-600'
              }`}
            >
              {r.label}
            </Link>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-gray-500">Tamaño:</span>
          {presets.map(p => (
            <Link
              key={p.key}
              href={`?path=${encodeURIComponent(currentPath)}&w=${p.key}`}
              className={`rounded-full border px-3 py-1 hover:border-black/40 ${currentW === p.key ? 'bg-black text-white border-transparent' : 'text-gray-600'}`}
            >
              {p.label}
            </Link>
          ))}
        </div>

        <div className="rounded-xl border bg-white mx-auto" style={frameStyle}>
          <iframe
            title={`Preview ${currentPath}`}
            src={src}
            className="w-full h-[80vh] rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
