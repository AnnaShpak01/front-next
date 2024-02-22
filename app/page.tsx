'use client'
import { useSession, SessionProvider, signIn, signOut } from 'next-auth/react'

export function Component() {
  const { data: session } = useSession()

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/main' })
  }

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button type="button" onClick={handleGoogleSignIn}>
        Sign in
      </button>
    </>
  )
}

export default function PageLogIn() {
  return (
    <SessionProvider>
      <Component />
    </SessionProvider>
  )
}
