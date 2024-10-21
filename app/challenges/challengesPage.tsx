'use client'
import React, { Suspense, useEffect, useState } from 'react'
import BookChallengePage from './BookChallengePage'
import { BingoType } from 'components/types'
import Loading from './loading'
import { useSession } from 'next-auth/react'

export default function Home() {
  const [bingoData, setBingoData] = useState<BingoType[]>([])
  const { data: session, status } = useSession()
  const token = session?.loggedUser
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/challenges', config)
        const initialBingoData: BingoType[] = await response.json()
        setBingoData(initialBingoData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const updateBingo = async (id: string, updatedData: BingoType) => {
    try {
      const { _id, ...dataToUpdate } = updatedData // Убираем _id

      const response = await fetch(`/api/challenges?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToUpdate), // Передаем данные без _id
      })

      if (response.ok) {
        setBingoData((prevData) =>
          prevData.map((item) => (item._id === id ? { ...item, ...dataToUpdate } : item))
        )
      } else {
        console.error('Ошибка при обновлении:', response.statusText)
      }

      console.log('Bingo item updated successfully:', dataToUpdate)
    } catch (error) {
      console.error('Error updating bingo item:', error)
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <BookChallengePage bingoData={bingoData} updateBingo={updateBingo} />
    </Suspense>
  )
}
