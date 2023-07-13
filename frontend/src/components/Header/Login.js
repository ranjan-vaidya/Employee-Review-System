import React, { useState } from 'react'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {FaRegEnvelope} from 'react-icons/fa'
import {MdLockOutline} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit =async (e) => {
        e.preventDefault()
        if( !email || !password){
            console.log("Enter all fields")
            return;
          }
          console.log("The email", email)
          console.log("The password", password)
          const {data} = await axios.post("/api/v1/login", {email,password}, {
            headers:{
                "Content-Type":"application/json"
            }
          })
      
          console.log("The data", data)
          navigate("/add")
    }

    return (
        <>
        <div className="mt-16  bg-white">
          <div className='w-full flex flex-col md:flex-row min-h-[80vh] items-center justify-center flex-1 text-center '>
    
          <div className='w-full py-8 md:w-3/5'>
                <div className='items-center flex flex-col justify-center'>
                    <h2 className='text-3xl font-bold text-green-700 mb-8'>Sign in to account</h2>
    
                    {/* Input Divs below */}
                    <form onSubmit={handleSubmit} className='flex flex-col items-center ' >
                        <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                            <FaRegEnvelope className='text-gray-400 m-2' />
                            <input type='email' onChange={e=>setEmail(e.target.value)} name='email'   placeholder="Email" className='bg-gray-100 outline-none text-sm flex-1' />
                            {/* using flex-1 above to expand full width */}
                        </div>
                        <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                            <MdLockOutline className='text-gray-400 m-2' />
                            <input type='password' onChange={e=>setPassword(e.target.value)} name='password' placeholder="Password" className='bg-gray-100 outline-none text-sm flex-1' />
                            {/* using flex-1 above to expand full width */}
                        </div>
                        <div className='flex justify-between w-64 mb-5'>
                            <div className='text-xs hover:cursor-pointer'>Forgot Password?</div>
                        </div>
                        <button type="submit" className='border-2 border-green-800 text-green-800 font-semibold rounded-full px-12 py-2 inline-block hover:bg-green-800 hover:text-white hover:cursor-pointer'>Login</button>
                    </form>
                </div>
          </div>
    
          </div>
        </div>
        <ToastContainer /> 
        </>
      )
}

export default Login