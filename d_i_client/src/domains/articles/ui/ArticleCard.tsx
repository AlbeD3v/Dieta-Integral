import Image from 'next/image';
import { Button } from "@shared" 
import Link from 'next/link';
import { normalizeImageUrl } from '@/utils/image'
import { formatDateES } from '@/utils/date'
import { CategoryBadge } from '@dieta/shared-ui'

interface ArticleCardProps {
  title: string;
  description: string;
  images?: string[];
  articleUrl: string;
  publicationDate?: string;
  category?: string;
  categoryColor?: string;
  categorySlug?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, images = [], articleUrl, publicationDate, category, categoryColor, categorySlug }) => {
  const cover = Array.isArray(images) && images.length > 0 ? String(images[0]) : '/imagen_logo_svg.svg'
  const src = normalizeImageUrl(cover)
  const dateText = formatDateES(publicationDate || '')
  return (
    <div className="group relative rounded-xl border bg-card h-full flex flex-col overflow-hidden transition-colors transition-shadow shadow-sm hover:shadow-md hover:border-primary/40">
      <Link href={articleUrl} className="absolute inset-0 z-10" aria-label={`Leer artículo: ${title}`} />
      <div className="relative w-full h-40 overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <CategoryBadge name={category} color={categoryColor} slug={categorySlug} />
        {Array.isArray(images) && images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            +{images.length - 1} fotos
          </div>
        )}
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex-grow space-y-2">
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground underline-offset-4 group-hover:underline">{title}</h3>
          <p className="text-xs text-muted-foreground">{dateText}</p>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-4 leading-relaxed">{description}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <span className="inline-block text-primary px-0 pointer-events-none select-none">Saber más…</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
