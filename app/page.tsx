import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/clients'

function LoginPage() {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.replace('/main') // Перенаправляем на другую страницу, если пользователь авторизован
    }
  }, [session])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}

export default LoginPage
