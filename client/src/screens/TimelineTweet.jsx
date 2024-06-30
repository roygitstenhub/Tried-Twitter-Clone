import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Tweet from "../screens/Tweet"

const TimelineTweet = () => {
    const [timeline, setTimeline] = useState(null)

    const { userInfo } = useSelector((state) => state.user)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const timelineData = await axios.get(`http://localhost:3000/api/tweet/timeline/${userInfo._id}`)
                setTimeline(timelineData.data)
            } catch (error) {
                console.log("error is :", error.message)
            }
        }

        fetchdata()
    }, [userInfo._id])
    return (
        <div className='mt-6 '>
            {
                timeline && timeline.map((tweet) => (
                    <div key={tweet._id} className='p-2'>
                        <Tweet tweet={tweet} setDate={setTimeline} />
                    </div>
                ))
            }
        </div>
    )
}

export default TimelineTweet