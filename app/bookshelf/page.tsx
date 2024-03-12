'use client'

import React, { useEffect, useState } from 'react'

import Shelves from './Shelves'
import { BookType } from 'components/types'
import { useSession } from 'next-auth/react'

export default function Home({ initialBooksData }: { initialBooksData: BookType[] }) {
  const [books, setBooks] = useState(initialBooksData)
  const { data: session, status } = useSession()
  const token = session?.loggedUser
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  useEffect(() => {
    console.log(config.headers)
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/bookshelf', config)
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
      const response = await fetch(`/api/bookshelf?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
  return <Shelves booksData={books} updateBook={updateBook} />
}
