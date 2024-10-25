import { checkAuthorization } from '../../../components/LoginComponent/CheckAuthorization'
import { signOut } from 'next-auth/react'
import { jwtDecode } from 'jwt-decode'

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}))

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}))

describe('checkAuthorization', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return true if the token is valid and not expired', () => {
    const session = { loggedUser: 'valid.jwt.token' }
    const decodedToken = { exp: Math.floor(Date.now() / 1000) + 3600 }

    ;(jwtDecode as jest.Mock).mockReturnValue(decodedToken)

    const result = checkAuthorization(session)

    expect(result).toBe(true)
    expect(signOut).not.toHaveBeenCalled()
  })

  it('should call signOut and return false if the token is expired', () => {
    const session = { loggedUser: 'expired.jwt.token' }
    const decodedToken = { exp: Math.floor(Date.now() / 1000) - 3600 }

    ;(jwtDecode as jest.Mock).mockReturnValue(decodedToken)

    const result = checkAuthorization(session)

    expect(result).toBe(false)
    expect(signOut).toHaveBeenCalled()
  })

  it('should return false if there is no session', () => {
    const result = checkAuthorization(null)

    expect(result).toBe(false)
    expect(signOut).not.toHaveBeenCalled()
  })

  it('should return false if token exp is not a number', () => {
    const session = { loggedUser: 'invalid.jwt.token' }
    const decodedToken = { exp: 'not-a-number' }

    ;(jwtDecode as jest.Mock).mockReturnValue(decodedToken)

    const result = checkAuthorization(session)

    expect(result).toBe(false)
    expect(signOut).not.toHaveBeenCalled()
  })
})
