'use client'

import classNames from 'classnames'
import { FiltersType } from '../types'
import Spinner from '../spinner/Spinner'
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
  // if (filtersLoadingStatus === 'loading') {
  //   return <Spinner />
  // } else if (filtersLoadingStatus === 'error') {
  //   return <h5 className={`${styles['text-center']} ${styles['mt-5']}`}>Loading Error</h5>
  // }

  return (
    <div
      className={` ${styles['shadow-lg']} ${styles['mb-4']} ${styles.rounded} ${styles['bordered']}`}>
      <div className={` ${styles['card-body']} ${styles['centered-intro']}  ${styles.rounded}`}>
        <p className={` ${styles['card-text']} ${styles['filters-label']}`}>Filter by status</p>
        <div
          className={` ${styles['btn-group ']} ${styles['filters-block']}  ${styles.bordered}  ${styles.rounded}`}>
          {filterData?.length === 0 && (
            <h5 className={`${styles['text-center']} ${styles['mt-5']}`}>Filters no founded</h5>
          )}
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
