import React from 'react'
import { render, screen } from '@testing-library/react'
import MyPage from '../../challenges/page'
import dynamic from 'next/dynamic'

// eslint-disable-next-line react/display-name
jest.mock('next/dynamic', () => jest.fn(() => () => <div>Mock ChallengesPage</div>))

describe('MyPage', () => {
  it('should render the dynamically imported LazyComponent', () => {
    render(<MyPage />)

    expect(screen.getByText('Mock ChallengesPage')).toBeInTheDocument()
  })
})
