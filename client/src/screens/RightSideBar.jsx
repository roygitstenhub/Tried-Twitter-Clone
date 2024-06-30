import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RightSideBar = () => {
    const [alluser, setAlluser] = useState([])
    const { userInfo } = useSelector((state) => state.user)
    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const findAllUsers = await axios.get(`http://localhost:3000/api/user/find/all`)
                setAlluser(findAllUsers.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className=' bg-slate-100 rounded-lg flex flex-col gap-3 w-full p-1    '>
            <h2 className="font-bold">Who to follow</h2>
            {
                alluser.map((user) => (
                    <>
                        <div className=' flex justify-between item-center px-2 gap-1 mt-1 bg-slate-50 rounded-lg ' key={user._id} >
                            <img src={user.profilePicture} alt="" className=' w-12 h-12 rounded-full object-cover  ' srcset="" />
                            <div className='flex flex-col justify-center items-center  ' >
                                <Link to={`/profile/${userInfo._id}`}><span className=' font-bold ' >{user.username}</span></Link>
                                <span className=' text-slate-400 text-[12px] ' >@{user.username}</span>
                            </div>
                            <div className=' flex items-center'>
                                <Link
                                    to={`/profile/${userInfo._id}`}
                                    className=' px-3 py-2 bg-blue-500 text-white rounded-full text-[12px] '
                                >follow</Link>
                            </div>
                        </div>
                    </>
                ))
            }
        </div>
    )
}

export default RightSideBar