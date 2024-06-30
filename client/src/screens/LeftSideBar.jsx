import React from 'react'
import { Link } from 'react-router-dom'
import { TiHome } from "react-icons/ti";
import { MdOutlineTag, MdPerson ,MdLogout} from "react-icons/md";
import { logoutUser } from "../../redux/userSlice.js"
import { useDispatch, useSelector } from 'react-redux';

const LeftSideBar = () => {

    const { userInfo } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logoutUser())
    }

    return (
        <div className='flex flex-col h-full md:h-[90vh] justify-between mr-6 sticky ' >
            <div className='flex flex-col item-center gap-4 mt-6 ' >

                <Link to={'/'}>
                    <div className='flex item-center  px-2 py-2 gap-4 hover:bg-slate-200 rounded-full cursor-pointer' >
                        <TiHome fontSize={'22px'} />
                        <p>Home</p>
                    </div>
                </Link>

                <Link to={'/explore'}>
                    <div className='flex item-center px-2 py-2  gap-4 hover:bg-slate-200 rounded-full cursor-pointer'>
                        <MdOutlineTag fontSize={'22px'} />
                        <p>Explore</p>
                    </div>
                </Link>


                <Link to={`/profile/${userInfo._id}`}>
                    <div className='flex item-center px-2 py-2 gap-4 hover:bg-slate-200 rounded-full cursor-pointer'>
                        <MdPerson fontSize={'22px'} />
                        <p>Profile</p>
                    </div>
                </Link>


                {/* <div className=''> */}
                    {/* <Link to='/login'> */}
                    <button
                        className='flex item-center justify-center text-white bg-blue-500 px-2 py-2 gap-4 hover:bg-blue-400 rounded-full cursor-pointer'
                        onClick={handleLogout}
                    >Logout</button>
                    {/* </Link> */}
                {/* </div> */}

            </div>



        </div>
    )
    // className='px-4 py-1.5 bg-blue-500 text-white  rounded-full  '
}

export default LeftSideBar