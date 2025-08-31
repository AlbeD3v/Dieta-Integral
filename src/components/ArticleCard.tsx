import Image from 'next/image';
import { Button } from "@/components/ui/button" 
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  description: string;
  images: string[];
  articleUrl: string;
  publicationDate: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, images, articleUrl, publicationDate }) => {
  return (
    <Link href={articleUrl} className="block transform hover:scale-105 transition-transform duration-300">
      <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-primary h-full flex flex-col">
        <div className="relative w-full h-40">
          <Image 
            src={images[0].startsWith('/') ? images[0] : `/${images[0]}`} 
            alt={title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              +{images.length - 1} fotos
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{publicationDate}</p>
            <p className="text-sm text-[#111111] mt-3 line-clamp-4 leading-relaxed group-hover:text-black transition-colors duration-300">{description}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <Button className="transition-transform duration-300 group-hover:scale-105">
              Saber más...
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
