import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import AlphabetChallenge from '../../challenges/AlphabetChallenge'
import { useSession } from 'next-auth/react'

jest.mock('next-auth/react')
global.fetch = jest.fn()

const mockBooks = [
  { id: '1', name: 'A Tale of Two Cities' },
  { id: '2', name: 'Moby Dick' },
  { id: '3', name: 'The Great Gatsby' },
]

describe('AlphabetChallenge Component', () => {
  beforeEach(() => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: { loggedUser: 'mocked_token' },
      status: 'authenticated',
    })

    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render and fetch data correctly', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockBooks),
    })

    render(<AlphabetChallenge />)

    await waitFor(() => {
      expect(screen.getByText('Tale of Two Cities')).toBeInTheDocument()
      expect(screen.getByText('oby Dick')).toBeInTheDocument()
      expect(screen.getByText('he Great Gatsby')).toBeInTheDocument()
    })
  })

  it('should display alphabet letters correctly', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockBooks),
    })

    render(<AlphabetChallenge />)

    await waitFor(() => {
      for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i)
        expect(screen.getByText(letter)).toBeInTheDocument()
      }
    })
  })

  it('should handle API errors gracefully', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    render(<AlphabetChallenge />)

    await waitFor(() => {
      expect(screen.queryByText('Tale of Two Cities')).not.toBeInTheDocument()
      expect(screen.queryByText('oby Dick')).not.toBeInTheDocument()
      expect(screen.queryByText('he Great Gatsby')).not.toBeInTheDocument()
    })

    expect(console.error).toHaveBeenCalledWith('Error fetching data:', expect.any(Error))
  })

  it('should render without books if none are available', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([]),
    })

    render(<AlphabetChallenge />)

    await waitFor(() => {
      for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i)
        expect(screen.getByText(letter)).toBeInTheDocument()
        expect(
          screen.queryByText(/Tale of Two Cities|Moby Dick|The Great Gatsby/)
        ).not.toBeInTheDocument()
      }
    })
  })
})
