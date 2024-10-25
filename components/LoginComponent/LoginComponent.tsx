import SignIn from '../../components/SignIn/SignIn'
import { useSession, signOut } from 'next-auth/react'
import React, { useEffect } from 'react'
import { checkAuthorization } from '../LoginComponent/CheckAuthorization'

const LoginComponent = ({ children }: { children: any }) => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      const isAuthorized = checkAuthorization(session)
      if (!isAuthorized) {
        signOut()
      }
    }
  }, [session])

  return <>{session ? <>{children}</> : <SignIn />}</>
}

export default LoginComponent
