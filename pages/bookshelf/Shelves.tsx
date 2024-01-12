'use client'

import { useEffect, useMemo } from 'react'
import { BookType } from '../../components/reducers/books'
import styles from './bookshelf.module.scss'

type ShelvesPageProps = {
  booksData: BookType[]
  updateBook: (id: string, updatedData: BookType) => void
}

const Shelves: React.FC<ShelvesPageProps> = ({ booksData, updateBook }) => {
  const shelves = useMemo(() => {
    const filteredBooks = booksData.slice()
    return filteredBooks
  }, [booksData])

  // useEffect(() => {
  //   bindModal('.card', '.popup_engineer', '.popup_engineer .popup_close')
  // })
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
      if (shelf.id.toString() === data?.toString()) {
        updateBook(shelf.id, { ...shelf, status: newStatus })
        return { ...shelf, status: newStatus }
      } else {
        return shelf
      }
    })
  }

  // const bindModal = (triggerSelector: string, modalSelector: string, closeSelector: string) => {
  //   const trigger: any = document.querySelectorAll(triggerSelector),
  //     modal: any = document.querySelector(modalSelector),
  //     close: any = document.querySelector(closeSelector),
  //     intro: any = document.querySelector('#intro')

  //   trigger.forEach((item: HTMLElement) => {
  //     item.addEventListener('dblclick', (e: MouseEvent) => {
  //       if (e.target) {
  //         e.preventDefault()
  //       }
  //       let showShelf = shelves.find((shelf: BookType) => shelf.id === item.id)
  //       intro.innerHTML = `
  //           <img class= '${styles.pic}' src='${showShelf?.imgsrc}'></div>
  //           <div class='${styles['book-name']}'> ${showShelf?.name} </div>
  //           <div class='${styles['book-author']}'>${showShelf?.author}</div>
  //           <div class='${styles['book-description']}'>${showShelf?.description}</div>
  //           `
  //       modal.style.display = 'block'
  //       document.body.style.overflow = 'hidden'
  //     })
  //   })

  //   close?.addEventListener('click', () => {
  //     modal.style.display = 'none'
  //     document.body.style.overflow = ''
  //   })

  //   modal?.addEventListener('click', (e: Event) => {
  //     if (e.target === modal) {
  //       modal.style.display = 'none'
  //       document.body.style.overflow = ''
  //     }
  //   })
  // }

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
                {arrBook.map((book: BookType) => (
                  <div
                    className={`${styles.card} ${book.color}`}
                    key={book.name}
                    id={book.id}
                    draggable
                    onDragStart={(e: any) => onDragStart(e)}
                    onDragEnd={(e: any) => onDragEnd(e)}>
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

  let pending = shelves.filter((data: BookType) => data.status === 'In Progress')
  let done = shelves.filter((data: BookType) => data.status === 'Completed')
  let newOrder = shelves.filter((data: BookType) => data.status === 'New Books')
  let waiting = shelves.filter((data: BookType) => data.status === 'Favourites')

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
        <div className={styles.popup_dialog}>
          <div className={`${styles.popup_content} ${styles['text-center']}`}>
            <button type="button" className={styles.popup_close}>
              <strong>&times;</strong>
            </button>
            <div className={styles.popup_form}>
              <div id="intro"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shelves
