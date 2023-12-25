import BingoCard from './BingoCard'
import { useGetBingoQuery, useUpdateBingoMutation } from '../../api/apiSlice'
import { BingoType } from '../../components/reducers/bingo'
import styles from './challenges.module.scss'

const BingoPage = () => {
  const { data: bingo = [] } = useGetBingoQuery('Bingo')
  const [updateBingo] = useUpdateBingoMutation()

  return (
    <div className="bingo-cards-wrapper">
      {bingo.length === 0 && (
        <h5 className={`${styles['text-center']} ${styles['mt-5']}`}>Bingo no founded</h5>
      )}
      {bingo.length > 0 &&
        bingo.map((item: BingoType) => {
          const bingoClass = `${styles['flip-card-inner']}  ${
            item.status ? styles['is-flipped'] : ''
          }`

          return BingoCard({
            id: item.id,
            side: item.task,
            color: item.color,
            status: item.status,
            bingoClass: bingoClass,
            updateBingo,
          })
        })}
    </div>
  )
}

export default BingoPage
