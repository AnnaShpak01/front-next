export async function GET() {
  try {
    const initialBingoData = await fetch('http://localhost:8080/bingo')
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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}
