import SignIn from 'components/SignIn/SignIn'
import { useSession } from 'next-auth/react'
import JWToken from '../LoginComponent/jwt'

export default function LoginComponent({ children }: { children: any }) {
  const { data: session, status } = useSession()

  if (session) {
    return <>{children}</>
  }
  return <SignIn />
}
