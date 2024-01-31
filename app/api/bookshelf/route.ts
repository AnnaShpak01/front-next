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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newBookData = req.body

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

    res.status(response.status).json(addedBook)
  } catch (error) {
    console.error('Error creating book:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
