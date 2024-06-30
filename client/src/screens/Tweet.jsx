import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import formatDistance from "date-fns/formatDistance"
import { useLocation, useParams } from 'react-router-dom'
import { FcLike } from "react-icons/fc";
import { IoIosHeartEmpty } from "react-icons/io";


const Tweet = ({ tweet, setData }) => {

  const { userInfo } = useSelector((state) => state.user)
  const [userData, setUserData] = useState(null)

  const location = useLocation().pathname
  const { id } = useParams()

  const dateStr = formatDistance(new Date(tweet.createdAt), Date.now(), { addSuffix: true })

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const finduser = await axios.get(`http://localhost:3000/api/user/find/${tweet.userId}`)
        setUserData(finduser.data)
      } catch (err) {
        console.log("error", err)
      }
    }
    fetchdata()
  }, [tweet._id, tweet.likes, userInfo._id])

  const handleLikes = async (e) => {
    e.preventDefault()
    try {
      const likes = await axios.put(`http://localhost:3000/api/tweet/${tweet._id}/like`, {
        id: userInfo._id
      })

      if (location.includes('profile')) {
        const rawdata = await axios.get(`http://localhost:3000/api/tweet/user/all/${id}`)
        setData(rawdata.data)
      } else if (location.includes('explore')) {
        const rawdata = await axios.get(`http://localhost:3000/api/tweet/explore`)
        setData(rawdata.data)
      } else {
        const rawdata = await axios.get(`http://localhost:3000/api/tweet/timeline/${userInfo._id}`)
        setData(rawdata.data)
      }

    } catch (err) {
      console.log("error is : ", err)
    }
    window.location.reload(false)
  }

  return (
    <div>
      {
        userData &&
        <>
          <div>
            <img src={userData?.profilePicture } alt="" srcset="" className=' w-12 h-12 rounded-full object-cover my-1 ' />
            <div className='flex gap-4 justify-between items-center'>
              <Link to={`/profile/${userData._id}`}>
                <h3 className="font-bold capitalize " >{userData.username}</h3>
              </Link>

              <p className=' text-slate-500 text-sm ' > {dateStr}</p>
            </div>
            {
              tweet.pic ?
                <img src={tweet.pic} alt="" srcset="" className=' rounded-md w-fit h-fit '/> : " "
            }
            <p className='text-slate-600 text-sm mt-2' >{tweet.description}</p>
            <button onClick={handleLikes} className='flex items-center justify-center gap-1 text-slate-700 text-sm ' >
              {
                tweet.likes.includes(userInfo._id) ?
                  <>
                    <FcLike />
                  </> :
                  <>
                    <IoIosHeartEmpty />
                  </>
              }
              {tweet.likes.length}
            </button>
          </div>
        </>


      }
    </div>
  )
}

export default Tweet