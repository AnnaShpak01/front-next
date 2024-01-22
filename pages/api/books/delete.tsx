import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    const response = await fetch(`http://localhost:8080/books/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete book')
    }

    res.status(response.status).json({ success: true })
  } catch (error) {
    console.error('Error deleting book:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
