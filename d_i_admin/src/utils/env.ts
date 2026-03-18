export function getClientBaseUrl() {
  return process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
}
