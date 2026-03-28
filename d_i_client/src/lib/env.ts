/**
 * Runtime environment variable validation.
 *
 * Call `validateEnv()` once at startup (e.g. in instrumentation.ts)
 * to fail fast when required variables are missing.
 * The getter-based `env` object can be imported anywhere for type-safe access.
 */

const REQUIRED = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'DATABASE_URL',
  'AUTH_SECRET',
] as const

const OPTIONAL_DEFAULTS: Record<string, string> = {
  NEXT_PUBLIC_SITE_URL: 'https://dietaintegral.fit',
  NEXT_PUBLIC_CLIENT_URL: 'http://localhost:3000',
  NEXT_PUBLIC_BASE_URL: '',
  ADMIN_ORIGIN: 'http://localhost:3001',
  YT_API_KEY: '',
  YT_CHANNEL_ID: '',
  BLOB_READ_WRITE_TOKEN: '',
  NEXT_REVALIDATE_TOKEN: '',
  NEXT_PUBLIC_REVALIDATE_TOKEN: '',
}

/** Validates required env vars at runtime. Throws if any are missing. */
export function validateEnv() {
  const missing = REQUIRED.filter((k) => !process.env[k])
  if (missing.length) {
    throw new Error(
      `Missing required environment variables:\n  ${missing.join('\n  ')}`
    )
  }
}

/** Type-safe accessor — reads process.env lazily, with fallbacks for optional vars. */
export function getEnv(key: typeof REQUIRED[number] | keyof typeof OPTIONAL_DEFAULTS): string {
  return process.env[key] || OPTIONAL_DEFAULTS[key] || ''
}
