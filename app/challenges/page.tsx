'use client'
import React, { useEffect, useState } from 'react'
import App from '../../components/app/_app'
import BookChallengePage from './BookChallengePage'
import { BingoType } from 'components/reducers/bingo'

export default function Home() {
  const [bingoData, setBingoData] = useState<BingoType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/challenges')
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
      const response = await fetch(`/api/challenges?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      })
      if (!response.ok) {
        throw new Error('Failed to update bingo item')
      }
      const data: BingoType = await response.json()
      const updatedBingoData: BingoType[] = bingoData.map((item: BingoType) =>
        item.id === id ? { ...item, ...data } : item
      )
      setBingoData(updatedBingoData)
    } catch (error) {
      console.error('Error updating bingo item:', error)
    }
  }

  return (
    <App>
      <BookChallengePage bingoData={bingoData} updateBingo={updateBingo} />
    </App>
  )
}

// export async function getServerSideProps() {
//   try {
//     const response = await fetch('http://localhost:3000/api/bingo')
//     const initialBingoData: BingoType[] = await response.json()

//     return {
//       props: {
//         initialBingoData,
//       },
//     }
//   } catch (error) {
//     console.error('Error fetching initial bingo data:', error)

//     return {
//       props: {
//         initialBingoData: [],
//       },
//     }
//   }
// }
