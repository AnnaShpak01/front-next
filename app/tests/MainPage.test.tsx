// import React from 'react' // Добавляем импорт React
// import { render, screen, waitFor } from '@testing-library/react'
// import Page from '../mainPage'
// import { useSession } from 'next-auth/react'
// import fetch from 'node-fetch'

// // Приводим глобальный fetch к типу globalThis.fetch для совместимости с DOM API
// global.fetch = fetch as unknown as (
//   input: RequestInfo | URL,
//   init?: RequestInit | undefined
// ) => Promise<globalThis.Response>

// jest.mock('next-auth/react', () => ({
//   useSession: jest.fn(),
// }))

// const mockBooksData = [{ _id: '1', title: 'Book 1', author: 'Author 1' }]
// const mockFiltersData = [{ genre: 'Fiction' }]

// const createMockResponse = (data: any): globalThis.Response => {
//   return new Response(JSON.stringify(data), {
//     status: 200,
//     statusText: 'OK',
//     headers: { 'Content-Type': 'application/json' },
//   }) as unknown as globalThis.Response
// }

// describe('Page', () => {
//   beforeEach(() => {
//     jest.clearAllMocks()
//     ;(useSession as jest.Mock).mockReturnValue({
//       data: { loggedUser: 'mockToken' },
//       status: 'authenticated',
//     })

//     jest
//       .spyOn(global, 'fetch')
//       .mockResolvedValueOnce(createMockResponse(mockBooksData)) // Mock для booksResponse
//       .mockResolvedValueOnce(createMockResponse(mockFiltersData)) // Mock для filtersResponse
//   })

//   it('should fetch and display books and filters', async () => {
//     render(<Page />)

//     // Проверяем, что данные загружаются и отображаются
//     await waitFor(() => expect(screen.getByText('Book 1')).toBeInTheDocument())
//     await waitFor(() => expect(screen.getByText('Fiction')).toBeInTheDocument())
//   })

//   it('should update the book list when a new book is added', async () => {
//     render(<Page />)

//     // Ждем загрузки данных
//     await waitFor(() => expect(screen.getByText('Book 1')).toBeInTheDocument())

//     const newBook = { _id: '2', title: 'Book 2', author: 'Author 2' }
//     const updateList = jest.fn()

//     // Симуляция добавления новой книги
//     const { rerender } = render(<Page />)
//     rerender(<Page updateList={updateList} />)
//     updateList(newBook)

//     // Проверяем, что книга была добавлена
//     await waitFor(() => expect(screen.getByText('Book 2')).toBeInTheDocument())
//   })

//   it('should update the book list when a book is deleted', async () => {
//     render(<Page />)

//     // Ждем загрузки данных
//     await waitFor(() => expect(screen.getByText('Book 1')).toBeInTheDocument())

//     const updateDeleteList = jest.fn()

//     // Симуляция удаления книги
//     const deletedBookId = '1'
//     updateDeleteList(deletedBookId)

//     // Проверяем, что книга была удалена
//     await waitFor(() => expect(screen.queryByText('Book 1')).not.toBeInTheDocument())
//   })
// })
