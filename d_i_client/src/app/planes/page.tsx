import Container from "@/shared/ui/Container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

export const metadata = {
  title: "Planes — Dieta Integral",
  description: "Planes claros y minimalistas para acompañarte en tu proceso.",
};

const plans = [
  {
    name: "Esencial",
    price: "Gratis",
    desc: "Recursos básicos y recetas seleccionadas.",
    features: ["Recetas semanales", "Artículos destacados", "Newsletter"],
    cta: "Empezar",
  },
  {
    name: "Acompañamiento",
    price: "$29/mes",
    desc: "Plan guiado con objetivos y seguimiento.",
    features: ["Objetivos mensuales", "Seguimiento básico", "Soporte por email"],
    cta: "Elegir plan",
    featured: true,
  },
  {
    name: "Integral",
    price: "$59/mes",
    desc: "Acompañamiento completo y personalizado.",
    features: ["Plan personalizado", "Seguimiento 1:1", "Ajustes quincenales"],
    cta: "Comenzar ahora",
  },
];

export default function PlanesPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="text-center mb-12 space-y-3">
        <h1 className="text-3xl md:text-4xl font-semibold">Planes</h1>
        <p className="text-muted-foreground">Elige el nivel de acompañamiento que necesitas.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <Card
            key={p.name}
            className={
              p.featured
                ? "relative border-primary shadow-sm"
                : undefined
            }
          >
            <CardHeader>
              {p.featured && (
                <span className="absolute -top-3 left-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium text-white bg-[linear-gradient(130deg,#1B4332_0%,#2D6A4F_25%,#40916C_50%,#2D6A4F_75%,#1B4332_100%)]">
                  Recomendado
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <CardTitle>{p.name}</CardTitle>
                <span className="text-sm text-muted-foreground">{p.price}</span>
              </div>
              <CardDescription>{p.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                {p.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <Button className="w-full" variant={p.featured ? "accent" : "default"}>{p.cta}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
