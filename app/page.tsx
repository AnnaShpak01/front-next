'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const LazyComponent = dynamic(() => import('./mainPage'))

const MyPage = () => {
  return (
    <div>
      <LazyComponent />
    </div>
  )
}

export default MyPage
