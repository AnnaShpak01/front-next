'use client'

import React, { useCallback, useEffect, useState } from 'react'
import BooksPage from '../components/booksPage/BooksPage'
import { FiltersType } from 'components/reducers/filters'
import { BookType } from 'components/reducers/books'
import App from '../components/app/_app'
//import { GetServerSideProps } from 'next'

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
      <BooksPage
        booksData={books}
        filterData={filtersData}
        updateList={updateList}
        updateDeleteList={updateDeleteList}
      />
    </App>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const [booksResponse, filtersResponse] = await Promise.all([
//       fetch('http://localhost:3000/api/books'),
//       fetch('http://localhost:3000/api/filters'),
//     ])

//     const [initialBooksData, filtersData] = await Promise.all([
//       booksResponse.json(),
//       filtersResponse.json(),
//     ])

//     return {
//       props: {
//         initialBooksData,
//         filtersData,
//       },
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error)

//     return {
//       props: {
//         initialBooksData: [],
//         filtersData: [],
//       },
//     }
//   }
// }
