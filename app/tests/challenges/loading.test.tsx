import React from 'react'
import { render, screen } from '@testing-library/react'
import Loading from '../../challenges/loading'
import Spinner from '../../../components/spinner/Spinner'

jest.mock('./challenges.module.scss', () => ({
  centered: 'mock-centered-class',
}))

// eslint-disable-next-line react/display-name
jest.mock('../../../components/spinner/Spinner', () => () => <div>Mock Spinner</div>)

describe('Loading Component', () => {
  it('should render the spinner and loading message', () => {
    render(<Loading />)

    expect(screen.getByText('Mock Spinner')).toBeInTheDocument()

    const loadingText = screen.getByText('Loading challenges page...')
    expect(loadingText).toBeInTheDocument()

    expect(loadingText).toHaveClass('mock-centered-class')
  })
})
