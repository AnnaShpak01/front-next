export async function GET(request: Request) {
  try {
    const initialBingoData = await fetch('http://localhost:8080/bingo', {
      method: 'GET',
      headers: request.headers,
    })
    return initialBingoData
  } catch (error) {
    console.error('Error fetching initial bingo data:', error)

    return new Response(JSON.stringify([]), { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('_id')

    const response = await fetch(`http://localhost:8080/bingo/${id}`, {
      method: 'PUT',
      headers: request.headers,
      body: JSON.stringify(body),
    })

    return response
  } catch (error) {
    console.error('Error updating bingo data:', error)
    return new Response(JSON.stringify({ error: 'Failed to update bingo item' }), { status: 500 })
  }
}
