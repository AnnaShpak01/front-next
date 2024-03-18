import Link from 'next/link'
import styles from './appHeader.module.scss'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { checkAuthorization } from '../LoginComponent/CheckAuthorization'

const AppHeader = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const isAuthorized = checkAuthorization(session)

  return (
    <header className={styles.app__header}>
      <h1 className={styles.app__title}>
        <Link href="/">
          <div className={styles.logo}></div>
          Your Personal Library
        </Link>
      </h1>
      <nav className={styles.app__menu}>
        <ul>
          <li>
            <Link href="/" className={`link ${pathname === '/' ? styles.active : ''}`}>
              Books Log
            </Link>
          </li>
          |
          <li>
            <Link
              href="/bookshelf"
              className={`link ${pathname === '/bookshelf' ? styles.active : ''}`}>
              Bookshelves
            </Link>
          </li>
          |
          <li>
            <Link
              href="/challenges"
              className={`link ${pathname === '/challenges' ? styles.active : ''}`}>
              Challenges
            </Link>
          </li>
        </ul>
      </nav>
      {isAuthorized && (
        <div className={styles.signout}>
          <span className={styles.user}>Hello, {session?.user?.email}</span>
          <span className={styles.separator}>|</span>
          <button type="button" className={styles.btn_signout} onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      )}
    </header>
  )
}

export default AppHeader
