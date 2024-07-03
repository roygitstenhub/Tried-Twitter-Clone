import React, { useEffect, useState } from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import SigIn from './SignIn'
import Tweet from './Tweet'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import EditProfile from './EditProfile'
import { following } from '../../redux/userSlice.js'

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [userTweets, setUserTweets] = useState(null)
  const [open, setOpen] = useState(false)
  const { userInfo } = useSelector((state) => state.user)

  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const user_profile = await axios.get(`http://localhost:3000/api/user/find/${id}`)
        setUserProfile(user_profile.data)

        const user_tweets = await axios.get(`http://localhost:3000/api/tweet/user/all/${id}`)
        setUserTweets(user_tweets.data)
      } catch (err) {
        console.log("error is : ", err)
      }
    }
    fetchdata()
  }, [userInfo._id, id])

  if (open) {
    return <EditProfile setData={setOpen} />
  }

  const handlefollow = async (e) => {
    e.preventDefault()
    if (userInfo && userInfo.following && !userInfo.following.includes(id)) {
      try {
        const follow = await axios.put(`http://localhost:3000/api/user/follow/${id}`, {
          id: userInfo._id
        })
        dispatch(following(id))
        console.log(follow.data)
      } catch (err) {
        console.log("error is ", err)
      }
    } else {
      console.log("inside else")
      try {
        const unfollow = await axios.put(`http://localhost:3000/api/user/unfollow/${id}`, {
          id: userInfo._id
        })
        console.log(unfollow.data)
        dispatch(following(id))
      } catch (err) {
        console.log("error is ", err)
      }
    }
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-4 '>

        <div className="px-6">
          <LeftSideBar />
        </div>

        <div className="px-6 col-span-2 border-x">

          <div className='flex justify-center items-center flex-col gap-3 mt-4 ' >
            <img
              src={userProfile?.profilePicture}
              alt="" srcset=""
              className=' w-24 h-24 rounded-full object-cover  '
            />
            {
              !userInfo ? (
                <SigIn />
              ) : userInfo._id === id ? (
                <button
                  className='px-4 py-2 bg-blue-500 text-white border-none outline-none capitalize rounded-full'
                  onClick={() => setOpen(true)} >
                  edit profile
                </button>
              )
                : (userInfo.following && userInfo.following.includes(id)) ? (
                  <button
                    className='px-3 py-2 bg-blue-500 text-white border-none outline-none capitalize rounded-full'
                    onClick={handlefollow}
                  >
                    following
                  </button>
                ) :
                  (
                    <button
                      className='px-4 py-2 bg-blue-500 text-white border-none outline-none capitalize rounded-full'
                      onClick={handlefollow}
                    >
                      follow
                    </button>
                  )
            }
          </div>

          <div className='mt-6 overflow-auto w-full h-screen'>
            {
              userTweets && userTweets.map((tweet) => {
                return (
                  <div className='p-2' key={tweet._id} >
                    <Tweet tweet={tweet} setData={setUserTweets} />
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="px-6 md:w-[350px] mt-4 ">
          <RightSideBar />
        </div>

      </div>

    </>
  )
}

export default Profile