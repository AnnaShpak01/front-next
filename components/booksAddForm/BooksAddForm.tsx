'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FiltersType } from '../types'
import styles from './booksAddForm.module.scss'
import { useSession } from 'next-auth/react'

const BooksAddForm = ({
  filterData,
  updateList,
}: {
  filterData: FiltersType[]
  updateList: Function
}) => {
  const [bookData, setBookData] = useState({
    name: '',
    description: '',
    author: '',
    genre: '',
    color: '',
    status: '',
    pages: 0,
    img: '',
  })

  const { data: session, status } = useSession()
  const token = session?.loggedUser
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }

  const onSubmitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const newBook = {
      id: uuidv4(),
      name: bookData.name,
      author: bookData.author,
      description: bookData.description,
      genre: bookData.genre,
      status: bookData.status,
      color: bookData.color,
      imgsrc: bookData.img,
      pages: bookData.pages,
    }

    try {
      const response = await fetch('http://localhost:3000/api/bookshelf/', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newBook),
      })

      if (!response.ok) {
        throw new Error('Failed to add a new book')
      }

      const json = await response.json()
      updateList(json)
    } catch (error) {
      console.error('Failed to add a new book', error)
    }

    setBookData({
      name: '',
      description: '',
      author: '',
      genre: '',
      color: '',
      status: '',
      pages: 0,
      img: '',
    })
  }

  const renderFilters = (filters: FiltersType[]) => {
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
      className={` ${styles.bordered} ${styles['p-4']}  ${styles.form} ${styles['shadow-lg']} ${styles.rounded}`}
      onSubmit={onSubmitHandler}>
      <div className={` ${styles['mb-3']} ${styles.formline} `}>
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
          value={bookData.name}
          onChange={(e) =>
            setBookData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
      </div>

      <div className={` ${styles['mb-3']} ${styles.formline} `}>
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
          value={bookData.author}
          onChange={(e) =>
            setBookData((prev) => ({
              ...prev,
              author: e.target.value,
            }))
          }
        />
      </div>

      <div className={` ${styles['mb-3']} ${styles.formline} `}>
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
          value={bookData.description}
          onChange={(e) =>
            setBookData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>

      <div className={` ${styles['mb-3']} ${styles.formline} `}>
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
          value={bookData.genre}
          onChange={(e) =>
            setBookData((prev) => ({
              ...prev,
              genre: e.target.value,
            }))
          }
        />
      </div>
      <div className={` ${styles['mb-3']} ${styles.formline} `}>
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
          value={bookData.img}
          onChange={(e) =>
            setBookData((prev) => ({
              ...prev,
              img: e.target.value,
            }))
          }
        />
      </div>

      <div className={` ${styles['mb-3']} ${styles.formline} `}>
        <label htmlFor="status" className={`${styles['form-label']} ${styles['fs-5']}`}>
          Status
        </label>
        <select
          required
          className={` ${styles['form-select']} ${styles.bordered} `}
          id="status"
          name="status"
          value={bookData.status}
          onChange={(e) =>
            setBookData((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }>
          <option value="">Status of reading...</option>
          {renderFilters(filterData)}
        </select>
      </div>
      <div className={` ${styles['mb-3']} ${styles.formline} `}>
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
          value={bookData.pages}
          onChange={(e) =>
            setBookData((prev) => ({
              ...prev,
              pages: parseInt(e.target.value),
            }))
          }
        />
      </div>
      <div className={` ${styles['mb-3']} ${styles.formline} `}>
        <label htmlFor="element" className={`${styles['form-label']} ${styles['fs-5']}`}>
          Color
        </label>
        <select
          required
          className={` ${styles['form-select']} ${styles.bordered} `}
          id="element"
          name="element"
          value={bookData.color}
          onChange={(e) =>
            setBookData((prev) => ({
              ...prev,
              color: e.target.value,
            }))
          }>
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
