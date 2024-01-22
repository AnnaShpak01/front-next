'use client'

import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { BookType } from '../reducers/books'
import BooksListItem from '../booksListItem/BooksListItem'
import Spinner from '../spinner/Spinner'
import styles from './bookslist.module.scss'

const BooksList = ({
  booksData,
  updateDeleteList,
}: {
  booksData?: BookType[]
  updateDeleteList: Function
}) => {
  const activeFilter = useSelector((state: any) => state.filters.activeFilter)

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
      const response = await fetch(`/api/books/delete?id=${id}`, {
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
  // if (isLoading) {
  //   return <Spinner />
  // } else if (isError) {
  //   return <h5 className={`${styles['text-center']} ${styles['mt-5']}`}>Loading error</h5>
  // }

  return (
    <TransitionGroup component="div">
      {filteredBooks.length === 0 && (
        <CSSTransition timeout={0}>
          <h5 className={`${styles['text-center']} ${styles['mt-5']}`}>No Books yet </h5>
        </CSSTransition>
      )}
      {Array.isArray(filteredBooks) &&
        filteredBooks.length !== 0 &&
        filteredBooks.map((item: BookType) => {
          return (
            <CSSTransition key={item.id} timeout={500}>
              <BooksListItem {...item} onDelete={() => onDelete(item.id)} />
            </CSSTransition>
          )
        })}
    </TransitionGroup>
  )
}

export default BooksList
