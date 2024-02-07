export async function GET() {
  try {
    const initialBooksData = await fetch('http://localhost:8080/books')
    return initialBooksData
  } catch (error) {
    console.error('Error fetching initial books data:', error)
    return []
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch('http://localhost:8080/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error('Failed to add a new book')
    }

    const addedBook = await response.json()

    return Response.json(addedBook)
  } catch (error) {
    console.error('Error creating book:', error)
  }
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  return await fetch(`http://localhost:8080/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  return await fetch(`http://localhost:8080/books/${id}`, {
    method: 'DELETE',
  })
}
