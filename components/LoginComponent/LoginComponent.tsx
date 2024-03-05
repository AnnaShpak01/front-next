import SignIn from 'components/SignIn/SignIn'
import { useSession } from 'next-auth/react'
import JWToken from '../LoginComponent/jwt'

export default function LoginComponent({ children }: { children: any }) {
  const { data: session, status } = useSession()

  //useEffect(() => {
  //if (status === 'authenticated' && session) {
  //  const jwtToken = newSession.loggedUser;
  //  console.log('JWT Token:', jwtToken);
  //  // Теперь вы можете использовать значение JWT токена в вашем компоненте
  //}
  //}, [session, status]);

  if (session) {
    console.log(session.loggedUser)
    //const token = JWToken()
    //console.log(token)
    return <>{children}</>
  }
  return <SignIn />
}
