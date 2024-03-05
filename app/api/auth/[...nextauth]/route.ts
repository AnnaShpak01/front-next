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
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   const data = {
    //     firstName: 'name',
    //     lastName: 'name2',
    //     email: 'maul@i.ua',
    //     profileUrl: 'http://some.image.com/image',
    //   }
    //   return true
    // },
    async jwt({ token, user, account }) {
      if (account) {
        const userLoggedIn = await SignToken(user?.email as string)
        token.loggedUser = userLoggedIn
      }
      return token
    },
    async session({ session, token, user }) {
      //session.loggedUser = token.loggedUser;
      const newSession = { ...session, loggedUser: token.loggedUser }
      return newSession
    },
  },
  // session: {
  //   strategy: 'jwt',
  // },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
