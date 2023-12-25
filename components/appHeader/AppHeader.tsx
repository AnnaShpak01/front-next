import Link from 'next/link'
import styles from './appHeader.module.scss'

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
            <Link
              // style={({ isActive }) => ({
              //   color: isActive ? '#6a5126' : 'rgb(164 143 122)',
              // })}
              href="/">
              Books Log
            </Link>
          </li>
          |
          <li>
            <Link
              // style={({ isActive }) => ({
              //   color: isActive ? '#6a5126' : 'rgb(164 143 122)',
              // })}
              href="/bookshelf">
              Bookshelves
            </Link>
          </li>
          |
          <li>
            <Link
              // style={({ isActive }) => ({
              //   color: isActive ? '#6a5126' : 'rgb(164 143 122)',
              // })}
              href="/challenges">
              Challenges
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
