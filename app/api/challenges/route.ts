export async function GET(request: Request) {
  try {
    // Отправляем GET запрос на API /bingo для получения всех данных
    const response = await fetch('http://localhost:8080/bingo', {
      method: 'GET',
      headers: {
        Authorization: request.headers.get('Authorization') || '', // Добавляем JWT токен, если он присутствует
        'Content-Type': 'application/json',
      },
    })

    // Проверяем, удалось ли получить данные
    if (!response.ok) {
      throw new Error(`Ошибка при получении данных: ${response.statusText}`)
    }

    const data = await response.json() // Преобразуем ответ в JSON
    return new Response(JSON.stringify(data), { status: 200 }) // Возвращаем данные
  } catch (error) {
    console.error('Error fetching initial bingo data:', error)
    return new Response('Error fetching data', { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json() // Получаем тело запроса с обновленными данными
    const { searchParams } = new URL(request.url) // Получаем параметры из URL
    const id = searchParams.get('id') // Извлекаем ID для обновления

    // Отправляем PUT запрос для обновления элемента в базе данных
    const response = await fetch(`http://localhost:8080/bingo/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: request.headers.get('Authorization') || '', // Добавляем JWT токен, если он присутствует
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // Передаем обновленные данные
    })

    // Проверяем результат обновления
    if (!response.ok) {
      throw new Error(`Ошибка при обновлении данных: ${response.statusText}`)
    }

    const updatedData = await response.json() // Преобразуем ответ в JSON
    return new Response(JSON.stringify(updatedData), { status: 200 })
  } catch (error) {
    console.error('Error updating bingo item:', error)
    return new Response('Error updating bingo item', { status: 500 })
  }
}
