import Image from 'next/image';
import { Button } from "@/components/ui/button" 
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
  publicationDate: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, imageUrl, articleUrl, publicationDate }) => {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <Image src={imageUrl} alt={title} width={400} height={250} className="w-full h-48 object-cover" />
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
