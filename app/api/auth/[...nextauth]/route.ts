import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import SignToken from '../../../../utils/signToken'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      name: 'Google',
      id: 'Google',
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        const userLoggedIn = await SignToken(user?.email as string)
        token.loggedUser = userLoggedIn
      }
      return token
    },
    async session({ session, token, user }) {
      const newSession = { ...session, loggedUser: token.loggedUser }
      return newSession
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
