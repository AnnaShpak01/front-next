import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BookChallengePage from '../../challenges/BookChallengePage'
import { BingoType } from 'components/types'

// eslint-disable-next-line react/display-name
jest.mock('../../challenges/BingoPage', () => () => <div>BingoPage Component</div>)
// eslint-disable-next-line react/display-name
jest.mock('../../challenges/AlphabetChallenge', () => () => <div>AlphabetChallenge Component</div>)

describe('BookChallengePage', () => {
  const mockUpdateBingo = jest.fn()

  const mockBingoData: BingoType[] = [
    { _id: '1', task: 'Task 1', color: 'red', status: false },
    { _id: '2', task: 'Task 2', color: 'blue', status: true },
  ]

  it('should render BingoPage and AlphabetChallenge components correctly', () => {
    render(<BookChallengePage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />)

    expect(screen.getByText('BingoPage Component')).toBeInTheDocument()
    expect(screen.getByLabelText('Bingo Challenge')).toBeChecked()

    expect(screen.getByLabelText('Alphabet Challenge')).toBeInTheDocument()
  })

  it('should switch to Alphabet Challenge when clicked', () => {
    render(<BookChallengePage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />)

    const alphabetTab = screen.getByLabelText('Alphabet Challenge')
    fireEvent.click(alphabetTab)

    expect(screen.getByText('AlphabetChallenge Component')).toBeInTheDocument()

    expect(alphabetTab).toBeChecked()
  })

  it('should pass bingoData and updateBingo to BingoPage', () => {
    render(<BookChallengePage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />)

    expect(screen.getByText('BingoPage Component')).toBeInTheDocument()
  })
})
