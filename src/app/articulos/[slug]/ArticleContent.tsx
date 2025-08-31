import Image from 'next/image';

interface ArticleContentProps {
  title: string;
  content: string;
  images: string[];
}

const processContent = (content: string) => {
  return content
    .replace(/\*([^*]+)\*/g, '$1') // Elimina los asteriscos pero mantiene el contenido
    .replace(/\[Img:\d+\]/g, '') // Elimina los marcadores de imagen
    .trim();
};

export default function ArticleContent({ content, images }: Omit<ArticleContentProps, 'title'>) {
  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');

  return (
    <article className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
      {paragraphs.map((p, pIndex) => {
        if (p.startsWith('## ')) {
          const title = p.replace(/^## /, '').trim();
          // Extraer el índice de imagen si existe
          const imageMatch = p.match(/\[Img:(\d+)\]/);
          const imageIndex = imageMatch ? parseInt(imageMatch[1]) - 1 : null;
          const processedTitle = processContent(title);
          const imageUrl = imageIndex !== null ? images[imageIndex] : null;

          return (
            <div key={pIndex} className="flex flex-col lg:flex-row-reverse md:gap-8 items-center my-16">
              {imageUrl && (
                <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                  <figure className="relative group">
                    <div className="aspect-video relative shadow-lg rounded-lg overflow-hidden bg-black/5">
                      <Image
                        src={imageUrl}
                        alt={processedTitle}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </figure>
                </div>
              )}
              <div className={imageUrl ? 'w-full lg:w-1/2' : 'w-full'}>
                <h2 className="font-libre text-2xl md:text-3xl lg:text-4xl font-bold mt-8 lg:mt-16 mb-8 leading-tight text-center text-primary/90 border-b border-primary/20 pb-2">
                  {processedTitle}
                </h2>
              </div>
            </div>
          );
        } else if (p.startsWith('#')) {
          const title = p.replace(/^# /, '').trim();
          return (
            <h1 key={pIndex} className="font-libre text-3xl md:text-4xl lg:text-5xl font-bold mt-20 mb-10 leading-tight text-center">
              {processContent(title)}
            </h1>
          );
        } else {
          return (
            <div key={pIndex} className="max-w-[65ch] mx-auto">
              <p className="mb-6 font-libre text-lg leading-relaxed text-justify">
                {processContent(p)}
              </p>
            </div>
          );
        }
      })}
    </article>
  );
}
