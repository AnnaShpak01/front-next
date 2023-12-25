import AlphabetChallenge from './AlphabetChallenge'
import BingoPage from './BingoPage'
import styles from './challenges.module.scss'

const BookChallengePage = () => {
  return (
    <div className={`${styles['site-wrapper']} ${styles['books-challenge-page']}`}>
      <section className={styles['tabs-wrapper']}>
        <div className={styles['tabs-container']}>
          <div className={styles['tabs-block']}>
            <div className={`${styles['tabs']} ${styles['bordered']}`}>
              <input type="radio" name="tabs" id="tab1" defaultChecked />
              <label htmlFor="tab1" className={styles['first-label']}>
                {' '}
                Bingo Challenge
              </label>
              <div className={styles.tab}>{<BingoPage />}</div>
              <input type="radio" name="tabs" id="tab2" />
              <label htmlFor="tab2" className={styles['last-label']}>
                {' '}
                Alphabet Challenge
              </label>
              <div className={styles.tab}>{<AlphabetChallenge />}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BookChallengePage
