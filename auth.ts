import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/server/db/client'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    GitHub,
    Google,
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user && token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
})
