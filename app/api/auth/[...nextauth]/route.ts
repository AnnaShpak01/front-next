import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import SignToken from 'utils/signinToken'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      name: 'Google',
      id: 'Google',
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // ...add more providers here
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
      session.loggedUser = token.loggedUser
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
