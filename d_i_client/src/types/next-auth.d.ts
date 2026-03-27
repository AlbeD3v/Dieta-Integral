import { DefaultSession, DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module '@auth/core/adapters' {
  interface AdapterUser {
    role: string
    plan: string
    onboardingComplete: boolean
  }
}

declare module 'next-auth' {
  interface User {
    role?: string
    plan?: string
    onboardingComplete?: boolean
  }

  interface Session {
    user: {
      id: string
      role: string
      plan: string
      onboardingComplete: boolean
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    plan: string
    onboardingComplete: boolean
  }
}
