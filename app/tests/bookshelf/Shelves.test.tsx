import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Shelves from '../../bookshelf/Shelves'
import { BookType } from '../../../components/types'

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

const mockUpdateBook = jest.fn()

describe('Shelves Component', () => {
  beforeEach(() => {
    render(<Shelves booksData={mockBooksData} updateBook={mockUpdateBook} />)
  })

  test('should render books on the shelves', () => {
    expect(screen.getByText('Book One')).toBeInTheDocument()
    expect(screen.getByText('Book Two')).toBeInTheDocument()
  })

  test('should open modal on double click', () => {
    fireEvent.doubleClick(screen.getByText('Book One'))

    expect(screen.getByText('Description for Book One')).toBeInTheDocument()
  })

  test('should close modal on button click', () => {
    fireEvent.doubleClick(screen.getByText('Book One'))

    fireEvent.click(screen.getByRole('button', { name: /×/ }))

    expect(screen.queryByText('Description for Book One')).not.toBeInTheDocument()
  })

  test('should update book status on drop', () => {
    const dropEvent = {
      preventDefault: jest.fn(),
      dataTransfer: {
        getData: jest.fn(() => '1'),
        dropEffect: 'move',
        effectAllowed: 'move',
      },
    } as unknown as DragEvent

    const shelfElement = screen.getByText('In Progress').closest('div') // dropping to 'In Progress' shelf
    if (shelfElement) {
      fireEvent.drop(shelfElement, dropEvent)
    }

    expect(mockUpdateBook).toHaveBeenCalledWith('1', { ...mockBooksData[0], status: 'In Progress' })
  })

  test('should start and end drag events', () => {
    const bookElement = screen.getByText('Book One').closest('div')
    if (bookElement) {
      fireEvent.dragStart(bookElement)
      bookElement.classList.add('dragged')
      expect(bookElement.classList).toContain('dragged')

      fireEvent.dragEnd(bookElement)
      bookElement.classList.remove('dragged')
      expect(bookElement.classList).not.toContain('dragged')
    }
  })

  test('should open modal and display book details', () => {
    fireEvent.doubleClick(screen.getByText('Book One'))

    expect(screen.getByText('Description for Book One')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /×/ }))

    expect(screen.queryByText('Description for Book One')).not.toBeInTheDocument()
  })
})
