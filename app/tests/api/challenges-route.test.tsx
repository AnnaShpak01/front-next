import { GET, PUT } from '../../api/challenges/route'

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
  fetchMock.resetMocks()
})

describe('Bingo API', () => {
  it('GET should return bingo data', async () => {
    const mockBingoData = [{ id: '1', name: 'Bingo Item 1' }]

    fetchMock.mockResponseOnce(JSON.stringify(mockBingoData))

    const request = new Request('http://localhost:8080/bingo', { method: 'GET' })
    const response = await GET(request)
    const data = await response.json()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(data).toEqual(mockBingoData)
    expect(response.status).toBe(200)
  })

  it('GET should handle fetch errors', async () => {
    fetchMock.mockRejectOnce(new Error('Fetch failed'))

    const request = new Request('http://localhost:8080/bingo', { method: 'GET' })
    const response = await GET(request)
    const data = await response.json()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(data).toEqual([])
    expect(response.status).toBe(500)
  })

  it('PUT should update bingo data', async () => {
    const updatedBingoItem = { id: '1', name: 'Updated Bingo Item' }

    fetchMock.mockResponseOnce(JSON.stringify(updatedBingoItem))

    const request = new Request('http://localhost:8080/bingo?_id=1', {
      method: 'PUT',
      body: JSON.stringify(updatedBingoItem),
    })

    const response = await PUT(request)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/bingo/1',
      expect.objectContaining({
        method: 'PUT',
      })
    )
    expect(response.status).toBe(200)
  })

  it('PUT should handle errors', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to update bingo item'))

    const request = new Request('http://localhost:8080/bingo?_id=1', {
      method: 'PUT',
      body: JSON.stringify({ id: '1', name: 'Updated Bingo Item' }),
    })

    const response = await PUT(request)
    const data = await response.json()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(data.error).toBe('Failed to update bingo item')
    expect(response.status).toBe(500)
  })
})
