export async function GET(request: Request) {
  try {
    const initialBooksData = await fetch('http://localhost:8080/books', {
      method: 'GET',
      headers: request.headers,
    })
    const books = await initialBooksData.json()
    return new Response(JSON.stringify(books), { status: 200 })
  } catch (error) {
    console.error('Error fetching initial books data:', error)
    return new Response(JSON.stringify([]), { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch('http://localhost:8080/books', {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error('Failed to add a new book')
    }

    const addedBook = await response.json()

    return new Response(JSON.stringify(addedBook), { status: 201 })
  } catch (error) {
    console.error('Error creating book:', error)
    return new Response(null, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const response = await fetch(`http://localhost:8080/books/${id}`, {
      method: 'PUT',
      headers: request.headers,
      body: JSON.stringify(body),
    })

    return new Response(null, { status: response.status })
  } catch (error) {
    console.error('Error updating book:', error)
    return new Response(null, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const response = await fetch(`http://localhost:8080/books/${id}`, {
      method: 'DELETE',
      headers: request.headers,
    })

    return new Response(null, { status: response.status })
  } catch (error) {
    console.error('Error deleting book:', error)
    return new Response(null, { status: 500 })
  }
}
