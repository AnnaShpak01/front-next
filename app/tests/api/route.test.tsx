import { GET } from '../../api/route'

beforeEach(() => {
  fetchMock.resetMocks()
})

describe('Filters API', () => {
  // Тест для успешного получения данных
  it('GET should return filters data', async () => {
    const mockFiltersData = [
      { id: '1', name: 'Filter One' },
      { id: '2', name: 'Filter Two' },
    ]

    // Мокируем успешный ответ от fetch
    fetchMock.mockResponseOnce(JSON.stringify(mockFiltersData))

    const request = new Request('http://localhost:8080/filters', { method: 'GET' })
    const response = await GET(request)
    const data = await response.json()

    // Ожидания
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(data).toEqual(mockFiltersData)
    expect(response.status).toBe(200)
  })

  // Тест для обработки ошибок
  it('GET should handle fetch errors', async () => {
    // Мокируем ошибку от fetch
    fetchMock.mockRejectOnce(new Error('Fetch failed'))

    const request = new Request('http://localhost:8080/filters', { method: 'GET' })
    const response = await GET(request)
    const data = await response.json()

    // Ожидания
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(data).toEqual([]) // Ожидаем пустой массив при ошибке
    expect(response.status).toBe(500) // Ожидаем статус ошибки
  })
})
