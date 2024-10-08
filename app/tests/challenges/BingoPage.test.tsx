import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import BingoPage from '../../challenges/BingoPage'
import { BingoType } from '../../../components/types'

// eslint-disable-next-line react/display-name
jest.mock('../../challenges/BingoCard', () => () => <div>BingoCard Mock</div>)
// eslint-disable-next-line react/display-name
jest.mock('../../../components/spinner/Spinner', () => () => <div>Spinner Mock</div>)

describe('BingoPage Component', () => {
  const mockUpdateBingo = jest.fn()

  it('should render loading state when no bingo data is available', () => {
    render(<BingoPage updateBingo={mockUpdateBingo} />)

    expect(screen.getByText('Loading Bingo data...')).toBeInTheDocument()
    expect(screen.getByText('Spinner Mock')).toBeInTheDocument()
  })

  it('should render BingoCards when bingo data is provided', async () => {
    const mockBingoData: BingoType[] = [
      { _id: '1', task: 'Task 1', color: 'red', status: false },
      { _id: '2', task: 'Task 2', color: 'blue', status: true },
    ]

    render(<BingoPage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />)

    await waitFor(() => {
      expect(screen.getByText('BingoCard Mock')).toBeInTheDocument()
    })

    expect(screen.getAllByText('BingoCard Mock').length).toBe(mockBingoData.length)
  })

  it('should call updateBingo when BingoCard is updated', async () => {
    const mockBingoData: BingoType[] = [{ _id: '1', task: 'Task 1', color: 'red', status: false }]

    render(<BingoPage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />)

    await waitFor(() => {
      expect(mockUpdateBingo).toHaveBeenCalled()
    })
  })
})
