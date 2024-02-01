import { BookType } from 'components/reducers/books'
import { NextApiRequest, NextApiResponse } from 'next'

export async function GET() {
  try {
    const initialBooksData = await fetch('http://localhost:8080/books')
    return initialBooksData
  } catch (error) {
    console.error('Error fetching initial books data:', error)
    return []
  }
}

export async function POST(newBookData: BookType) {
  try {
    const response = await fetch('http://localhost:8080/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBookData),
    })

    if (!response.ok) {
      throw new Error('Failed to add a new book')
    }

    const addedBook = await response.json()

    return addedBook
  } catch (error) {
    console.error('Error creating book:', error)
  }
}

export async function PUT(id: string, updatedData: BookType) {
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
