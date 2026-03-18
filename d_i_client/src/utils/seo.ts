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
  const ogImage = image || 'https://dietaintegral.fit/og-image.png'
  return {
    title,
    description,
    url,
    siteName: 'Dieta Integral',
    locale: 'es_ES',
    type: 'website',
    images: [{ url: ogImage, alt: title, width: 1200, height: 630 }],
  }
}

type TwArgs = { title: string; description: string; image?: string }
export function buildTwitter({ title, description, image }: TwArgs) {
  return {
    card: 'summary_large_image' as const,
    title,
    description,
    images: [image || 'https://dietaintegral.fit/og-image.png'],
  }
}
