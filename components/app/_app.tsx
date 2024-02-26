'use client'

import AppHeader from '../appHeader/AppHeader'
import styles from './app.module.scss'
import GlobalStyle from './global'
import { SessionProvider } from 'next-auth/react'

const App = ({ children }: { children: any }) => {
  return (
    <>
      <GlobalStyle />
      <div className={styles.app}>
        <AppHeader />
        {children}
      </div>
    </>
  )
}

export default App
