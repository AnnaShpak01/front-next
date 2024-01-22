'use client'

import React, { useCallback, useState } from 'react'
import App from '../components/app/_app'
import BooksPage from '../components/booksPage/BooksPage'
//import { fetchDataServer, updateBookItem } from 'api/api'
import { FiltersType } from 'components/reducers/filters'
import { BookType } from 'components/reducers/books'

export default function Home({
  initialBooksData,
  filtersData,
}: {
  initialBooksData: BookType[]
  filtersData: FiltersType[]
}) {
  const [books, setBooks] = useState(initialBooksData)

  // const updateBooks = async (id: string, updatedData: BookType) => {
  //   try {
  //     const updatedBookItem = await updateBookItem(id, updatedData)
  //     const updatedBookData = books.map((item) =>
  //       item.id === updatedBookItem.id ? updatedBookItem : item
  //     )
  //     setBooks(updatedBookData)
  //   } catch (error) {
  //     console.error('Error updating bingo item:', error)
  //   }
  // }
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

export async function getServerSideProps() {
  try {
    const [booksResponse, filtersResponse] = await Promise.all([
      fetch('http://localhost:3000/api/books'),
      fetch('http://localhost:3000/api/filters'),
    ])

    const [initialBooksData, filtersData] = await Promise.all([
      booksResponse.json(),
      filtersResponse.json(),
    ])

    return {
      props: {
        initialBooksData,
        filtersData,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)

    return {
      props: {
        initialBooksData: [],
        filtersData: [],
      },
    }
  }
}
