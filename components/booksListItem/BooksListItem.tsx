import styles from './booksListItem.module.scss'
import React from 'react'

type BookItemType = {
  name: string
  author: string
  genre: string
  pages: number
  status: string
  onDelete: () => void
}

const BooksListItem = ({ name, author, genre, pages, status, onDelete }: BookItemType) => {
  return (
    <div data-testid="book-item" className={styles['card-of-book']}>
      <div className={styles['card-name']}>{name}</div>
      <div className={styles['card-author']}>{author}</div>
      <div className={styles['card-genre']}>{genre}</div>
      <div className={styles['card-pages']}>{pages}</div>
      <div className={styles['card-status']}>{status}</div>
      <div>
        <button
          type="button"
          onClick={onDelete}
          className={`${styles.badge} ${styles.bordered} ${styles['rounded-pill']}`}>
          <span className={styles['btn-close']} aria-label="Close">
            X
          </span>
        </button>
      </div>
    </div>
  )
}

export default BooksListItem
