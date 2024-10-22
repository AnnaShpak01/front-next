export async function GET(request: Request) {
  try {
    const response = await fetch('http://localhost:8080/bingo', {
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
    console.error('Error fetching initial bingo data:', error)
    return new Response('Error fetching data', { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const response = await fetch(`http://localhost:8080/bingo/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: request.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Ошибка при обновлении данных: ${response.statusText}`)
    }

    const updatedData = await response.json()
    return new Response(JSON.stringify(updatedData), { status: 200 })
  } catch (error) {
    console.error('Error updating bingo item:', error)
    return new Response('Error updating bingo item', { status: 500 })
  }
}
