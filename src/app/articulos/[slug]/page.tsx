import { promises as fs } from 'fs';
import path from 'path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

async function getArticle(slug: string) {
  const filePath = path.join(process.cwd(), 'articulos', `articulo${slug}.txt`);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }>})  {
  
  const {slug} = await params;
  
  const article = await getArticle(slug);

  return (
    <div>
      <Header />
      <main>
        <section className="relative h-96">
          <Image src={article.imageUrl} alt={article.title} fill sizes="100vw" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <p className="mt-4 text-lg">{article.publicationDate}</p>
          </div>
        </section>
        <section className="container mx-auto px-6 py-12">
          <article className="prose lg:prose-xl max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.description.replace(/\n/g, '<br />') }}>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
