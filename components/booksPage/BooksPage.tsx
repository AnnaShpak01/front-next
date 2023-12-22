import BooksList from '../booksList/BooksList'
import BooksAddForm from '../booksAddForm/BooksAddForm'
import BooksFilters from '../booksFilters/BooksFilters'
import styles from './booksPage.module.scss'

const BooksPage = () => {
  return (
    <div className={` ${styles.content} ${styles['book-page']}`}>
      <div>
        <BooksFilters />
        <div className={styles['table-bordered']}>
          <div className={styles['head-of-table']}>
            <div>Name of the book</div>
            <div>Author</div>
            <div>Genre</div>
            <div>Pages</div>
            <div>Status</div>
            <div>Delete</div>
          </div>
          <BooksList />
        </div>
      </div>
      <div className={styles.content__interactive}>
        <BooksAddForm />
      </div>
    </div>
  )
}

export default BooksPage
