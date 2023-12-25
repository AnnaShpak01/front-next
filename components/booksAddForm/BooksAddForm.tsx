'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useGetFiltersQuery } from '../../api/apiSlice'
import { useCreateBookMutation } from '../../api/apiSlice'
import { InitStateType } from '../reducers/filters'
import styles from './booksAddForm.module.scss'

type FilterType = {
  id: string
  name: string
  label: string
  className: string
}

const BooksAddForm = () => {
  const [bookName, setBookName] = useState<string>('')
  const [bookDescr, setBookDescr] = useState<string>('')
  const [bookAuthor, setBookAuthor] = useState<string>('')
  const [bookGenre, setBookGenre] = useState<string>('')
  const [bookColor, setBookColor] = useState<string>('')
  const [bookStatus, setBookStatus] = useState<string>('')
  const [bookPages, setBookPages] = useState<number>(0)
  const [bookImg, setBookImg] = useState<string>('')

  const [createBook] = useCreateBookMutation()
  const { data: filters = [] } = useGetFiltersQuery('Filters')
  const { filtersLoadingStatus } = useSelector((state: any) => state.filters)

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const newBook = {
      id: uuidv4(),
      name: bookName,
      author: bookAuthor,
      description: bookDescr,
      genre: bookGenre,
      status: bookStatus,
      color: bookColor,
      imgsrc: bookImg,
      pages: bookPages,
    }

    createBook(newBook).unwrap()

    setBookName('')
    setBookDescr('')
    setBookAuthor('')
    setBookColor('')
    setBookGenre('')
    setBookImg('')
    setBookPages(0)
    setBookStatus('')
  }

  const renderFilters = (filters: FilterType[], status: string) => {
    if (status === 'loading') {
      return <option>Loading of elements</option>
    } else if (status === 'error') {
      return <option>Loading Error</option>
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }: { name: string; label: string }) => {
        // eslint-disable-next-line
        if (name === 'all') return

        return (
          <option key={name} value={name}>
            {label}
          </option>
        )
      })
    }
  }

  return (
    <form
      className={` ${styles.bordered} ${styles['p-4']}  ${styles['shadow-lg']} ${styles.rounded}`}
      onSubmit={onSubmitHandler}>
      <div className={styles['mb-3']}>
        <label htmlFor="name" className={`${styles['form-label']} ${styles['fs-5']}`}>
          Name of the book{' '}
        </label>
        <input
          required
          type="text"
          name="name"
          className={` ${styles['form-control']} ${styles.bordered} `}
          id="name"
          placeholder="Name of the book"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
      </div>

      <div className={styles['mb-3']}>
        <label htmlFor="author" className={`${styles['form-label']} ${styles['fs-5']}`}>
          Author
        </label>
        <input
          required
          type="text"
          name="author"
          className={` ${styles['form-control']} ${styles.bordered} `}
          id="author"
          placeholder="Author of the book"
          value={bookAuthor}
          onChange={(e) => setBookAuthor(e.target.value)}
        />
      </div>

      <div className={styles['mb-3']}>
        <label htmlFor="description" className={`${styles['form-label']} ${styles['fs-5']}`}>
          Description
        </label>
        <textarea
          required
          name="description"
          className={` ${styles['form-control']} ${styles.bordered} `}
          id="description"
          placeholder="Short summary about book"
          style={{ height: '130px' }}
          value={bookDescr}
          onChange={(e) => setBookDescr(e.target.value)}
        />
      </div>

      <div className={styles['mb-3']}>
        <label htmlFor="genre" className={`${styles['form-label']} ${styles['fs-5']}`}>
          Genre
        </label>
        <input
          required
          type="text"
          name="genre"
          className={` ${styles['form-control']} ${styles.bordered} `}
          id="genre"
          placeholder="Genre of book"
          value={bookGenre}
          onChange={(e) => setBookGenre(e.target.value)}
        />
      </div>
      <div className={styles['mb-3']}>
        <label htmlFor="cover" className={`${styles['form-label']} ${styles['fs-5']}`}>
          Cover
        </label>
        <input
          required
          type="text"
          name="cover"
          className={` ${styles['form-control']} ${styles.bordered} `}
          id="cover"
          placeholder="Link on image"
          value={bookImg}
          onChange={(e) => setBookImg(e.target.value)}
        />
      </div>

      <div className={styles['mb-3']}>
        <label htmlFor="status" className={`${styles['form-label']} ${styles['fs-5']}`}>
          Status
        </label>
        <select
          required
          className={` ${styles['form-select']} ${styles.bordered} `}
          id="status"
          name="status"
          value={bookStatus}
          onChange={(e) => setBookStatus(e.target.value)}>
          <option value="">Status of reading...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>
      <div className={styles['mb-3']}>
        <label htmlFor="pages" className={`${styles['form-label']} ${styles['fs-5']}`}>
          Pages
        </label>
        <input
          required
          name="pages"
          type="text"
          className={` ${styles['form-control']} ${styles.bordered} `}
          id="pages"
          placeholder="Count of pages"
          value={bookPages}
          onChange={(e) => setBookPages(parseInt(e.target.value))}
        />
      </div>
      <div className={styles['mb-3']}>
        <label htmlFor="element" className={`${styles['form-label']} ${styles['fs-5']}`}>
          Color
        </label>
        <select
          required
          className={` ${styles['form-select']} ${styles.bordered} `}
          id="element"
          name="element"
          value={bookColor}
          onChange={(e) => setBookColor(e.target.value)}>
          <option value="">Choose color of the cover...</option>
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="brown">Brown</option>
          <option value="pink">Pink</option>
          <option value="violet">Violet</option>
          <option value="orange">Orange</option>
        </select>
      </div>

      <button type="submit" className={` ${styles.btn} ${styles['btn-primary']}`}>
        Add Book
      </button>
    </form>
  )
}

export default BooksAddForm
