'use client'

import React, { Suspense, useCallback, useEffect, useState } from 'react'
import BooksPage from '../components/booksPage/BooksPage'
import { FiltersType, BookType } from 'components/types'
import Loading from './loading'
import { useSession } from 'next-auth/react'

export default function Page() {
  const [books, setBooks] = useState<BookType[]>([])
  const [filtersData, setFilters] = useState<FiltersType[]>([])
  const { data: session, status } = useSession()
  const token = session?.loggedUser
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksResponse, filtersResponse] = await Promise.all([
          fetch('http://localhost:3000/api/bookshelf', config),
          fetch('http://localhost:3000/api', config),
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
    <Suspense fallback={<Loading />}>
      <BooksPage
        booksData={books}
        filterData={filtersData}
        updateList={updateList}
        updateDeleteList={updateDeleteList}
      />
    </Suspense>
  )
}
