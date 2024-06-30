import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginStart, loginUser, loginFail } from "../../redux/userSlice.js"
import axios from 'axios'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }

  }, [userInfo, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginStart())
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", { username, email, password })
      dispatch(loginUser(res.data))
      navigate("/")
    } catch (err) {
      dispatch(loginFail())
      console.log(err)
    }
  }

  return (
    <div className='flex justify-center w-full '>

      <form onSubmit={handleSubmit} className='w-[90vw] md:w-8/12 flex flex-col gap-6 p-4 '>
        <h2 className='font-bold text-3xl text-blue-500'>Sign Up </h2>

        <div className='w-full flex flex-col gap-2 border-b-2'>
          <label className=' font-semibold '>Username</label>
          <input
            type="text"
            value={username}
            className='w-full py-2 px-1 border-none outline-none'
            placeholder='Enter name'
            onChange={(e) => { setUsername(e.target.value) }}
          />
        </div>

        <div className='w-full flex flex-col gap-2 border-b-2'>
          <label className=' font-semibold '>Email</label>
          <input
            type="email"
            value={email}
            className='w-full py-2 px-1 border-none outline-none '
            placeholder='Enter email'
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </div>

        <div className='w-full flex flex-col gap-2 border-b-2'>
          <label className=' font-semibold '>Password</label>
          <input
            type="password"
            value={password}
            className='w-full py-2 px-1 border-none outline-none '
            placeholder='Enter password'
            onChange={(e) => { setPassword(e.target.value) }} />
        </div>

        <div className='flex flex-col gap-4'>
          <button
            type='submit'
            className='px-4 py-2 border-none rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-400'
          >Sign up</button>
          <p>Already have an account?<Link to="/login" className='ml-3 text-blue-500'>Login</Link></p>
        </div>
      </form>

    </div>
  )
}

export default SignUp