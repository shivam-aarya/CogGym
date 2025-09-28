import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from './db'
import { UserRole } from '@/types'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'email',
      credentials: {
        email: { label: 'Email', type: 'email' }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null

        try {
          // For demo purposes, create/find user with just email
          const user = await db.user.upsert({
            where: { email: credentials.email },
            update: {
              name: credentials.email.split('@')[0]
            },
            create: {
              email: credentials.email,
              name: credentials.email.split('@')[0],
              role: 'PARTICIPANT'
            }
          })

          return {
            id: user.id,
            email: user.email,
            name: user.name || user.email.split('@')[0],
            role: user.role
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as UserRole || UserRole.PARTICIPANT
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },

    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id
        token.role = user.role || UserRole.PARTICIPANT
        token.name = user.name
        token.email = user.email
      }
      return token
    }
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  session: { strategy: 'jwt' },

  secret: process.env.NEXTAUTH_SECRET,
}