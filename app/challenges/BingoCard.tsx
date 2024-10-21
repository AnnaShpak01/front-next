import React from 'react'
import styles from './challenges.module.scss'

export type BingoTypeCard = {
  id: string
  side: string
  color: string
  status: boolean
  bingoClass: string
  updateBingo: (
    id: string,
    updatedData: { task: string; color: string; status: boolean } // Убираем id
  ) => void
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
    console.log('Card clicked with ID:', id) // Лог для проверки id
    updateBingo(id, { task: side, color, status: !status }) // Передаем обновленные данные
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
