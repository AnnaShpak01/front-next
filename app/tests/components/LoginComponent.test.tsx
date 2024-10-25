import React from 'react'
import { render, screen } from '@testing-library/react'
import { useSession, signOut } from 'next-auth/react'
import LoginComponent from '../../../components/LoginComponent/LoginComponent'
import SignIn from '../../../components/SignIn/SignIn'
import { checkAuthorization } from '../../../components/LoginComponent/CheckAuthorization'
import jwt from 'jsonwebtoken'

// Мокаем необходимые функции и компоненты
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}))

// eslint-disable-next-line react/display-name
jest.mock('../../../components/SignIn/SignIn', () => () => <div>Sign In Component</div>)

describe('LoginComponent', () => {
  const children = <div>Protected Content</div>

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render SignIn component when there is no session', () => {
    ;(useSession as jest.Mock).mockReturnValue({ data: null })

    render(<LoginComponent>{children}</LoginComponent>)

    expect(screen.getByText('Sign In Component')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('should render children when there is a valid session', () => {
    const validToken = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60 * 60, loggedUser: 'valid-user' },
      'your_secret_key'
    )
    ;(useSession as jest.Mock).mockReturnValue({ data: { loggedUser: validToken } })

    render(<LoginComponent>{children}</LoginComponent>)

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
    expect(screen.queryByText('Sign In Component')).not.toBeInTheDocument()
  })

  it('should not call signOut when authorization is successful', () => {
    const validToken = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60 * 60, loggedUser: 'valid-user' },
      'your_secret_key'
    )
    ;(useSession as jest.Mock).mockReturnValue({ data: { loggedUser: validToken } })
    jest.spyOn({ checkAuthorization }, 'checkAuthorization').mockReturnValue(true)

    render(<LoginComponent>{children}</LoginComponent>)

    expect(signOut).not.toHaveBeenCalled()
  })
})
