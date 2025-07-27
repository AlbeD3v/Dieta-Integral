// import ArticleCard from './ArticleCard';
// import { articles } from '@/lib/articles';

// const FeaturedArticles = () => {
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="container mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center text-gray-800">Artículos Destacados</h2>
//         <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//           {articles.map(article => (
//             <ArticleCard 
//               key={article.id} 
//               title={article.title}
//               description={article.summary}
//               imageUrl={article.imageUrl}
//               articleUrl={article.articleUrl}
//               publicationDate={article.publicationDate}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedArticles;

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const articles = [
  {
    id: 1,
    title: "¿Y si tu salud fuera el verdadero motor de tu vida?",
    excerpt:
      "Te lo pregunto en serio. No como lo haría un médico en bata, ni como lo haría un influencer con abdominales y frases vacías.",
    date: "25 de Julio, 2025",
    image: "/placeholder.svg?height=300&width=400",
    slug: "salud-motor-vida",
  },
  {
    id: 2,
    title: "Nuestros Genes Siguen Esperando El Pasado",
    excerpt:
      "La Desconexión Entre Biología Ancestral y Vida Moderna. ¿Alguna vez te has preguntado por qué, a pesar de tantos avances médicos, las enfermedades crónicas siguen aumentando?",
    date: "24 de Julio, 2025",
    image: "/placeholder.svg?height=300&width=400",
    slug: "genes-esperando-pasado",
  },
  {
    id: 3,
    title: "La Historia Que Cambió Tu Plato (Y Tu Salud)",
    excerpt:
      "¿Y si te dijera que tu diabetes, tu obesidad y esa sensación constante de fatiga no son casualidades, sino el resultado perfecto de un plan que comenzó hace 60 años?",
    date: "23 de Julio, 2025",
    image: "/placeholder.svg?height=300&width=400",
    slug: "historia-cambio-plato",
  },
  {
    id: 4,
    title: "¿Qué es realmente la Dieta Integral?",
    excerpt:
      "Y por qué es diferente a todo lo que has probado. Pregunta honesta: ¿Cuántas dietas has intentado en los últimos dos años?",
    date: "22 de Julio, 2025",
    image: "/placeholder.svg?height=300&width=400",
    slug: "que-es-dieta-integral",
  },
]

export default function FeaturedArticles() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Artículos Destacados</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-md"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={300}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 font-medium">{article.date}</p>
                <p className="text-gray-700 text-sm sm:text-base line-clamp-3 leading-relaxed">{article.excerpt}</p>
              </CardContent>

              <CardFooter className="p-4 sm:p-6 pt-0">
                <Link href={`/articulos/${article.slug}`} className="w-full">
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300"
                    size="sm"
                  >
                    Ver más
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
