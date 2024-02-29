import SignIn from 'components/SignIn/SignIn'
import { useSession } from 'next-auth/react'

export default function LoginComponent({ children }: { children: any }) {
  const { data: session } = useSession()

  if (session) {
    return <>{children}</>
  }
  return <SignIn />
}
