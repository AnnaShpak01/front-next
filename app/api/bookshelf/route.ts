// GET: Получение всех книг
export async function GET(request: Request) {
  try {
    // Отправляем GET запрос на API /books для получения всех данных
    const response = await fetch('http://localhost:8080/books', {
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
    console.error('Error fetching initial books data:', error)
    return new Response('Error fetching data', { status: 500 })
  }
}

// POST: Добавление новой книги
export async function POST(request: Request) {
  try {
    const body = await request.json() // Получаем тело запроса с данными новой книги

    // Отправляем POST запрос для добавления новой книги
    const response = await fetch('http://localhost:8080/books', {
      method: 'POST',
      headers: {
        Authorization: request.headers.get('Authorization') || '', // Добавляем JWT токен, если он присутствует
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // Передаем данные новой книги
    })

    // Проверяем результат
    if (!response.ok) {
      throw new Error('Failed to add a new book')
    }

    const addedBook = await response.json() // Преобразуем ответ в JSON
    return new Response(JSON.stringify(addedBook), { status: 201 }) // Возвращаем данные добавленной книги
  } catch (error) {
    console.error('Error creating book:', error)
    return new Response('Error creating book', { status: 500 })
  }
}

// PUT: Обновление книги по ID
export async function PUT(request: Request) {
  try {
    const body = await request.json() // Получаем тело запроса с обновленными данными
    const { searchParams } = new URL(request.url) // Получаем параметры из URL
    const id = searchParams.get('id') // Извлекаем ID книги

    // Отправляем PUT запрос для обновления книги
    const response = await fetch(`http://localhost:8080/books/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: request.headers.get('Authorization') || '', // Добавляем JWT токен, если он присутствует
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // Передаем обновленные данные книги
    })

    // Проверяем результат обновления
    if (!response.ok) {
      throw new Error(`Ошибка при обновлении книги: ${response.statusText}`)
    }

    const updatedBook = await response.json() // Преобразуем ответ в JSON
    return new Response(JSON.stringify(updatedBook), { status: 200 }) // Возвращаем данные обновленной книги
  } catch (error) {
    console.error('Error updating book:', error)
    return new Response('Error updating book', { status: 500 })
  }
}

// DELETE: Удаление книги по ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url) // Получаем параметры из URL
    const id = searchParams.get('id') // Извлекаем ID книги

    // Отправляем DELETE запрос для удаления книги
    const response = await fetch(`http://localhost:8080/books/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: request.headers.get('Authorization') || '', // Добавляем JWT токен, если он присутствует
        'Content-Type': 'application/json',
      },
    })

    // Проверяем результат удаления
    if (!response.ok) {
      throw new Error(`Ошибка при удалении книги: ${response.statusText}`)
    }

    return new Response('Book deleted successfully', { status: 200 }) // Возвращаем успешный ответ
  } catch (error) {
    console.error('Error deleting book:', error)
    return new Response('Error deleting book', { status: 500 })
  }
}
