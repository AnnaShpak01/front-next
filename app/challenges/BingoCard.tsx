import React from 'react'
import styles from './challenges.module.scss'

export type BingoTypeCard = {
  id: string
  side: string
  color: string
  status: boolean
  bingoClass: string
  updateBingo: (id: string, updatedData: { task: string; color: string; status: boolean }) => void
}

const BingoCard: React.FC<BingoTypeCard> = ({
  id,
  side,
  color,
  status,
  bingoClass,
  updateBingo,
}) => {
  const onClickCard = () => {
    updateBingo(id, { task: side, color, status: !status })
  }

  return (
    <div className={styles['bingo-card']}>
      <div className={styles['flip-card']} onClick={onClickCard}>
        <div className={bingoClass}>
          <div className={styles['flip-card-front']}>{side}</div>
          <div className={styles['flip-card-back']} style={{ backgroundColor: color }}>
            {side}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BingoCard
