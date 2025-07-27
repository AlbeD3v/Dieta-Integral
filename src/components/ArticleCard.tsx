import Image from 'next/image';
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={imageUrl} alt={title} width={400} height={250} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{publicationDate}</p>
        <p className="text-gray-600 mt-4">{description}</p>
        <Link href={articleUrl} className="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
