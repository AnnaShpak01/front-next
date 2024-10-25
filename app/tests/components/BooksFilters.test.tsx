import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import BooksFilters from '../../../components/BooksFilters/BooksFilters'
import { FiltersType } from '../../../components/types'

const mockFilters: FiltersType[] = [
  { _id: '1', name: 'read', label: 'Read', className: 'filter-read' },
  { _id: '2', name: 'unread', label: 'Unread', className: 'filter-unread' },
]

describe('BooksFilters component', () => {
  it('renders filters correctly', () => {
    const setActiveFilter = jest.fn()
    render(
      <BooksFilters
        filterData={mockFilters}
        activeFilter="read"
        setActiveFilter={setActiveFilter}
      />
    )

    expect(screen.getByText('Read')).toBeInTheDocument()
    expect(screen.getByText('Unread')).toBeInTheDocument()
    expect(screen.getByText('Read')).toHaveClass('active')
  })

  it('calls setActiveFilter when a filter button is clicked', () => {
    const setActiveFilter = jest.fn()
    render(
      <BooksFilters
        filterData={mockFilters}
        activeFilter="unread"
        setActiveFilter={setActiveFilter}
      />
    )

    fireEvent.click(screen.getByText('Read'))

    expect(setActiveFilter).toHaveBeenCalledWith('read')
  })

  it('renders Spinner when there is no filter data', () => {
    const setActiveFilter = jest.fn()
    render(<BooksFilters filterData={[]} activeFilter="" setActiveFilter={setActiveFilter} />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
