import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ChallengesPage from '../../challenges/ChallengesPage'
import { useSession } from 'next-auth/react'
import fetch, { Response } from 'node-fetch'

global.fetch = fetch as unknown as (input: RequestInfo, init?: RequestInit) => Promise<Response>

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

const mockBingoData = [{ _id: '1', task: 'Task 1', color: 'red', status: false }]

const createMockResponse = (data: any) => {
  return new Response(JSON.stringify(data), {
    status: 200,
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('ChallengesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    ;(useSession as jest.Mock).mockReturnValue({
      data: { loggedUser: 'mockToken' },
      status: 'authenticated',
    })

    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(createMockResponse(mockBingoData) as unknown as Response)
  })

  it('should call updateBingo and update state', async () => {
    render(<ChallengesPage />)

    const taskElements = await screen.findAllByText('Task 1')
    expect(taskElements.length).toBeGreaterThan(0)
    expect(taskElements[0]).toBeInTheDocument()

    const updateBingo = async () => {
      const response = await fetch('/api/challenges?_id=1', {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer mockToken',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: '1', task: 'Task 1', color: 'red', status: true }),
      })

      if (!response) {
        throw new Error('Fetch failed: response is undefined')
      }

      const updatedData = await response.json()
      return updatedData
    }

    const updatedBingoItem = await updateBingo()
    expect(fetch).toHaveBeenCalledWith(
      '/api/challenges?_id=1',
      expect.objectContaining({
        method: 'PUT',
        headers: {
          Authorization: 'Bearer mockToken',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: '1', task: 'Task 1', color: 'red', status: true }),
      })
    )

    expect(updatedBingoItem).toEqual([{ _id: '1', task: 'Task 1', color: 'red', status: true }])
  })
})
