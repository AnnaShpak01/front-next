import React from 'react'
import { render, screen } from '@testing-library/react'
import MyPage from '../page'
import dynamic from 'next/dynamic'

// Мокаем динамический импорт
// eslint-disable-next-line react/display-name
jest.mock('next/dynamic', () => jest.fn(() => () => <div>Mock MainPage</div>))

describe('MyPage', () => {
  it('should render the dynamically imported LazyComponent', () => {
    // Рендерим компонент MyPage
    render(<MyPage />)

    // Проверяем, что LazyComponent (MockMainPage) был отрендерен
    expect(screen.getByText('Mock MainPage')).toBeInTheDocument()
  })
})
