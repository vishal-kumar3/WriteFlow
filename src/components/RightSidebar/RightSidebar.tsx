import React from 'react'
import HomeDraftCard from '../Home/HomeDraftCard'

type props = {}

const RightSidebar = (props: props) => {
  return (
    <div className='m-10 ml-0 space-y-5 sticky top-[100px] h-screen w-[30%]'>
      <HomeDraftCard />
      <HomeDraftCard />
      Trending Article
    </div>
  )
}

export default RightSidebar