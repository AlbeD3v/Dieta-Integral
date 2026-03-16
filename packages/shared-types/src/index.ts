export interface CategoryDTO {
  id: string
  name: string
  slug: string
  color?: string | null
  order: number
}

export interface ArticleDTO {
  id?: string
  slug: string
  title: string
  summary: string
  content?: string
  images: string[]
  category?: string | null
  categoryId?: string | null
  status: 'draft' | 'published'
  publicationDate?: string | Date | null
  categoryRef?: Pick<CategoryDTO, 'name' | 'slug' | 'color'> | null
}
