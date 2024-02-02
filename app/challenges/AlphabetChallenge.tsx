import { useEffect, useMemo, useState } from 'react'
import { BookType } from '../../components/reducers/books'
import styles from './challenges.module.scss'

const AlphabetChallenge = () => {
  const [books, setBooksData] = useState<BookType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/bookshelf')
        const initialBingoData: BookType[] = await response.json()
        setBooksData(initialBingoData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const shelves = useMemo(() => {
    const filteredBooks = books.slice()
    return filteredBooks
  }, [books])

  const rows: any = [[], []]

  for (let i = 65; i < 91; i++) {
    let book = shelves.find(
      (item: BookType) => item.name?.substr(0, 1).toUpperCase() === String.fromCharCode(i)
    )
    rows[i < 78 ? 0 : 1].push(
      <div className={styles['line-alpha']} key={i}>
        <div className={styles['title-book']}>{String.fromCharCode(i)}</div>
        <div className={styles['book-row']}>
          {book ? book.name.substr(1, book.name.length - 1) : ''}
        </div>
      </div>
    )
  }
  return (
    <div className={styles['alfa-row']}>
      <div className={styles['alfa-col']}>{rows[0]}</div>
      <div className={styles['alfa-col']}>{rows[1]}</div>
    </div>
  )
}

export default AlphabetChallenge
