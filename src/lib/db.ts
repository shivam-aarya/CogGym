import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Check if database is available
export const isDatabaseAvailable = !!process.env.DATABASE_URL

// Create Prisma client only if DATABASE_URL is provided
let prismaClient: PrismaClient | null = null

try {
  if (isDatabaseAvailable) {
    prismaClient = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    })

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaClient
    }
  }
} catch {
  console.warn('Database connection not available. Running in demo mode with mock data.')
}

// Export db with null fallback - consumers should check isDatabaseAvailable
export const db = prismaClient

// Helper to safely use database
export function withDatabase<T>(
  callback: (db: PrismaClient) => Promise<T>,
  fallback: () => Promise<T>
): Promise<T> {
  if (isDatabaseAvailable && db) {
    return callback(db)
  }
  return fallback()
}