import React, { useState } from 'react'
import App from '../../components/app/_app'
import BookChallengePage from './BookChallengePage'
import { fetchDataServer, updateBingoItem } from 'api/api'
import { BingoType } from 'components/reducers/bingo'

export default function Home({ bingoData }: { bingoData: BingoType[] }) {
  const [bingo, setBingo] = useState(bingoData)

  const updateBingo = async (id: string, updatedData: BingoType) => {
    try {
      const updatedBingoItem = await updateBingoItem(id, updatedData)
      const updatedBingoData = bingo.map((item) =>
        item.id === updatedBingoItem.id ? updatedBingoItem : item
      )
      setBingo(updatedBingoData)
    } catch (error) {
      console.error('Error updating bingo item:', error)
    }
  }

  return (
    <App>
      <BookChallengePage bingoData={bingo} updateBingo={updateBingo} />
    </App>
  )
}

export const getServerSideProps = async () => {
  try {
    const bingoData = await fetchDataServer('/bingo')

    return {
      props: {
        bingoData,
      },
    }
  } catch (error) {
    console.error('Error fetching bingo data', error)
    return {
      props: {
        bingoData: [],
      },
    }
  }
}
