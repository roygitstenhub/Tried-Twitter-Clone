import React from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import ExploreTweets from './ExploreTweets'

const Explore = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 '>

      <div className="px-6">
        <LeftSideBar />
      </div>

      <div className="px-6 col-span-2 border-x ">
        <ExploreTweets />
      </div>

      <div className="px-6 md:w-[350px] mt-4">
        <RightSideBar />
      </div>

    </div>
  )
}

export default Explore