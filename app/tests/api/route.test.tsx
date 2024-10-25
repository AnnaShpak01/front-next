import { GET } from '../../api/route'

beforeEach(() => {
  fetchMock.resetMocks()
})

describe('Filters API', () => {
  it('GET should return filters data', async () => {
    const mockFiltersData = [
      { id: '1', name: 'Filter One' },
      { id: '2', name: 'Filter Two' },
    ]

    fetchMock.mockResponseOnce(JSON.stringify(mockFiltersData))

    const request = new Request('http://localhost:8080/filters', { method: 'GET' })
    const response = await GET(request)
    const data = await response.json()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(data).toEqual(mockFiltersData)
    expect(response.status).toBe(200)
  })

  it('GET should handle fetch errors', async () => {
    fetchMock.mockRejectOnce(new Error('Fetch failed'))

    const request = new Request('http://localhost:8080/filters', { method: 'GET' })
    const response = await GET(request)
    const data = await response.json()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(data).toEqual([])
    expect(response.status).toBe(500)
  })
})
