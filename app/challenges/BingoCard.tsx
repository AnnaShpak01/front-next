import React from 'react'
import styles from './challenges.module.scss' // Подключаем стили с использованием SCSS

export type BingoTypeCard = {
  id: string
  side: string
  color: string
  status: boolean
  bingoClass: string
  updateBingo: (
    _id: string,
    updatedData: { task: string; color: string; status: boolean; _id: string }
  ) => void
}

const BingoCard: React.FC<BingoTypeCard> = ({ id, side, color, bingoClass, updateBingo }) => {
  const handleClick = () => {
    updateBingo(id, { task: side, color, status: true, _id: id })
  }

  return (
    <div className={styles.bingoCard}>
      {' '}
      {/* Используем стили */}
      <div className={styles.flipCard}>
        <div className={bingoClass}>
          <div className={styles.flipCardFront} data-testid="card-front" onClick={handleClick}>
            {side}
          </div>
          <div
            className={styles.flipCardBack}
            data-testid="card-back"
            style={{ backgroundColor: color }}>
            {side}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BingoCard
