'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { FiltersType, InitStateType } from '../reducers/filters'
import { filtersChanged, fetchFilters } from './filtersSlice'
import Spinner from '../spinner/Spinner'
import { useGetFiltersQuery } from '../../api/apiSlice'
import styles from './bookfilters.module.scss'

const BooksFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector((state: any) => state.filters)
  const { data: filters = [] } = useGetFiltersQuery('Filters')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFilters())
    // eslint-disable-next-line
  }, [])

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className={`${styles['text-center']} ${styles['mt-5']}`}>Loading Error</h5>
  }

  return (
    <div
      className={` ${styles['shadow-lg']} ${styles['mb-4']} ${styles.rounded} ${styles['bordered']}`}>
      <div className={` ${styles['card-body']} ${styles['centered-intro']}  ${styles.rounded}`}>
        <p className={` ${styles['card-text']} ${styles['filters-label']}`}>Filter by status</p>
        <div
          className={` ${styles['btn-group ']} ${styles['filters-block']}  ${styles.bordered}  ${styles.rounded}`}>
          {filters.length === 0 && (
            <h5 className={`${styles['text-center']} ${styles['mt-5']}`}>Filters no founded</h5>
          )}
          {filters.length > 0 &&
            filters.map((item: FiltersType) => {
              const btnClass = classNames(
                styles.btn,
                item.name === activeFilter ? styles.active : ''
              )

              return (
                <button
                  key={item.name}
                  id={item.name}
                  className={btnClass}
                  onClick={() => dispatch(filtersChanged(item.name))}>
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
