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

export async function PUT(dataToUpdate: BingoType) {
  try {
    const response = await fetch('http://localhost:8080/bingo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Дополнительные заголовки, если необходимо
      },
      body: JSON.stringify(dataToUpdate),
    })

    if (!response.ok) {
      throw new Error('Failed to update data')
    }

    // Если сервер возвращает какие-то данные в ответе, вы можете их получить так:
    const updatedData = await response.json()

    return updatedData
  } catch (error) {
    console.error('Error updating data:', error)
    return null // Или возвращайте какое-то значение, которое указывает на ошибку
  }
}
