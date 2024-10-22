export async function GET(request: Request) {
  try {
    const response = await fetch('http://localhost:8080/books', {
      method: 'GET',
      headers: {
        Authorization: request.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Ошибка при получении данных: ${response.statusText}`)
    }

    const data = await response.json()
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error('Error fetching initial books data:', error)
    return new Response('Error fetching data', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch('http://localhost:8080/books', {
      method: 'POST',
      headers: {
        Authorization: request.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error('Failed to add a new book')
    }

    const addedBook = await response.json()
    return new Response(JSON.stringify(addedBook), { status: 201 })
  } catch (error) {
    console.error('Error creating book:', error)
    return new Response('Error creating book', { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const response = await fetch(`http://localhost:8080/books/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: request.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Ошибка при обновлении книги: ${response.statusText}`)
    }

    const updatedBook = await response.json()
    return new Response(JSON.stringify(updatedBook), { status: 200 })
  } catch (error) {
    console.error('Error updating book:', error)
    return new Response('Error updating book', { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return new Response('Book ID is required', { status: 400 })
    }

    const response = await fetch(`http://localhost:8080/books/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: request.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Ошибка при удалении книги: ${response.statusText}`)
    }

    return new Response('Book deleted successfully', { status: 200 })
  } catch (error) {
    console.error('Error deleting book:', error)
    return new Response('Error deleting book', { status: 500 })
  }
}
