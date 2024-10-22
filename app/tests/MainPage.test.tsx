// import React from 'react'
// import { act, render, screen, waitFor, fireEvent } from '@testing-library/react'
// import Page from '../page'
// import { useSession } from 'next-auth/react'
// import BooksPage from '../../components/BooksPage/BooksPage'
// import { BookType, FiltersType } from 'components/types'

// class MockResponse extends Response {
//   private body: any

//   constructor(body: any = null, init: ResponseInit = {}) {
//     super(body, init)
//     this.body = body
//   }

//   json() {
//     return Promise.resolve(this.body)
//   }

//   static error() {
//     return new MockResponse(null, { status: 500, statusText: 'Internal Server Error' })
//   }

//   static redirect(url: string | URL, status: number = 302) {
//     return new MockResponse(null, { status, headers: { Location: url.toString() } })
//   }
// }

// ;(global as any).Response = MockResponse
// ;(global as any).fetch = jest.fn((url) => {
//   const urlString = typeof url === 'string' ? url : url.toString()
//   if (urlString.includes('/bookshelf')) {
//     return Promise.resolve(
//       new MockResponse(JSON.stringify(mockBooksData), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       })
//     )
//   } else if (urlString.includes('/api')) {
//     return Promise.resolve(
//       new MockResponse(JSON.stringify(mockFiltersData), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       })
//     )
//   }
//   return Promise.reject(new Error('Not found'))
// })

// jest.mock('next-auth/react', () => ({
//   useSession: jest.fn(),
// }))

// jest.mock('../../components/BooksPage/BooksPage', () => jest.fn(() => null))

// const mockBooksData: BookType[] = [
//   {
//     id: '1',
//     name: 'Book One',
//     author: 'Author One',
//     imgsrc: 'image1.jpg',
//     description: 'Description 1',
//     status: 'read',
//     color: 'blue',
//     genre: 'Fiction',
//     pages: 300,
//   },
//   {
//     id: '2',
//     name: 'Book Two',
//     author: 'Author Two',
//     imgsrc: 'image2.jpg',
//     description: 'Description 2',
//     status: 'unread',
//     color: 'green',
//     genre: 'Non-Fiction',
//     pages: 200,
//   },
// ]

// const mockFiltersData: FiltersType[] = [
//   { id: '1', name: 'Fiction', label: 'Fiction', className: 'fiction-class' },
//   { id: '2', name: 'Non-Fiction', label: 'Non-Fiction', className: 'nonfiction-class' },
// ]

// describe('Page Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks()
//     ;(useSession as jest.Mock).mockReturnValue({
//       data: { loggedUser: 'test-token' },
//       status: 'authenticated',
//     })
//   })

//   it('should render loading state initially', async () => {
//     await act(async () => {
//       render(<Page />)
//     })

//     await waitFor(() => {
//       expect(screen.getByText(/Loading/i)).toBeInTheDocument()
//     })
//   })

//   it('should fetch and render books and filters after loading', async () => {
//     const mockUpdateList = jest.fn()
//     const mockUpdateDeleteList = jest.fn()

//     ;(BooksPage as jest.Mock).mockImplementation(
//       ({ booksData, filterData, updateList, updateDeleteList }) => {
//         expect(booksData).toEqual(mockBooksData)
//         expect(filterData).toEqual(mockFiltersData)
//         expect(updateList).toBe(mockUpdateList)
//         expect(updateDeleteList).toBe(mockUpdateDeleteList)
//         return <div>BooksPage</div>
//       }
//     )

//     render(<Page updateDeleteList={mockUpdateDeleteList} />) // Убедитесь, что передаете updateDeleteList

//     await waitFor(() => {
//       expect(global.fetch).toHaveBeenCalledTimes(2)
//     })

//     expect(screen.getByText('BooksPage')).toBeInTheDocument()
//   })

//   it('should call updateList when adding a book', async () => {
//     const mockUpdateList = jest.fn()

//     ;(BooksPage as jest.Mock).mockImplementation(({ updateList }) => {
//       React.useEffect(() => {
//         updateList({
//           id: '3',
//           name: 'Book Three',
//           author: 'Author Three',
//           imgsrc: 'image3.jpg',
//           description: 'Description 3',
//           status: 'unread',
//           color: 'yellow',
//           genre: 'Fiction',
//           pages: 400,
//         })
//       }, [updateList])
//       return <div>BooksPage</div>
//     })

//     render(<Page updateDeleteList={mockUpdateDeleteList} />) // Убедитесь, что передаете updateDeleteList

//     await waitFor(() => {
//       expect(mockUpdateList).toHaveBeenCalledTimes(1)
//       expect(mockUpdateList).toHaveBeenCalledWith({
//         id: '3',
//         name: 'Book Three',
//         author: 'Author Three',
//         imgsrc: 'image3.jpg',
//         description: 'Description 3',
//         status: 'unread',
//         color: 'yellow',
//         genre: 'Fiction',
//         pages: 400,
//       })
//     })
//   })

//   it('should call updateDeleteList when deleting a book', async () => {
//     const mockUpdateDeleteList = jest.fn()
//     const bookId = '1'

//     ;(BooksPage as jest.Mock).mockImplementation(({ updateDeleteList }) => {
//       const handleDelete = () => {
//         updateDeleteList(bookId)
//       }

//       return (
//         <div>
//           <div>BooksPage</div>
//           <button onClick={handleDelete}>Delete Book</button>
//         </div>
//       )
//     })

//     render(<Page updateDeleteList={mockUpdateDeleteList} />)

//     fireEvent.click(screen.getByText('Delete Book'))

//     await waitFor(() => {
//       expect(mockUpdateDeleteList).toHaveBeenCalledTimes(1)
//       expect(mockUpdateDeleteList).toHaveBeenCalledWith(bookId)
//     })
//   })
// })
