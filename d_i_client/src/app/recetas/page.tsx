import Container from "@/shared/ui/Container";
import SectionHeader from "@/shared/ui/SectionHeader";
import Chip from "@/shared/ui/Chip";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";

export const metadata = {
  title: "Recetas — Dieta Integral",
  description: "Recetas prácticas y minimalistas para tu día a día.",
};

const filters = ["Todas", "Desayuno", "Almuerzo", "Cena", "Snacks"] as const;

const recetas = [
  { title: "Bowl verde integral", tags: ["Almuerzo"], desc: "Hojas, granos y proteína en 15 min." },
  { title: "Huevos revueltos con hierbas", tags: ["Desayuno"], desc: "Sencillo, rápido y nutritivo." },
  { title: "Crema de calabaza", tags: ["Cena"], desc: "Textura suave, sabor profundo." },
  { title: "Granola artesanal", tags: ["Snacks"], desc: "Crujiente y sin procesados." },
];

export default function RecetasPage() {
  return (
    <Container className="py-16 md:py-24">
      <SectionHeader
        title="Recetas"
        subtitle="Filtros simples, tarjetas limpias y contenido claro."
        align="center"
      />

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {filters.map((f, i) => (
          <Chip key={f} active={i === 0}>{f}</Chip>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {recetas.map((r) => (
          <Card key={r.title} className="group transition-colors hover:border-primary/40">
            <CardHeader>
              <CardTitle className="text-lg">{r.title}</CardTitle>
              <CardDescription>{r.tags.join(" • ")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
