import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import BookshelfPage from '../../bookshelf/bookshelfPage'
import { BookType } from '../../../components/types'

import { useSession } from 'next-auth/react'

const mockBooks: BookType[] = [
  {
    _id: '1',
    name: 'Book One',
    author: 'Author One',
    imgsrc: 'image1.jpg',
    description: 'Description for Book One',
    status: 'New Books',
    color: 'blue',
    genre: 'Fiction',
    pages: 300,
  },
  {
    _id: '2',
    name: 'Book Two',
    author: 'Author Two',
    imgsrc: 'image2.jpg',
    description: 'Description for Book Two',
    status: 'New Books',
    color: 'green',
    genre: 'Non-fiction',
    pages: 200,
  },
]

jest.mock('next-auth/react')

describe('BookshelfPage', () => {
  beforeEach(() => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: { loggedUser: 'mocked_token' },
      status: 'authenticated',
    })

    ;(fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockBooks),
    })
  })

  it('should render books', () => {
    render(<BookshelfPage initialBooksData={mockBooks} />)

    expect(screen.getByText('Book One')).toBeInTheDocument()
    expect(screen.getByText('Book Two')).toBeInTheDocument()
  })

  it('should fetch and update books when component mounts', async () => {
    render(<BookshelfPage initialBooksData={[]} />)

    await waitFor(() => {
      expect(screen.getByText('Book One')).toBeInTheDocument()
      expect(screen.getByText('Book Two')).toBeInTheDocument()
    })
  })

  it('should update book status on updateBook call', async () => {
    const updatedBook = { ...mockBooks[0], status: 'In Progress' }

    jest.fn().mockResolvedValueOnce(updatedBook)

    const { rerender } = render(<BookshelfPage initialBooksData={mockBooks} />)

    await waitFor(async () => {
      await fetch(`/api/bookshelf?id=${updatedBook._id}`, {
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

    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })
})
