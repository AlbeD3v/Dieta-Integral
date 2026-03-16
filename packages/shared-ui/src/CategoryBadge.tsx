import Link from 'next/link'

interface Props {
  name?: string
  color?: string | null
  slug?: string | null
  className?: string
}

export default function CategoryBadge({ name, color, slug, className }: Props) {
  const style = color ? { backgroundColor: color, borderColor: color, color: '#0a0a0a' } : undefined
  const content = (
    <span
      className={`inline-flex items-center rounded-full border bg-background/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium ${className || ''}`}
      style={style}
    >
      {name ?? 'Artículo'}
    </span>
  )
  if (slug) {
    return (
      <Link href={`/articulos/categoria/${encodeURIComponent(slug)}`} className="absolute top-2 left-2 z-20 hover:opacity-90" onClick={(e)=> e.stopPropagation()}>
        {content}
      </Link>
    )
  }
  return (
    <span className="absolute top-2 left-2 z-10">
      {content}
    </span>
  )
}
