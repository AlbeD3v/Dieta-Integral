import { PrismaClient } from '@prisma/client'

// Ensure the PrismaClient is a singleton across hot reloads in dev
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = global as any as { prisma?: PrismaClient }

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
