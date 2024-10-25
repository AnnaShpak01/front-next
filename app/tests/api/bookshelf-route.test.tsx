import { GET, POST, PUT, DELETE } from '../../api/bookshelf/route'

beforeEach(() => {
  fetchMock.resetMocks()
})

describe('Books API', () => {
  it('GET should return books data', async () => {
    const mockBooks = [{ id: '1', name: 'Book One' }]

    fetchMock.mockResponseOnce(JSON.stringify(mockBooks))

    const request = new Request('http://localhost:8080/books', { method: 'GET' })
    const response = await GET(request)
    const data = await response.json()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(data).toEqual(mockBooks)
    expect(response.status).toBe(200)
  })

  it('GET should handle fetch errors', async () => {
    fetchMock.mockRejectOnce(new Error('Fetch failed'))

    const request = new Request('http://localhost:8080/books', { method: 'GET' })
    const response = await GET(request)
    const data = await response.json()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(data).toEqual([])
    expect(response.status).toBe(500)
  })

  it('POST should add a new book', async () => {
    const newBook = { id: '2', name: 'New Book' }

    fetchMock.mockResponseOnce(JSON.stringify(newBook), { status: 201 })

    const request = new Request('http://localhost:8080/books', {
      method: 'POST',
      body: JSON.stringify(newBook),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/books',
      expect.objectContaining({
        method: 'POST',
      })
    )
    expect(data).toEqual(newBook)
    expect(response.status).toBe(201)
  })

  it('POST should handle errors', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to add a new book'))

    const request = new Request('http://localhost:8080/books', {
      method: 'POST',
      body: JSON.stringify({ id: '2', name: 'New Book' }),
    })

    const response = await POST(request)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(500)
  })
  it('POST should handle non-2xx response from API', async () => {
    fetchMock.mockResponseOnce('', { status: 400 })

    const request = new Request('http://localhost:8080/books', {
      method: 'POST',
      body: JSON.stringify({ id: '2', name: 'New Book' }),
    })

    const response = await POST(request)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(500)
  })
  it('PUT should update a book', async () => {
    const updatedBook = { id: '1', name: 'Updated Book' }

    fetchMock.mockResponseOnce(JSON.stringify(updatedBook))

    const request = new Request('http://localhost:8080/books?id=1', {
      method: 'PUT',
      body: JSON.stringify(updatedBook),
    })

    const response = await PUT(request)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/books/1',
      expect.objectContaining({
        method: 'PUT',
      })
    )
    expect(response.status).toBe(200)
  })

  it('PUT should handle errors', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to update book'))

    const request = new Request('http://localhost:8080/books?id=1', {
      method: 'PUT',
      body: JSON.stringify({ id: '1', name: 'Updated Book' }),
    })

    const response = await PUT(request)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(500)
  })

  it('DELETE should remove a book', async () => {
    fetchMock.mockResponseOnce('', { status: 204 })

    const request = new Request('http://localhost:8080/books?id=1', { method: 'DELETE' })

    const response = await DELETE(request)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/books/1',
      expect.objectContaining({
        method: 'DELETE',
      })
    )
    expect(response.status).toBe(204)
  })

  it('DELETE should handle errors', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to delete book'))

    const request = new Request('http://localhost:8080/books?id=1', { method: 'DELETE' })

    const response = await DELETE(request)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(500)
  })
})
