import React from 'react'
import logo from "../assets/twitter-logo.png"
import { CiSearch } from "react-icons/ci";
import { MdStarPurple500 } from "react-icons/md";

const Navbar = () => {
  return (
    <div className=' grid grid-cols-1 md:grid-cols-4 justify-center my-5 '>

      <div className='md:mx:0'>
        <img src={logo} alt="" width={"40px"} className='ml-4' />
      </div>

      <div className='grid col-span-2 border-x md:px-6  '>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold '>Home</h2>
          <MdStarPurple500/>
        </div>
      </div>

      <div className='px-0 md:px-6'>
        <CiSearch className=' absolute m-2 my-3 text-xl'/>
        <input type="text" placeholder='search' className='py-2 px-8 bg-blue-100 rounded-full border-none outline-none ' />
      </div>

    </div>
  )
}

export default Navbar