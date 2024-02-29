'use client'

import React, { Suspense, useCallback, useEffect, useState } from 'react'
import BooksPage from '../components/booksPage/BooksPage'
import { FiltersType, BookType } from 'components/types'
import App from '../components/app/_app'
import Loading from './loading'
import styles from './page.module.css'

export default function Page() {
  const [books, setBooks] = useState<BookType[]>([])
  const [filtersData, setFilters] = useState<FiltersType[]>([])

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
