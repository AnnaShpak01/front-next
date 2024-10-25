import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import Shelves from '../../bookshelf/Shelves'
import { BookType } from '../../../components/types'

const mockBooks: BookType[] = [
  {
    _id: '1',
    name: 'Book One',
    author: 'Author One',
    description: 'Description for Book One',
    imgsrc: '/image1.jpg',
    color: 'red',
    status: 'New Books',
    genre: '',
    pages: 0,
  },
  {
    _id: '2',
    name: 'Book Two',
    author: 'Author Two',
    description: 'Description for Book Two',
    imgsrc: '/image2.jpg',
    color: 'blue',
    status: 'In Progress',
    genre: '',
    pages: 0,
  },
]

const mockUpdateBook = jest.fn()

describe('Shelves Component', () => {
  it('renders books on the shelves', () => {
    render(<Shelves booksData={mockBooks} updateBook={mockUpdateBook} />)
    expect(screen.getByText('Book One')).toBeInTheDocument()
    expect(screen.getByText('Book Two')).toBeInTheDocument()
  })

  it('opens modal with correct book data on double click', () => {
    render(<Shelves booksData={mockBooks} updateBook={mockUpdateBook} />)

    const bookCard = screen.getAllByText('Book One').find((el) => el.closest('.card'))

    fireEvent.doubleClick(bookCard!)

    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()

    expect(within(modal).getByText('Book One')).toBeInTheDocument()
    expect(within(modal).getByText('Author One')).toBeInTheDocument()
    expect(within(modal).getByText('Description for Book One')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', () => {
    render(<Shelves booksData={mockBooks} updateBook={mockUpdateBook} />)

    const bookCard = screen.getAllByText('Book One').find((el) => el.closest('.card'))

    fireEvent.doubleClick(bookCard!)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /×/ }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
