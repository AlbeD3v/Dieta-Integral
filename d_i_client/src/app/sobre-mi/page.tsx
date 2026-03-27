export const metadata = {
  title: 'Sobre mí | Dieta Integral',
  description: 'Conoce mi historia, mi enfoque y por qué hago lo que hago desde una perspectiva ancestral y práctica.',
  alternates: { canonical: 'https://dietaintegral.fit/sobre-mi' },
  openGraph: {
    title: 'Sobre mí | Dieta Integral',
    description: 'Historia y enfoque de acompañamiento en alimentación consciente.',
    url: 'https://dietaintegral.fit/sobre-mi',
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre mí | Dieta Integral',
    description: 'Historia y enfoque de acompañamiento en alimentación consciente.',
    images: ['/imagen_logo_svg.svg']
  }
};
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { Breadcrumbs } from '@shared';
import Image from 'next/image';
import Container from '@/shared/ui/Container';
import { Button } from '@/shared/ui/button';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import prisma from '@/lib/prisma';

async function getAbout() {
  const defaults = {
    title: 'Sobre mí',
    markdown: 'Escribe tu historia en formato Markdown.\n\n## Por qué hago lo que hago\n\n...\n\n## Qué me diferencia\n\n...',
    ctaLabel: 'Hablemos',
  } as const;
  try {
    const row = await prisma.setting.findUnique({ where: { id: 'about' } });
    let data: Record<string, unknown> | null = null;
    if (row?.value) {
      try { data = typeof row.value === 'string' ? JSON.parse(row.value) : (row.value as unknown as Record<string, unknown>); } catch {}
    }
    return { ...defaults, ...(data || {}) };
  } catch {
    try {
      const res = await fetch('/api/about', { cache: 'no-store', next: { revalidate: 0 } });
      if (res.ok) return res.json();
    } catch {}
    return defaults;
  }
}

export default async function SobreMiPage() {
  const data = await getAbout();
  const title = data?.title ?? 'Sobre mí';
  const raw = (data?.markdown as string | undefined) || '';
  const markdown = normalizeMarkdown(raw);
  const imageUrl = (data?.imageUrl as string | undefined) || '/Fotos_Patrones/autor_web.svg';
  const ctaLabel = data?.ctaLabel ?? 'Hablemos';
  return (
    <div className="min-h-screen bg-background">
      <div>
        <Container className="py-16">
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Sobre mí' }]} />
          <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-12">
            {/* Aside con imagen */}
            <aside className="md:sticky md:top-24 flex-shrink-0">
              <div className="relative w-[250px] h-[250px] rounded-full border border-primary/30 p-1">
                <Image 
                  src={imageUrl}
                  alt={`${title} - Especialista en Dieta Integral`}
                  fill
                  sizes="250px"
                  priority
                  className="rounded-full object-cover"
                  style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
                />
              </div>
            </aside>

            {/* Contenido estructurado */}
            <div className="flex-1 max-w-3xl mx-auto md:mx-0">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-8 text-center">{title}</h1>

              <section className="prose prose-neutral dark:prose-invert max-w-none">
                {markdown ? (
                  <ReactMarkdown
                    rehypePlugins={[[
                      rehypeSanitize,
                      {
                        ...defaultSchema,
                        tagNames: [
                          ...(defaultSchema.tagNames || []),
                          'h2', 'h3'
                        ],
                        attributes: {
                          ...(defaultSchema.attributes || {}),
                          a: [
                            ...(defaultSchema.attributes?.a || []),
                            ['target', ['_blank']],
                            ['rel', ['nofollow', 'noopener', 'noreferrer']]
                          ],
                          img: [
                            ...(defaultSchema.attributes?.img || []),
                            ['src'], ['alt'], ['width'], ['height']
                          ]
                        }
                      }
                    ]]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a target="_blank" rel="nofollow noopener noreferrer" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-8 mb-3" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-xl md:text-2xl font-semibold tracking-tight mt-6 mb-2" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="leading-7 mt-4" {...props} />
                      ),
                    }}
                  >
                    {markdown}
                  </ReactMarkdown>
                ) : (
                  <p className="text-muted-foreground">Contenido pendiente de cargar.</p>
                )}
                <div className="pt-8">
                  <Button asChild className="bg-gradient-to-r from-[#1B4332] to-[#40916C] text-white">
                    <a href="/contacto">{ctaLabel}</a>
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

function normalizeMarkdown(input: string): string {
  const lines = input.split(/\r?\n/);
  const fixed = lines.map((line) => {
    // Insert a space after leading #'s if missing, e.g., "##Titulo" -> "## Titulo"
    const m = line.match(/^(#{1,6})([^#\s].*)$/);
    if (m) return `${m[1]} ${m[2]}`;
    return line;
  });
  return fixed.join('\n');
}
