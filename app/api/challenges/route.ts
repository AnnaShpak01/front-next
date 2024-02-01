import { BingoType } from 'components/reducers/bingo'

export async function GET() {
  try {
    const initialBingoData = await fetch('http://localhost:8080/bingo')
    return initialBingoData
  } catch (error) {
    console.error('Error fetching initial bingo data:', error)
    return []
  }
}

export async function PUT(id: string, updatedData: BingoType) {
  const response = await fetch(`http://localhost:8080/bingo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })

  if (!response.ok) {
    throw new Error('Failed to update bingo item')
  }

  return response.json()
}
