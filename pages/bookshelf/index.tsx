'use client'

import React, { useState } from 'react'

import App from '../../components/app/_app'
import Shelves from './Shelves'
import { fetchDataServer, updateBookItem } from 'api/api'
import { BookType } from 'components/reducers/books'

export default function Home({ booksData }: { booksData: BookType[] }) {
  const [books, setBooks] = useState(booksData)

  const updateBook = async (id: string, updatedData: BookType) => {
    try {
      const updatedBookItem = await updateBookItem(id, updatedData)
      const updatedBookData = books.map((item) =>
        item.id === updatedBookItem.id ? updatedBookItem : item
      )
      setBooks(updatedBookData)
    } catch (error) {
      console.error('Error updating book item:', error)
    }
  }
  return (
    <App>
      <Shelves booksData={books} updateBook={updateBook} />
    </App>
  )
}

export const getServerSideProps = async () => {
  try {
    const booksData = await fetchDataServer('/books')

    return {
      props: {
        booksData,
      },
    }
  } catch (error) {
    console.error('Error fetching data', error)
    return {
      props: {
        booksData: [],
      },
    }
  }
}
