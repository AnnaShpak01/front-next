'use client'

import Link from 'next/link'
import styles from './appHeader.module.scss'
import { usePathname } from 'next/navigation'

const AppHeader = () => {
  const pathname = usePathname()
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
    </header>
  )
}

export default AppHeader
