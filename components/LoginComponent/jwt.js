import { useSession } from 'next-auth/react'

export default function JWToken() {
  const { data: session, status } = useSession()

  // jwt_token
  const jwt_token = session.loggedUser

  return { jwt_token }
}
