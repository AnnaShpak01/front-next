'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const LazyComponent = dynamic(() => import('./BookshelfPage'))

const MyPage = () => {
  return (
    <div>
      <LazyComponent initialBooksData={[]} />
    </div>
  )
}

export default MyPage
