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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-transparent h-full flex flex-col">
      <div className="relative w-full h-40">
        <Image 
          src={images[0].startsWith('/') ? images[0] : `/${images[0]}`} 
          alt={title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover"
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            +{images.length - 1} fotos
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
          <p className="text-xs text-muted-foreground">{publicationDate}</p>
          <p className="text-sm text-[#111111] mt-3 line-clamp-4 leading-relaxed">{description}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <Link href={articleUrl} className="inline-block">
            <Button className="transition-all duration-300 hover:scale-105 hover:bg-primary/90 cursor-pointer">
              Saber más...
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
