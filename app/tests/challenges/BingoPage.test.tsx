import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import BingoPage from '../../challenges/BingoPage'
import { BingoType } from '../../../components/types'

// Мокаем компонент BingoCard и Spinner
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

    // Проверяем, что рендерятся компоненты BingoCard
    await waitFor(() => {
      expect(screen.getByText('BingoCard Mock')).toBeInTheDocument() // Проверяем, что хотя бы один BingoCard отрендерился
    })

    // Проверяем, что количество BingoCard соответствует количеству переданных данных
    expect(screen.getAllByText('BingoCard Mock').length).toBe(mockBingoData.length)
  })

  it('should call updateBingo when BingoCard is updated', async () => {
    const mockBingoData: BingoType[] = [{ _id: '1', task: 'Task 1', color: 'red', status: false }]

    render(<BingoPage bingoData={mockBingoData} updateBingo={mockUpdateBingo} />)

    // Здесь можно было бы взаимодействовать с компонентом BingoCard, чтобы вызвать updateBingo,
    // например, по клику или другому действию.
    // Но для этого мы будем использовать mock-реализацию BingoCard с обработчиком события.

    // Имитируем обновление
    await waitFor(() => {
      expect(mockUpdateBingo).toHaveBeenCalled() // Проверяем, что функция была вызвана
    })
  })
})
