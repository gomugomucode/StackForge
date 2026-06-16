import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const authConfig = {
  providers: [
    GitHub,
    Google,
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user && token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
} satisfies NextAuthConfig
