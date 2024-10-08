import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import BookshelfPage from '../../bookshelf/BookshelfPage'
import { BookType } from '../../../components/types'

const mockBooks: BookType[] = [
  {
    id: '1',
    name: 'Book One',
    author: 'Author One',
    imgsrc: 'image1.jpg',
    description: 'Description for Book One',
    status: 'read',
    color: 'blue',
    genre: 'Fiction',
    pages: 300,
  },
  {
    id: '2',
    name: 'Book Two',
    author: 'Author Two',
    imgsrc: 'image2.jpg',
    description: 'Description for Book Two',
    status: 'unread',
    color: 'green',
    genre: 'Non-fiction',
    pages: 200,
  },
]

describe('BookshelfPage', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should render books', () => {
    render(<BookshelfPage initialBooksData={mockBooks} />)

    expect(screen.getByText('Book One')).toBeInTheDocument()
    expect(screen.getByText('Book Two')).toBeInTheDocument()
  })

  it('should fetch and update books when component mounts', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockBooks))

    render(<BookshelfPage initialBooksData={[]} />)

    await waitFor(() => {
      expect(screen.getByText('Book One')).toBeInTheDocument()
      expect(screen.getByText('Book Two')).toBeInTheDocument()
    })
  })

  it('should update book status on updateBook call', async () => {
    const updatedBook = { ...mockBooks[0], status: 'reading' }

    fetch.mockResponseOnce(JSON.stringify(updatedBook))

    const { rerender } = render(<BookshelfPage initialBooksData={mockBooks} />)

    await waitFor(async () => {
      await fetch(`/api/bookshelf?id=${updatedBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer undefined`,
        },
        body: JSON.stringify(updatedBook),
      })

      expect(fetch).toHaveBeenCalled()
      rerender(<BookshelfPage initialBooksData={[updatedBook, ...mockBooks.slice(1)]} />)
    })

    expect(screen.getByText('reading')).toBeInTheDocument()
  })
})
