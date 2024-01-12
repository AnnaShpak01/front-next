'use client'

import React, { useState } from 'react'
import App from '../components/app/_app'
import BooksPage from '../components/booksPage/BooksPage'
import { fetchDataServer, updateBookItem } from 'api/api'
import { FiltersType } from 'components/reducers/filters'
import { BookType } from 'components/reducers/books'

export default function Home({
  booksData,
  filtersData,
}: {
  booksData: BookType[]
  filtersData: FiltersType[]
}) {
  const [books, setBooks] = useState(booksData)

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

  const updateDeleteList = (newBooks: BookType[]) => {
    setBooks(newBooks)
  }

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

export const getServerSideProps = async () => {
  try {
    const [booksData, filtersData] = await Promise.all([
      fetchDataServer('/books'),
      fetchDataServer('/filters'),
    ])

    return {
      props: {
        booksData,
        filtersData,
      },
    }
  } catch (error) {
    console.error('Error fetching data', error)
    return {
      props: {
        booksData: [],
        filtersData: [],
      },
    }
  }
}
