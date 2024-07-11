import React from 'react'
import logo from "../assets/twitter-logo.png"
import { CiSearch } from "react-icons/ci";
import { MdStarPurple500 } from "react-icons/md";

const Navbar = () => {
  return (
    <div className=' grid grid-cols-1 md:grid-cols-4 justify-center my-5 '>

      <div className='md:mx:0'>
        <img src={logo} alt="" width={"40px"} className='ml-4 mb-4' />
      </div>

      <div className='grid col-span-2 border-x md:px-6  '>
        <div className='flex justify-between items-center'>
          {/* <h2 className='font-bold '>Home</h2> */}
          <MdStarPurple500 className=' hidden md:visible' />
        </div>
      </div>

      {/* <div className=' w-[90%]  mx-auto px-2  md:w-[350px] flex items-center justify-center '>
        <input type="text" placeholder='search' className=' md: w-full py-2 px-2 bg-blue-100 rounded-full border-none outline-none  ' />
      </div> */}
    </div>
  )
}

export default Navbar