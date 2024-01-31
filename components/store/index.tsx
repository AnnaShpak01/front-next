import { configureStore } from '@reduxjs/toolkit'
import filters from '../booksFilters/filtersSlice'
import { bingoSlice } from '../../app/challenges/bingoSlice'
import { apiSlice } from '../../pages/api/apiSlice'
import { actionsTypes } from '../reducers/index'

interface nextType {
  (type: actionsTypes): actionsTypes
}

const stringMiddleware = () => (next: nextType) => (action: actionsTypes) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    })
  }
  return next(action)
}

const store = configureStore({
  reducer: {
    filters,
    [bingoSlice.reducerPath]: bingoSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
