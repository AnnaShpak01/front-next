import React, { useEffect, useState } from 'react'
import { BingoType } from '../../components/types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import BingoCard from './BingoCard'
import styles from './challenges.module.scss'
import Spinner from 'components/spinner/Spinner'

type BingoPageProps = {
  bingoData?: BingoType[]
  updateBingo: (id: string, updatedData: BingoType) => void
}

const BingoPage: React.FC<BingoPageProps> = ({ bingoData, updateBingo }) => {
  const [cards, setCards] = useState<BingoType[]>([])

  useEffect(() => {
    if (bingoData) {
      setCards(bingoData)
    }
  }, [bingoData])

  const handleUpdateBingo = (
    id: string,
    updatedData: { task: string; color: string; status: boolean }
  ) => {
    if (!id) {
      console.error('ID is undefined, cannot update bingo card')
      return
    }

    setCards((prevCards) =>
      prevCards.map((card) => (card._id === id ? { ...card, ...updatedData } : card))
    )

    updateBingo(id, { _id: id, ...updatedData })
  }

  if (!cards || cards.length === 0) {
    return (
      <div>
        <p>Loading Bingo data...</p>
        <Spinner />
      </div>
    )
  }

  return (
    <TransitionGroup className={styles['bingo-cards-wrapper']}>
      {cards.map((item: BingoType, index: number) => (
        <CSSTransition key={item._id || index} timeout={500} classNames="bingo-card">
          <BingoCard
            id={item._id}
            side={item.task}
            color={item.color}
            status={item.status}
            bingoClass={`${styles['flip-card-inner']} ${item.status ? styles['is-flipped'] : ''}`}
            updateBingo={handleUpdateBingo}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default BingoPage
