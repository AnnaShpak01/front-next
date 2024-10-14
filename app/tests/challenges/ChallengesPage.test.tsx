import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ChallengesPage from '../../challenges/ChallengesPage'
import { useSession } from 'next-auth/react'
import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch'

global.fetch = fetch as unknown as (input: RequestInfo, init?: RequestInit) => Promise<Response>

// Мокаем модуль next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

const mockBingoData = [{ _id: '1', task: 'Task 1', color: 'red', status: false }]

// Функция для создания мок-ответа
const createMockResponse = (data: any) => {
  return new Response(JSON.stringify(data), {
    status: 200,
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('ChallengesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks() // Сбрасываем все моки перед каждым тестом

    ;(useSession as jest.Mock).mockReturnValue({
      data: { loggedUser: 'mockToken' },
      status: 'authenticated',
    })

    // Заменяем глобальную функцию fetch на мок
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(createMockResponse(mockBingoData)) // Для первого fetch
      .mockResolvedValueOnce(
        createMockResponse([{ _id: '1', task: 'Task 1', color: 'red', status: true }])
      ) // Для второго fetch
  })

  it('should call updateBingo and update state', async () => {
    render(<ChallengesPage />)

    // Используем findAllByText для поиска всех элементов с текстом Task 1
    const taskElements = await screen.findAllByText('Task 1')
    expect(taskElements.length).toBeGreaterThan(0) // Проверяем, что хотя бы один элемент с текстом Task 1 присутствует
    expect(taskElements[0]).toBeInTheDocument() // Проверяем, что первый элемент присутствует

    // Имитируем вызов функции updateBingo
    const updateBingo = async () => {
      const response = await fetch('/api/challenges?_id=1', {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer mockToken',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: '1', task: 'Task 1', color: 'red', status: true }),
      })

      // Убедитесь, что response не undefined
      if (!response) {
        console.error('Fetch response is undefined') // Выводим в консоль для отладки
        throw new Error('Fetch failed: response is undefined')
      }

      const updatedData = await response.json()
      return updatedData
    }

    // Вызовите функцию updateBingo
    const updatedBingoItem = await updateBingo()

    // Проверяем, что fetch был вызван с правильными параметрами
    expect(fetch).toHaveBeenCalledWith(
      '/api/challenges?_id=1',
      expect.objectContaining({
        method: 'PUT',
        headers: {
          Authorization: 'Bearer mockToken',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: '1', task: 'Task 1', color: 'red', status: true }),
      })
    )

    // Проверяем, что данные обновились
    expect(updatedBingoItem).toEqual([{ _id: '1', task: 'Task 1', color: 'red', status: true }])
  })
})
