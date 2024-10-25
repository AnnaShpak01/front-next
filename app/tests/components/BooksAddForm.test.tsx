import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BooksAddForm from '../../../components/BooksAddForm/BooksAddForm'
import { useSession } from 'next-auth/react'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

describe('BooksAddForm', () => {
  const mockUpdateList = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders form fields correctly', () => {
    const mockFilterData = [
      { _id: '1', name: 'reading', label: 'Reading', className: 'filter-class' },
      { _id: '2', name: 'finished', label: 'Finished', className: 'filter-class' },
    ]

    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        loggedUser: 'test_token',
      },
    })

    render(<BooksAddForm filterData={mockFilterData} updateList={mockUpdateList} />)

    expect(screen.getByLabelText(/Name of the book/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Genre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Cover/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Pages/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Color/i)).toBeInTheDocument()
  })

  test('handles fetch errors gracefully', async () => {
    const mockFilterData = [
      { _id: '1', name: 'reading', label: 'Reading', className: 'filter-class' },
      { _id: '2', name: 'finished', label: 'Finished', className: 'filter-class' },
    ]

    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        loggedUser: 'test_token',
      },
    })

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock

    render(<BooksAddForm filterData={mockFilterData} updateList={mockUpdateList} />)

    fireEvent.change(screen.getByLabelText(/Name of the book/i), {
      target: { value: 'Test Book' },
    })
    fireEvent.submit(screen.getByRole('button', { name: /Add Book/i }))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
      expect(mockUpdateList).not.toHaveBeenCalled()
    })
  })
})
