import Link from 'next/link'
import styles from './appHeader.module.scss'
import NavLink from './NavLink'

const AppHeader = () => {
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
            <NavLink href="/">Books Log</NavLink>
          </li>
          |
          <li>
            <NavLink href="/bookshelf">Bookshelves</NavLink>
          </li>
          |
          <li>
            <NavLink href="/challenges">Challenges</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
