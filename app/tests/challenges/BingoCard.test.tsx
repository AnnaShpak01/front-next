import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BingoCard, { BingoTypeCard } from '../../challenges/BingoCard'

describe('BingoCard component', () => {
  const mockUpdateBingo = jest.fn()

  const mockProps: BingoTypeCard = {
    id: '1',
    side: 'Test Side',
    color: 'blue',
    status: false,
    bingoClass: 'some-class',
    updateBingo: mockUpdateBingo,
  }

  it('should render the card with correct text on the front', () => {
    const { getByTestId } = render(<BingoCard {...mockProps} />)
    expect(getByTestId('card-front')).toBeInTheDocument()
    expect(getByTestId('card-front')).toHaveTextContent('Test Side')
  })

  it('should render the card with correct text on the back', () => {
    const { getByTestId } = render(<BingoCard {...mockProps} />)
    expect(getByTestId('card-back')).toBeInTheDocument()
    expect(getByTestId('card-back')).toHaveTextContent('Test Side')
  })

  it('should call updateBingo with correct data when clicked', () => {
    const { getByTestId } = render(<BingoCard {...mockProps} />)
    const cardFront = getByTestId('card-front')

    // Используем fireEvent для клика
    fireEvent.click(cardFront)

    expect(mockUpdateBingo).toHaveBeenCalledTimes(1) // Проверяем количество вызовов
    expect(mockUpdateBingo).toHaveBeenCalledWith('1', {
      task: 'Test Side',
      color: 'blue',
      status: true,
      _id: '1',
    })
  })

  it('should apply the correct class based on props', () => {
    const { container } = render(<BingoCard {...mockProps} />)
    const card = container.querySelector('.some-class')
    expect(card).toBeInTheDocument()
  })
})
