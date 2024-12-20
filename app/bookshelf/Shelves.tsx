'use client'

import React, { useMemo, useState } from 'react'
import { BookType } from '../../components/types'
import styles from './bookshelf.module.scss'
import Modal from 'react-modal'
import Spinner from '../../components/spinner/Spinner'
import Image from 'next/image'

type ShelvesPageProps = {
  booksData: BookType[]
  updateBook: (id: string, updatedData: BookType) => void
}

const Shelves: React.FC<ShelvesPageProps> = ({ booksData, updateBook }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null)

  const shelves = useMemo(() => {
    const filteredBooks = booksData && booksData.length > 0 ? booksData.slice() : []
    return filteredBooks
  }, [booksData])

  const onDragStart = (evt: DragEvent) => {
    let element = evt.currentTarget as Element
    element?.classList.add('dragged')
    if (evt.dataTransfer && evt.currentTarget) {
      evt.dataTransfer.setData('text/plain', element.id)
      evt.dataTransfer.effectAllowed = 'move'
    }
  }

  const onDragEnd = (evt: DragEvent) => {
    let element = evt.currentTarget as Element
    element.classList.remove('dragged')
  }

  const onDragEnter = (evt: DragEvent) => {
    evt.preventDefault()
    let element = evt.currentTarget as Element
    element.classList.add('dragged-over')
    if (evt.dataTransfer) evt.dataTransfer.dropEffect = 'move'
  }

  const onDragLeave = (evt: DragEvent) => {
    let currentTarget = evt.currentTarget as Element
    let newTarget = evt.relatedTarget as Element
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget) return
    evt.preventDefault()
    let element = evt.currentTarget as Element
    element.classList.remove('dragged-over')
  }

  const onDragOver = (evt: DragEvent) => {
    evt.preventDefault()
    if (evt.dataTransfer) evt.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (evt: DragEvent, value: boolean, newStatus: string) => {
    evt.preventDefault()
    let element = evt.currentTarget as Element
    element.classList.remove('dragged-over')
    let data = evt.dataTransfer?.getData('text/plain')
    shelves.map((shelf: BookType) => {
      if (shelf._id.toString() === data?.toString()) {
        updateBook(shelf._id, { ...shelf, status: newStatus })
        return { ...shelf, status: newStatus }
      } else {
        return shelf
      }
    })
  }

  const openModal = (bookId: string) => {
    const showShelf = shelves.find((shelf: BookType) => shelf._id === bookId)
    if (showShelf) {
      setSelectedBook(showShelf)
      setModalIsOpen(true)
    }
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const shelfForBook = (
    classType: string,
    statusshelf: string,
    headlabel: string,
    arrBook: BookType[]
  ) => {
    return (
      <div
        className={`${styles[classType]} ${styles['small-box']}`}
        onDragLeave={(e: any) => onDragLeave(e)}
        onDragEnter={(e: any) => onDragEnter(e)}
        onDragEnd={(e: any) => onDragEnd(e)}
        onDragOver={(e: any) => onDragOver(e)}
        onDrop={(e: any) => onDrop(e, false, statusshelf)}>
        <section className={styles.drag_container}>
          <h4 className={styles.h4}>{headlabel}</h4>
          <div className={`${styles.container} ${styles['inner-container']}`}>
            <div className={styles.drag_column}>
              <div className={styles.drag_row}>
                {!arrBook && <Spinner />}
                {arrBook?.map((book: BookType) => (
                  <div
                    className={`${styles.card} ${book.color}`}
                    key={book._id}
                    id={book._id}
                    draggable
                    onDragStart={(e: any) => onDragStart(e)}
                    onDragEnd={(e: any) => onDragEnd(e)}
                    onDoubleClick={() => openModal(book._id)}>
                    <div className={styles.card_right}>
                      <div className={styles.name}>{book.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  let pending = shelves?.filter((data: BookType) => data.status === 'In Progress')
  let done = shelves?.filter((data: BookType) => data.status === 'Completed')
  let newOrder = shelves?.filter((data: BookType) => data.status === 'New Books')
  let waiting = shelves?.filter((data: BookType) => data.status === 'Favourites')

  return (
    <div className={styles.container}>
      <div className={styles.shelf}>
        {shelfForBook('order', 'New Books', 'New Books', newOrder)}
        {shelfForBook('pending', 'In Progress', 'In Progress', pending)}
      </div>
      <div className={styles.shelf}>
        {shelfForBook('waiting', 'Favourites', 'Favourites', waiting)}
        {shelfForBook('done', 'Completed', 'Completed', done)}
      </div>
      <div className={styles.popup_engineer}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Book Modal"
          ariaHideApp={false}>
          {selectedBook && (
            <div className={styles.popup_intro}>
              <button type="button" className={styles.popup_close} onClick={closeModal}>
                <strong>&times;</strong>
              </button>
              <div className={styles.popup_form}>
                <Image
                  className={styles.pic}
                  src={selectedBook.imgsrc}
                  alt={selectedBook.name}
                  width="150"
                  height="300"
                />
                <div className={styles['book-name']}>{selectedBook.name}</div>
                <div className={styles['book-author']}>{selectedBook.author}</div>
                <div className={styles['book-description']}>{selectedBook.description}</div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}

export default Shelves
