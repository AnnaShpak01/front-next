import styles from './booksListItem.module.scss'

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
    <div className={styles['card-of-book']}>
      <div className={styles['card-name']}>{name}</div>
      <div className={styles['card-author']}>{author}</div>
      <div className={styles['card-genre']}>{genre}</div>
      <div className={styles['card-pages']}>{pages}</div>
      <div className={styles['card-status']}>{status}</div>
      <div>
        <span
          onClick={onDelete}
          className={` ${styles.badge}  ${styles.bordered}  ${styles['rounded-pill']}`}>
          <button type="button" className={styles['btn-close']} aria-label="Close"></button>
        </span>
      </div>
    </div>
  )
}

export default BooksListItem
