import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../../../components/app/_app'
import LoginComponent from '../../../components/LoginComponent/LoginComponent'
import AppHeader from '../../../components/AppHeader/AppHeader'

jest.mock('../../../components/LoginComponent/LoginComponent', () => {
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>
})

jest.mock('../../../components/AppHeader/AppHeader', () => {
  // eslint-disable-next-line react/display-name
  return () => <header>App Header</header>
})

describe('App Component', () => {
  it('should render LoginComponent, AppHeader, and children', () => {
    render(
      <App>
        <div>Child Component</div>
      </App>
    )

    expect(screen.getByText('Child Component')).toBeInTheDocument()

    expect(screen.getByText('App Header')).toBeInTheDocument()
  })

  it('should render with the correct class name', () => {
    const { container } = render(
      <App>
        <div>Child Component</div>
      </App>
    )

    expect(container.firstChild).toHaveClass('app')
  })
})
