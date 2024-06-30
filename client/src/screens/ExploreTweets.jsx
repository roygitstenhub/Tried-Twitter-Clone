import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Tweet from './Tweet'

const ExploreTweets = () => {
    const [exploreTweet, setExploreTweet] = useState(null)

    const { userInfo } = useSelector((state) => state.user)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const exploreTweet = await axios.get(`http://localhost:3000/api/tweet/explore`)
                setExploreTweet(exploreTweet.data)
            } catch (error) {
                console.log("error is : ", error)
            }
        }

        fetchdata()
    }, [userInfo._id])

    return (
        <div className='mt-6 overflow-auto  w-full h-screen'>
            {
                exploreTweet && exploreTweet.map((tweet)=>(
                    <div key={tweet._id} className='p-2'>
                        <Tweet tweet={tweet} setData={setExploreTweet} />
                    </div>
                ))
            }
        </div>
    )
}

export default ExploreTweets