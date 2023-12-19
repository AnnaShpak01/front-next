export type BingoTypeCard = {
  id: string
  side: string
  color: string
  status: boolean
  bingoClass: string
  updateBingo: ({}) => void
}

const BingoCard = ({ id, side, color, status, bingoClass, updateBingo }: BingoTypeCard) => {
  const onClickCard = () => {
    updateBingo({ task: side, color, status: !status, id: id.toString() })
  }

  return (
    <div className="bingo-card" key={id}>
      <div className="flip-card" onClick={onClickCard}>
        <div className={bingoClass}>
          <div className="flip-card-front">{side}</div>
          <div className="flip-card-back" style={{ backgroundColor: color }}>
            {side}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BingoCard
