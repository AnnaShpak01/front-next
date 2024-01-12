import BooksList from '../booksList/BooksList'
import BooksAddForm from '../booksAddForm/BooksAddForm'
import BooksFilters from '../booksFilters/BooksFilters'
import styles from './booksPage.module.scss'
import { BookType } from 'components/reducers/books'
import { FiltersType } from 'components/reducers/filters'

const BooksPage = ({
  booksData,
  filterData,
  updateList,
  updateDeleteList,
}: {
  booksData?: BookType[]
  filterData: FiltersType[]
  updateList: Function
  updateDeleteList: Function
}) => {
  return (
    <div className={` ${styles.content} ${styles['book-page']}`}>
      <div>
        <BooksFilters filterData={filterData} />
        <div className={styles['table-bordered']}>
          <div className={styles['head-of-table']}>
            <div>Name of the book</div>
            <div>Author</div>
            <div>Genre</div>
            <div>Pages</div>
            <div>Status</div>
            <div>Delete</div>
          </div>
          <BooksList booksData={booksData} updateDeleteList={updateDeleteList} />
        </div>
      </div>
      <div className={styles.content__interactive}>
        <BooksAddForm filterData={filterData} updateList={updateList} />
      </div>
    </div>
  )
}

export default BooksPage
