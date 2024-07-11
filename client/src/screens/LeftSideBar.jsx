import React from 'react'
import { Link } from 'react-router-dom'
import { TiHome } from "react-icons/ti";
import { MdOutlineTag, MdPerson, MdLogout } from "react-icons/md";
import { logoutUser } from "../../redux/userSlice.js"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeftSideBar = () => {

    const { userInfo } = useSelector((state) => state.user)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logoutUser())
        navigate('/login')
        // try {
        //     // await axios.post(`http://localhost:3000/api/auth/logout`)
        //     navigate('/login')
        // } catch (error) {
        //     console.log(error)
        // }
    }

    return (
        <div className='flex  md:flex-col h-full md:h-[90vh] mr-6  w-full ' >
            <div className='flex w-full  md:flex-col item-center gap-4 ' >

                <Link to={'/'}>
                    <div className='flex item-center  px-2 py-2 gap-4 hover:bg-slate-200 rounded-full cursor-pointer' >
                        <TiHome fontSize={'22px'} />
                        <p>Home</p>
                    </div>
                </Link>

                <Link to={'/explore'}>
                    <div className='flex item-center  px-2 py-2  gap-4 hover:bg-slate-200 rounded-full cursor-pointer'>
                        <MdOutlineTag fontSize={'22px'} />
                        <p>Explore</p>
                    </div>
                </Link>

                <Link to={`/profile/${userInfo._id}`}>
                    <div className='flex  md:item-center  px-2 py-2 gap-4 hover:bg-slate-200 rounded-full cursor-pointer'>
                        <MdPerson fontSize={'22px'} />
                        <p>Profile</p>
                    </div>
                </Link>

                <button
                    className='flex item-center justify-center text-white bg-blue-500 px-2 py-2 gap-4 hover:bg-blue-400 rounded-full cursor-pointer text-[14px]'
                    onClick={handleLogout}
                >Logout</button>

            </div>
        </div>
    )
}

export default LeftSideBar