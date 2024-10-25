import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BooksList from '../../../components/BooksList/BooksList'
import { BookType } from '../../../components/types'
import { useSession } from 'next-auth/react'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

const mockBooksData: BookType[] = [
  {
    _id: '1',
    name: 'Book 1',
    status: 'read',
    author: 'Author 1',
    description: 'description 1',
    imgsrc: 'codeimg1',
    color: 'Blue',
    genre: 'fiction',
    pages: 123,
  },
  {
    _id: '2',
    name: 'Book 2',
    status: 'read',
    author: 'Author 2',
    description: 'description 21',
    imgsrc: 'codeimg2',
    color: 'Yellow',
    genre: 'fiction',
    pages: 423,
  },
]

describe('BooksList', () => {
  const mockUpdateDeleteList = jest.fn()

  beforeEach(() => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: { loggedUser: 'token' },
      status: 'authenticated',
    })
  })

  it('renders loading when no books are available', () => {
    render(<BooksList booksData={[]} updateDeleteList={mockUpdateDeleteList} activeFilter="all" />)

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('renders the correct number of books when booksData is provided', () => {
    render(
      <BooksList
        booksData={mockBooksData}
        updateDeleteList={mockUpdateDeleteList}
        activeFilter="all"
      />
    )

    const books = screen.getAllByTestId('book-item')
    expect(books.length).toBe(2)
  })

  it('filters books based on activeFilter', () => {
    render(
      <BooksList booksData={mockBooksData} activeFilter="unread" updateDeleteList={jest.fn()} />
    )

    expect(screen.queryByText('Book 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Book 2')).not.toBeInTheDocument()
  })

  it('calls onDelete when delete button is clicked', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock

    render(
      <BooksList
        booksData={mockBooksData}
        updateDeleteList={mockUpdateDeleteList}
        activeFilter="all"
      />
    )

    const deleteButtons = screen.getAllByLabelText(/close/i)
    fireEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(mockUpdateDeleteList).toHaveBeenCalledWith('1')
    })
  })
})
