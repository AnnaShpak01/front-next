'use client'

import styles from './page.module.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from '../components/app/App'
import store from '../components/store'

//import './page.module.css'

export default function Home() {
  if (typeof document === 'undefined') {
    return null
  }
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
