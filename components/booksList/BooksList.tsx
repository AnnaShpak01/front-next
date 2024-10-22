'use client'

import { useMemo } from 'react'
import { BookType } from '../types'
import BooksListItem from '../BooksListItem/BooksListItem'
import Loading from 'app/loading'
import { useSession } from 'next-auth/react'

const BooksList = ({
  booksData,
  updateDeleteList,
  activeFilter,
}: {
  booksData?: BookType[]
  updateDeleteList: Function
  activeFilter: string
}) => {
  const filteredBooks = useMemo(() => {
    const filteredBooks = booksData && booksData.length > 0 ? booksData.slice() : []

    if (activeFilter === 'all') {
      return filteredBooks
    } else {
      return filteredBooks.filter((item: BookType) => item.status === activeFilter)
    }
  }, [booksData, activeFilter])

  const { data: session, status } = useSession()
  const token = session?.loggedUser
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }

  const onDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/bookshelf?id=${id}`, {
        method: 'DELETE',
        headers: config.headers,
      })

      if (!response.ok) {
        throw new Error('Failed to delete book')
      }

      updateDeleteList(id)
    } catch (error) {
      console.error('Failed to delete book', error)
    }
  }

  return (
    <div>
      {' '}
      {filteredBooks.length === 0 && <Loading />}
      {Array.isArray(filteredBooks) &&
        filteredBooks.length !== 0 &&
        filteredBooks.map((item: BookType) => (
          <BooksListItem key={item._id} {...item} onDelete={() => onDelete(item._id)} />
        ))}
    </div>
  )
}

export default BooksList
