import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';
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
    <div className="group relative rounded-2xl bg-card h-full flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-0.5">
      <Link href={articleUrl} className="absolute inset-0 z-10" aria-label={`Leer artículo: ${title}`} />

      {/* Image with gradient overlay */}
      <div className="relative w-full h-52 overflow-hidden flex-shrink-0">
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <CategoryBadge name={category} color={categoryColor} slug={categorySlug} />
        {Array.isArray(images) && images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-medium">
            +{images.length - 1} fotos
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow gap-3">
        {/* Date */}
        {dateText && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{dateText}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base md:text-[1.05rem] font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-grow">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-1 pointer-events-none select-none">
          Leer artículo
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
