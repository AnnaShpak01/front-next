import { BookType } from 'components/reducers/books'
import { POST } from './api/bookshelf/route'

export async function addBook(newBook: BookType) {
  try {
    return await POST(newBook)
  } catch (e) {
    throw new Error('Failed to add a book')
  }
}
