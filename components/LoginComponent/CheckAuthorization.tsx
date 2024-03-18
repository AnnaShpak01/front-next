import { signOut } from 'next-auth/react'
import { jwtDecode } from 'jwt-decode'

export const checkAuthorization = (session: any) => {
  if (session) {
    const decoded = jwtDecode(session.loggedUser)
    if (decoded.exp && typeof decoded.exp === 'number') {
      const tokenExp = new Date(decoded.exp * 1000)
      const now = new Date()
      if (tokenExp > now) {
        return true
      } else {
        signOut()
        return false
      }
    }
  }
  return false
}
