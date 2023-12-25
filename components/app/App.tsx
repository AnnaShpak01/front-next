'use client'

import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AppHeader from '../appHeader/AppHeader'
import Spinner from '../spinner/Spinner'
import BookShelvesPage from '../../pages/bookshelf/index'
import BooksPage from '../booksPage/BooksPage'
import BookChallengePage from '../../pages/challenges/index'

import styles from './app.module.scss'
//import '../../styles/global.scss'

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/bookshelf" element={<BookShelvesPage />} />
            <Route path="/challenges" element={<BookChallengePage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
