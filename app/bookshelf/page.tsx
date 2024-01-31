'use client'

import React, { useEffect, useState } from 'react'

import App from '../../components/app/_app'
import Shelves from './Shelves'
//import { fetchDataServer, updateBookItem } from '@api/api'
import { BookType } from 'components/reducers/books'

export default function Home({ initialBooksData }: { initialBooksData: BookType[] }) {
  const [books, setBooks] = useState(initialBooksData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/bookshelf')
        const initialBooksData: BookType[] = await response.json()
        setBooks(initialBooksData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  const updateBook = async (id: string, updatedData: BookType) => {
    try {
      const response = await fetch(`/api/books/update?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        throw new Error('Failed to update book item')
      }

      const data: BookType = await response.json()

      const updatedBookData: BookType[] = books.map((item: BookType) =>
        item.id === id ? { ...item, ...data } : item
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

// export async function getServerSideProps() {
//   try {
//     const response = await fetch('http://localhost:3000/api/books')
//     const initialBooksData: BookType[] = await response.json()

//     return {
//       props: {
//         initialBooksData,
//       },
//     }
//   } catch (error) {
//     console.error('Error fetching initial book data:', error)

//     return {
//       props: {
//         initialBooksData: [],
//       },
//     }
//   }
// }
