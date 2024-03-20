export async function GET(request: Request) {
  try {
    const initialBingoData = await fetch('http://localhost:8080/bingo', {
      method: 'GET',
      headers: request.headers,
    })
    return initialBingoData
  } catch (error) {
    console.error('Error fetching initial bingo data:', error)
    return []
  }
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  return await fetch(`http://localhost:8080/bingo/${id}`, {
    method: 'PUT',
    headers: request.headers,
    body: JSON.stringify(body),
  })
}
