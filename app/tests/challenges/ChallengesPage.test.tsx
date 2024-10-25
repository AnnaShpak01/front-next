// import React from 'react'
// import { render, screen, waitFor } from '@testing-library/react'
// import Home from '../../challenges/challengesPage'
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

// const mockBingoData = [{ _id: '1', task: 'Task 1', color: 'red', status: false }]

// const createMockResponse = (data: any): globalThis.Response => {
//   return new Response(JSON.stringify(data), {
//     status: 200,
//     statusText: 'OK',
//     headers: { 'Content-Type': 'application/json' },
//   }) as unknown as globalThis.Response
// }

// describe('Home', () => {
//   beforeEach(() => {
//     jest.clearAllMocks()
//     ;(useSession as jest.Mock).mockReturnValue({
//       data: { loggedUser: 'mockToken' },
//       status: 'authenticated',
//     })

//     jest.spyOn(global, 'fetch').mockResolvedValueOnce(createMockResponse(mockBingoData))
//   })

//   it('should fetch and display bingo data', async () => {
//     render(<Home />)

//     // Проверяем, что данные загружаются и отображаются
//     await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument())
//   })

//   it('should call updateBingo and update state', async () => {
//     render(<Home />)

//     await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument())

//     // Найдем функцию updateBingo, переданную в BookChallengePage
//     const updateBingo = jest.fn()

//     // Обновим bingoData
//     const updatedBingoData = { _id: '1', task: 'Updated Task', color: 'blue', status: true }

//     // Симуляция обновления
//     jest.spyOn(global, 'fetch').mockResolvedValueOnce(createMockResponse([updatedBingoData]))

//     // Здесь предполагается, что BookChallengePage рендерит кнопку или элемент, который вызывает updateBingo
//     // Вам нужно будет изменить селектор на соответствующий вашему компоненту
//     // screen.getByRole('button', { name: /update/i }).click();

//     // После обновления должны проверять, что функция updateBingo была вызвана
//     // expect(updateBingo).toHaveBeenCalledWith('1', updatedBingoData);

//     // Проверяем, что обновленное значение отображается
//     // await waitFor(() => expect(screen.getByText('Updated Task')).toBeInTheDocument());
//   })
// })
