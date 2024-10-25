import React from 'react'
import Spinner from '../components/spinner/Spinner'
import styles from './page.module.css'

export default function Loading() {
  return (
    <div data-testid="loading">
      <Spinner />
      <p className={styles.centered}>Loading main page...</p>
    </div>
  )
}
