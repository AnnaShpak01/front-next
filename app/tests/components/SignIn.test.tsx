import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { signIn } from 'next-auth/react'
import SignIn from '../../../components/SignIn/SignIn'
import { usePathname } from 'next/navigation'

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('SignIn Component', () => {
  beforeEach(() => {
    ;(usePathname as jest.Mock).mockReturnValue('/current-path')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the SignIn component', () => {
    render(<SignIn />)

    expect(screen.getByText('Sign in to login')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign in with Google/i })).toBeInTheDocument()
  })

  it('calls signIn with Google provider and correct callbackUrl when button is clicked', () => {
    render(<SignIn />)

    const signInButton = screen.getByRole('button', { name: /Sign in with Google/i })
    fireEvent.click(signInButton)

    expect(signIn).toHaveBeenCalledWith('Google', { callbackUrl: '/current-path' })
  })
})
