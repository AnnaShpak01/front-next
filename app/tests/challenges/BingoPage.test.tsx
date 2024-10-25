import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import BingoPage from '../../challenges/BingoPage'
import { BingoType } from '../../../components/types'
import { waitFor } from '@testing-library/react'

jest.mock('../../challenges/BingoCard', () => ({
  __esModule: true,
  default: ({ id, side, color, status, updateBingo }: any) => (
    <div
      data-testid="bingo-card"
      onClick={() => updateBingo(id, { _id: id, task: side, color, status: !status })}>
      Flip {id}
    </div>
  ),
}))

const mockBingoData: BingoType[] = [
  { _id: '1', task: 'Task 1', color: 'red', status: false },
  { _id: '2', task: 'Task 2', color: 'green', status: true },
]

const mockUpdateBingo = jest.fn()

describe('BingoPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state when no bingo data is provided', () => {
    render(<BingoPage bingoData={[]} updateBingo={mockUpdateBingo} />)

    expect(screen.getByText(/Loading Bingo data/i)).toBeInTheDocument()

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders bingo cards when data is provided', () => {
    render(<BingoPage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />)

    const cards = screen.getAllByTestId('bingo-card')
    expect(cards).toHaveLength(mockBingoData.length)
  })

  it('calls updateBingo when a card is flipped', async () => {
    render(<BingoPage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />)

    const card = screen.getByText('Flip 1')

    await act(async () => {
      fireEvent.click(card)
    })

    expect(mockUpdateBingo).toHaveBeenCalledWith('1', {
      _id: '1',
      task: 'Task 1',
      color: 'red',
      status: true,
    })
  })

  it('updates local state when handleUpdateBingo is called', async () => {
    render(<BingoPage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />)

    const card = screen.getByText('Flip 1')

    await act(async () => {
      fireEvent.click(card)
    })

    expect(mockUpdateBingo).toHaveBeenCalledTimes(1)
  })

  it('updates cards when bingoData changes', async () => {
    const { rerender } = render(
      <BingoPage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />
    )

    expect(screen.getByText('Flip 1')).toBeInTheDocument()

    const updatedBingoData: BingoType[] = [
      { _id: '3', task: 'Task 3', color: 'blue', status: false },
    ]

    await act(async () => {
      rerender(<BingoPage bingoData={updatedBingoData} updateBingo={mockUpdateBingo} />)
    })

    expect(screen.getByText('Flip 3')).toBeInTheDocument()
  })
  it('handles empty bingoData correctly', () => {
    const { rerender } = render(<BingoPage bingoData={[]} updateBingo={mockUpdateBingo} />)

    expect(screen.getByText(/Loading Bingo data/i)).toBeInTheDocument()

    rerender(<BingoPage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />)

    expect(screen.getAllByTestId('bingo-card')).toHaveLength(mockBingoData.length)
  })

  it('updates cards asynchronously when bingoData changes', async () => {
    const { rerender } = render(<BingoPage bingoData={[]} updateBingo={mockUpdateBingo} />)

    expect(screen.getByText(/Loading Bingo data/i)).toBeInTheDocument()

    rerender(<BingoPage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />)

    await waitFor(() => {
      expect(screen.getAllByTestId('bingo-card')).toHaveLength(mockBingoData.length)
    })
  })
})
