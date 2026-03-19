export function getClientBaseUrl() {
  const url = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
  return url.replace(/\/+$/, '')
}
