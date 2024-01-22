import React from 'react'
import App from '../../components/app/_app'
import BookChallengePage from './BookChallengePage'
import { fetchDataServer, updateBingoItem } from '@/api/api'
import { BingoType } from 'components/reducers/bingo'

export default function Home({ initialBingoData }: { initialBingoData: BingoType[] }) {
  const [bingoData, setBingoData] = React.useState<BingoType[]>(initialBingoData)

  const updateBingo = async (id: string, updatedData: BingoType) => {
    try {
      const response = await fetch(`/api/bingo/update?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
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

export async function getServerSideProps() {
  try {
    const response = await fetch('http://localhost:3000/api/bingo')
    const initialBingoData: BingoType[] = await response.json()

    return {
      props: {
        initialBingoData,
      },
    }
  } catch (error) {
    console.error('Error fetching initial bingo data:', error)

    return {
      props: {
        initialBingoData: [],
      },
    }
  }
}
