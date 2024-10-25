import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BooksListItem from '../../../components/BooksListItem/BooksListItem'

describe('BooksListItem', () => {
  const mockOnDelete = jest.fn()

  const bookProps = {
    name: 'Book 1',
    author: 'Author 1',
    genre: 'Fiction',
    pages: 200,
    status: 'read',
    onDelete: mockOnDelete,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders book details correctly', () => {
    render(<BooksListItem {...bookProps} />)

    expect(screen.getByTestId('book-item')).toBeInTheDocument()
    expect(screen.getByText(bookProps.name)).toBeInTheDocument()
    expect(screen.getByText(bookProps.author)).toBeInTheDocument()
    expect(screen.getByText(bookProps.genre)).toBeInTheDocument()
    expect(screen.getByText(bookProps.pages)).toBeInTheDocument()
    expect(screen.getByText(bookProps.status)).toBeInTheDocument()
  })

  it('calls onDelete when delete button is clicked', () => {
    render(<BooksListItem {...bookProps} />)

    const deleteButton = screen.getByLabelText(/close/i)
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalled()
  })
})
