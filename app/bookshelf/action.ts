import { PUT } from 'app/api/bookshelf/route'
import { BookType } from 'components/reducers/books'

export async function updateBookStatus(id: string, updatedData: BookType) {
  try {
    return await PUT(id, updatedData)
  } catch (e) {
    throw new Error('Failed to update a book')
  }
}
