import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AppHeader from '../../../components/AppHeader/AppHeader'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { checkAuthorization } from '../../../components/LoginComponent/CheckAuthorization'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

jest.mock('../../../components/LoginComponent/CheckAuthorization', () => ({
  checkAuthorization: jest.fn(),
}))

describe('AppHeader component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly for authorized user', () => {
    const mockSession = {
      user: {
        email: 'testuser@example.com',
        name: 'Test User',
        image: 'https://example.com/image.jpg',
      },
      expires: 'fake-expiry-date',
    }

    ;(useSession as jest.Mock).mockReturnValue({ data: mockSession })
    ;(usePathname as jest.Mock).mockReturnValue('/')
    ;(checkAuthorization as jest.Mock).mockReturnValue(true)

    render(<AppHeader />)

    expect(screen.getByText('Your Personal Library')).toBeInTheDocument()

    expect(screen.getByText('Books Log')).toBeInTheDocument()
    expect(screen.getByText('Bookshelves')).toBeInTheDocument()
    expect(screen.getByText('Challenges')).toBeInTheDocument()

    expect(screen.getByText('Hello, testuser@example.com')).toBeInTheDocument()
    expect(screen.getByText('Sign out')).toBeInTheDocument()
  })

  test('calls signOut when sign out button is clicked', () => {
    const mockSession = {
      user: {
        email: 'testuser@example.com',
        name: 'Test User',
        image: 'https://example.com/image.jpg',
      },
      expires: 'fake-expiry-date',
    }

    ;(useSession as jest.Mock).mockReturnValue({ data: mockSession })
    ;(usePathname as jest.Mock).mockReturnValue('/')
    ;(checkAuthorization as jest.Mock).mockReturnValue(true)

    render(<AppHeader />)

    fireEvent.click(screen.getByText('Sign out'))

    expect(signOut).toHaveBeenCalledTimes(1)
  })

  test('does not render sign out button for unauthorized user', () => {
    ;(useSession as jest.Mock).mockReturnValue({ data: null })
    ;(usePathname as jest.Mock).mockReturnValue('/')
    ;(checkAuthorization as jest.Mock).mockReturnValue(false)

    render(<AppHeader />)

    expect(screen.queryByText('Sign out')).toBeNull()
  })
})
