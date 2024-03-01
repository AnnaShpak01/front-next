import SignIn from 'components/SignIn/SignIn'
import { useSession } from 'next-auth/react'

export default function LoginComponent({ children }: { children: any }) {
  const { data: session } = useSession()
  const jwt_token = session?.loggedUser
  console.log(jwt_token)
  if (session) {
    return <>{children}</>
  }
  return <SignIn />
}
