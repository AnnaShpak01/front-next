import { BingoType } from 'components/reducers/bingo'
import { BookType } from 'components/reducers/books'

export const fetchDataServer = async (url: string) => {
  try {
    const response = await fetch(`http://localhost:8080${url}`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const updateBookItem = async (id: string, updatedData: BookType) => {
  const response = await fetch(`http://localhost:8080/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })

  if (!response.ok) {
    throw new Error('Failed to update book item')
  }

  return response.json()
}

export const addBookItem = async (newBook: BookType) => {
  const response = await fetch('http://localhost:8080/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  })

  if (!response.ok) {
    throw new Error('Failed to add a new book')
  }

  return response.json()
}

export const deleteBookItem = async (id: string) => {
  const response = await fetch(`http://localhost:8080/books/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete book item')
  }

  return id // Повертайте ідентифікатор видаленої книги
}

export const updateBingoItem = async (id: string, updatedData: BingoType) => {
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
