import { promises as fs } from 'fs';
import path from 'path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

async function getArticle(slug: string) {
  const filePath = path.join(process.cwd(), 'd-i', 'articulos', `articulo${slug}.text`);
  const content = await fs.readFile(filePath, 'utf-8');
  
  // Simple parsing logic, assuming title is the first line
  const [title, ...rest] = content.split('\n');
  const description = rest.join('\n');

  return {
    title,
    description,
    imageUrl: `/articulos/articulo${slug}_1.png`, // Assuming image naming convention
    publicationDate: "Fecha de Publicación de Ejemplo" // Placeholder
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-6 py-12">
        <article>
          <h1 className="text-4xl font-bold text-gray-800">{article.title}</h1>
          <p className="text-sm text-gray-500 mt-2">{article.publicationDate}</p>
          <div className="mt-8">
            <Image src={article.imageUrl} alt={article.title} width={800} height={400} className="w-full h-auto object-cover rounded-lg" />
          </div>
          <div className="mt-8 text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: article.description.replace(/\n/g, '<br />') }}>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
