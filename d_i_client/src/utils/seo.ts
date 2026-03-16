type CanonicalArgs = { title: string; description: string; path: string }
export function buildCanonicalMeta({ title, description, path }: CanonicalArgs) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://dietaintegral.fit'
  const url = `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title, description, url }),
    twitter: buildTwitter({ title, description }),
  }
}

type OGArgs = { title: string; description: string; url: string; image?: string }
export function buildOpenGraph({ title, description, url, image }: OGArgs) {
  return {
    title,
    description,
    url,
    type: 'website',
    images: image ? [{ url: image }] : [{ url: '/imagen_logo_svg.svg', alt: 'Dieta Integral' }],
  }
}

type TwArgs = { title: string; description: string; image?: string }
export function buildTwitter({ title, description, image }: TwArgs) {
  return {
    card: 'summary_large_image' as const,
    title,
    description,
    images: [image || '/imagen_logo_svg.svg'],
  }
}
