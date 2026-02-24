import Link from "next/link";
import Container from "@/shared/ui/Container";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";

export const metadata = {
  title: "Dieta Integral — Minimal",
  description: "Enfoque minimalista y profesional para la UI del cliente.",
  alternates: { canonical: 'https://dietaintegral.fit/minimal' },
  openGraph: {
    title: 'Dieta Integral — Minimal',
    description: 'Enfoque minimalista y profesional para la UI del cliente.',
    url: 'https://dietaintegral.fit/minimal',
    type: 'website',
    images: [{ url: '/imagen_logo_svg.svg', alt: 'Dieta Integral' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dieta Integral — Minimal',
    description: 'Enfoque minimalista y profesional para la UI del cliente.',
    images: ['/imagen_logo_svg.svg'],
  },
};

export default function MinimalHome() {
  return (
    <div className="space-y-24">
      <section className="border-b">
        <Container className="py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                Alimentación consciente, diseño minimal.
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-prose">
                Planes claros, recetas prácticas y hábitos sostenibles. Todo con una interfaz limpia que pone el foco en tu progreso.
              </p>
              <div className="flex gap-3">
                <Button href="/planes" className="">Explorar planes</Button>
                <Button variant="outline" href="#beneficios">Ver beneficios</Button>
              </div>
            </div>
            <div className="md:justify-self-end">
              <div className="aspect-[4/3] w-full max-w-lg rounded-xl border bg-card" />
            </div>
          </div>
        </Container>
      </section>

      <section id="beneficios">
        <Container>
          <div className="space-y-2 mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold">Beneficios clave</h2>
            <p className="text-muted-foreground">Lo esencial, sin distracciones.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Claridad</CardTitle>
                <CardDescription>Interfaz simple para decisiones rápidas.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Estructura en secciones y tipografía legible para reducir fricción.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enfoque</CardTitle>
                <CardDescription>Colores de acento solo donde importa.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Botones, estados activos y tarjetas destacadas con tu color principal.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Consistencia</CardTitle>
                <CardDescription>Tokens y componentes reutilizables.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Base sólida para escalar sin perder calidad visual.
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-t">
        <Container className="py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">Listo para empezar</h3>
              <p className="text-muted-foreground">Explora los planes y encuentra el que mejor se adapta a ti.</p>
            </div>
            <Button href="/planes">Ver planes</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
