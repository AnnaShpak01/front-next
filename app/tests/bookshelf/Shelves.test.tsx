import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Shelves from '../../bookshelf/Shelves' // Укажите правильный путь к компоненту
import { BookType } from '../../../components/types'

// Создаем макеты данных
const mockBooksData: BookType[] = [
  {
    id: '1',
    name: 'Book One',
    author: 'Author One',
    imgsrc: '/image1.jpg',
    description: 'Description for Book One',
    status: 'New Books',
    color: 'red',
    genre: '',
    pages: 0,
  },
  {
    id: '2',
    name: 'Book Two',
    author: 'Author Two',
    imgsrc: '/image2.jpg',
    description: 'Description for Book Two',
    status: 'In Progress',
    color: 'blue',
    genre: '',
    pages: 0,
  },
]

// Создаем макет функции обновления книги
const mockUpdateBook = jest.fn()

describe('Shelves Component', () => {
  beforeEach(() => {
    render(<Shelves booksData={mockBooksData} updateBook={mockUpdateBook} />)
  })

  test('should render books on the shelves', () => {
    // Проверяем, что книги отображаются на полках
    expect(screen.getByText('Book One')).toBeInTheDocument()
    expect(screen.getByText('Book Two')).toBeInTheDocument()
  })

  test('should open modal on double click', () => {
    // Делаем двойной клик на книге
    fireEvent.doubleClick(screen.getByText('Book One'))

    // Проверяем, что открывается модальное окно
    expect(screen.getByText('Description for Book One')).toBeInTheDocument()
  })

  test('should close modal on button click', () => {
    // Делаем двойной клик на книге
    fireEvent.doubleClick(screen.getByText('Book One'))

    // Нажимаем на кнопку закрытия модального окна
    fireEvent.click(screen.getByRole('button', { name: /×/ }))

    // Проверяем, что модальное окно закрылось
    expect(screen.queryByText('Description for Book One')).not.toBeInTheDocument()
  })

  test('should update book status on drop', () => {
    // Имитируем событие перетаскивания
    const dropEvent = {
      preventDefault: jest.fn(),
      dataTransfer: {
        getData: jest.fn(() => '1'), // id книги, которую перетаскиваем
        dropEffect: 'move',
        effectAllowed: 'move',
        items: [],
        files: [],
        types: [],
      },
    } as unknown as DragEvent // Имитация DragEvent

    // Находим элемент полки и вызываем функцию onDrop
    const shelfElement = screen.getByText('New Books').closest('div') // Находим элемент полки
    if (shelfElement) {
      fireEvent.drop(shelfElement, dropEvent) // Вызываем событие drop
    }

    // Проверяем, что функция обновления была вызвана
    expect(mockUpdateBook).toHaveBeenCalledWith('1', { ...mockBooksData[0], status: 'New Books' })
  })
})
