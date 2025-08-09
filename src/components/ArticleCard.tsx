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
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-48">
        <Image 
          src={images[0].startsWith('/') ? images[0] : `/${images[0]}`} 
          alt={title} 
          fill 
          className="object-cover"
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            +{images.length - 1} fotos
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{publicationDate}</p>
        <p className="text-card-foreground/80 mt-4 line-clamp-5">{description}</p>
        <div className="flex justify-end">
          <Button asChild className="inline-block mt-4 px-4 py-2">
            <Link href={articleUrl} >
            Saber más...
          </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
