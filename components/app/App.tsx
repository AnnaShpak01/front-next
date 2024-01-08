'use client'

import { Provider } from 'react-redux'
import AppHeader from '../appHeader/AppHeader'

import styles from './app.module.scss'
import store from '../store'

const App = ({ children }: { children: any }) => {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <AppHeader />
        {children}
      </div>
    </Provider>
  )
}

export default App
