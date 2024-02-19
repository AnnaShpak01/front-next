'use client'

import { useMemo } from 'react'
import { BookType } from '../types'
import BooksListItem from '../booksListItem/BooksListItem'
import Loading from 'app/main/loading'

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
    const filteredBooks = booksData ? booksData.slice() : []

    if (activeFilter === 'all') {
      return filteredBooks
    } else {
      return filteredBooks.filter((item: BookType) => item.status === activeFilter)
    }
  }, [booksData, activeFilter])

  const onDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/bookshelf?id=${id}`, {
        method: 'DELETE',
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
          <BooksListItem key={item.id} {...item} onDelete={() => onDelete(item.id)} />
        ))}
    </div>
  )
}

export default BooksList
