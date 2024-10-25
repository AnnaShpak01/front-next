'use client'

import LoginComponent from '../../components/LoginComponent/LoginComponent'
import styles from './app.module.scss'
import GlobalStyle from './global'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import AppHeader from '../../components/AppHeader/AppHeader'

const App = ({ children }: { children: any }) => {
  return (
    <div className={styles.app}>
      <SessionProvider>
        <LoginComponent>
          <GlobalStyle />
          <AppHeader />
          <div>{children}</div>
        </LoginComponent>
      </SessionProvider>
    </div>
  )
}

export default App
