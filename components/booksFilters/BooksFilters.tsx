'use client'

import classNames from 'classnames'
import { FiltersType } from '../types'
import Spinner from '../spinner/Spinner'
import React from 'react'
import styles from './bookfilters.module.scss'

const BooksFilters = ({
  filterData,
  activeFilter,
  setActiveFilter,
}: {
  filterData?: FiltersType[]
  activeFilter: string
  setActiveFilter: (newFilter: string) => void
}) => {
  return (
    <div
      className={` ${styles['shadow-lg']} ${styles['mb-4']} ${styles.rounded} ${styles['bordered']}`}>
      <div className={` ${styles['card-body']} ${styles['centered-intro']}  ${styles.rounded}`}>
        <p className={` ${styles['card-text']} ${styles['filters-label']}`}>Filter by status</p>
        {filterData?.length === 0 && (
          <div className={styles.loader}>
            <Spinner />
          </div>
        )}
        <div
          className={` ${styles['btn-group ']} ${styles['filters-block']}  ${styles.bordered}  ${styles.rounded}`}>
          {filterData &&
            filterData.length > 0 &&
            filterData?.map((item: FiltersType) => {
              const btnClass = classNames(
                styles.btn,
                item.name === activeFilter ? styles.active : ''
              )

              return (
                <button
                  key={item.name}
                  id={item.name}
                  className={btnClass}
                  onClick={() => setActiveFilter(item.name)}>
                  {item.label}
                </button>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default BooksFilters
