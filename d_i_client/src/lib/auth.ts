import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/iniciar-sesion',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On sign-in, persist DB user fields into the JWT
      if (user) {
        token.id = user.id!
        token.role = user.role ?? 'user'
        token.plan = user.plan ?? 'free'
        token.onboardingComplete = user.onboardingComplete ?? false
      }
      // Allow updating the token when session is updated (e.g. after onboarding)
      if (trigger === 'update' && session) {
        if (session.onboardingComplete !== undefined) token.onboardingComplete = session.onboardingComplete
        if (session.role !== undefined) token.role = session.role
        if (session.plan !== undefined) token.plan = session.plan
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role
        session.user.plan = token.plan
        session.user.onboardingComplete = token.onboardingComplete
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith('/')) return `${baseUrl}${url}`
      return baseUrl
    },
  },
})
