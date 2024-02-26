'use client'

import React, { Suspense, useCallback, useEffect, useState } from 'react'
import BooksPage from '../components/booksPage/BooksPage'
import { FiltersType, BookType } from 'components/types'
import App from '../components/app/_app'
import Loading from './loading'
import { useSession, SessionProvider, signIn } from 'next-auth/react'
import styles from './page.module.css'

export function Component() {
  const { data: session } = useSession()

  const handleGoogleSignIn = () => {
    signIn('Google', { callbackUrl: '/' })
  }

  if (session) {
    return <Page />
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

export function Page() {
  const [books, setBooks] = useState<BookType[]>([])
  const [filtersData, setFilters] = useState<FiltersType[]>([])
  const { data: session } = useSession()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksResponse, filtersResponse] = await Promise.all([
          fetch('http://localhost:3000/api/bookshelf'),
          fetch('http://localhost:3000/api'),
        ])

        const [initialBooksData, initialFiltersData] = await Promise.all([
          booksResponse.json(),
          filtersResponse.json(),
        ])

        setBooks(initialBooksData)
        setFilters(initialFiltersData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const updateList = (newBook: BookType) => {
    setBooks((prevBooks) => [...prevBooks, newBook])
  }

  const updateDeleteList = useCallback(
    (deletedBookId: string) => {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== deletedBookId))
    },
    [setBooks]
  )

  return (
    <App>
      <Suspense fallback={<Loading />}>
        <BooksPage
          booksData={books}
          filterData={filtersData}
          updateList={updateList}
          updateDeleteList={updateDeleteList}
        />
      </Suspense>
    </App>
  )
}

export default function PageLogIn() {
  return (
    <SessionProvider>
      <Component />
    </SessionProvider>
  )
}
