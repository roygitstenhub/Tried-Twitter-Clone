import React from 'react'
import LeftSideBar from '../screens/LeftSideBar'
import RightSideBar from '../screens/RightSideBar'
import Maintweet from '../screens/Maintweet'
import { useSelector } from 'react-redux'
import SignIn from '../screens/SignIn'

const Home = () => {
  const { userInfo } = useSelector((state) => state.user)

  return (
    <>
      {
        !userInfo ? (
          <SignIn />
        ) : (
          <div className=' grid grid-col-1 md:grid-cols-4' >
            <div className='px-6'>
              <LeftSideBar />
            </div>

            <div className='col-span-2 border-x px-6'>
              <Maintweet />
            </div>

            <div className=' px-6  md:w-[350px] mt-4 '>
              <RightSideBar />
            </div>
          </div>
        )
      }
    </>
  )
}

export default Home

