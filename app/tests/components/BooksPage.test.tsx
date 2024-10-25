// import React from 'react'
// import { render, screen, fireEvent } from '@testing-library/react'
// import BooksPage from '../../../components/BooksPage/BooksPage' // Замените на правильный путь
// import { BookType, FiltersType } from 'components/types'

// describe('BooksPage', () => {
//   const mockBooksData: BookType[] = [
//     {
//       _id: '1',
//       name: 'Book 1',
//       status: 'read',
//       author: 'Author 1',
//       description: 'description 1',
//       imgsrc: 'codeimg1',
//       color: 'Blue',
//       genre: 'fiction',
//       pages: 123,
//     },
//     {
//       _id: '2',
//       name: 'Book 2',
//       status: 'unread',
//       author: 'Author 2',
//       description: 'description 2',
//       imgsrc: 'codeimg2',
//       color: 'Yellow',
//       genre: 'non-fiction',
//       pages: 456,
//     },
//   ]

//   const mockFilterData: FiltersType[] = [
//     { _id: '1', name: 'all', label: 'All', className: 'filter-all' },
//     { _id: '2', name: 'read', label: 'Read', className: 'filter-read' },
//     { _id: '3', name: 'unread', label: 'Unread', className: 'filter-unread' },
//   ]

//   const mockUpdateList = jest.fn()
//   const mockUpdateDeleteList = jest.fn()

//   it('renders BooksList and BooksAddForm components', () => {
//     render(
//       <BooksPage
//         booksData={mockBooksData}
//         filterData={mockFilterData}
//         updateList={mockUpdateList}
//         updateDeleteList={mockUpdateDeleteList}
//       />
//     )

//     // Проверяем, что компоненты BooksList и BooksAddForm рендерятся
//     expect(screen.getByText('Name of the book')).toBeInTheDocument()
//     expect(screen.getByText('Author')).toBeInTheDocument()
//     expect(screen.getByText('Genre')).toBeInTheDocument()
//     expect(screen.getByText('Pages')).toBeInTheDocument()
//     expect(screen.getByText('Status')).toBeInTheDocument()
//     expect(screen.getByText('Delete')).toBeInTheDocument()
//     expect(screen.getByLabelText(/Add a book/i)).toBeInTheDocument() // Предположим, что в BooksAddForm есть соответствующий текст
//   })

//   it('updates active filter when filter button is clicked', () => {
//     render(
//       <BooksPage
//         booksData={mockBooksData}
//         filterData={mockFilterData}
//         updateList={mockUpdateList}
//         updateDeleteList={mockUpdateDeleteList}
//       />
//     )

//     // Находим кнопку фильтрации и кликаем по ней
//     const filterButton = screen.getByText('Read') // Используйте текст кнопки фильтра
//     fireEvent.click(filterButton)

//     // Проверяем, что состояние activeFilter обновлено (это может требовать модификации самого компонента, чтобы передать состояние родителю)
//     expect(filterButton).toHaveClass('active') // Предполагается, что активная кнопка имеет класс 'active'
//   })
// })
