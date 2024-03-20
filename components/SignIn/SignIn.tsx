import { signIn } from 'next-auth/react'
import styles from './SignIn.module.scss'
import { usePathname } from 'next/navigation'

export default function SignIn() {
  const pathname = usePathname()

  const handleGoogleSignIn = () => {
    signIn('Google', { callbackUrl: pathname })
  }

  return (
    <div className={styles.signform}>
      <div className={styles.loginform}>
        <div className={styles.title}>Sign in to login</div>
        <button type="button" className={styles.btn_signin} onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
