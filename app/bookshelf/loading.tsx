import Spinner from 'components/spinner/Spinner'
import styles from './bookshelf.module.scss'

export default function Loading() {
  return (
    <div>
      <Spinner />
      <p className={styles.centered}>Loading bookshelf page...</p>
    </div>
  )
}
