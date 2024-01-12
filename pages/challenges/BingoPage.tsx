import React, { useEffect } from 'react'
import { BingoType } from '../../components/reducers/bingo'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import BingoCard from './BingoCard'
import styles from './challenges.module.scss'

type BingoPageProps = {
  bingoData?: BingoType[]
  updateBingo: (id: string, updatedData: BingoType) => void
}

const BingoPage: React.FC<BingoPageProps> = ({ bingoData, updateBingo }) => {
  if (!bingoData) {
    return <div className={`${styles['text-center']} ${styles['mt-5']}`}>Loading Bingo data...</div>
  }

  if (bingoData.length === 0) {
    return <div className={`${styles['text-center']} ${styles['mt-5']}`}>Bingo not found</div>
  }

  return (
    <TransitionGroup className={styles['bingo-cards-wrapper']}>
      {bingoData.map((item: BingoType) => (
        <CSSTransition key={item.id} timeout={500} classNames="bingo-card">
          <BingoCard
            id={item.id}
            side={item.task}
            color={item.color}
            status={item.status}
            bingoClass={`${styles['flip-card-inner']} ${item.status ? styles['is-flipped'] : ''}`}
            updateBingo={updateBingo}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default BingoPage
