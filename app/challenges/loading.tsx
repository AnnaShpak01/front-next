import React from 'react'
import Spinner from '../../components/spinner/Spinner'
import styles from './challenges.module.scss'

export default function Loading() {
  return (
    <div>
      <Spinner />
      <p className={styles.centered}>Loading challenges page...</p>
    </div>
  )
}
